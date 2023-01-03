import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { ContainerScroll, Hr, Container, Title, ContainerRow, ContainerItem, ContainerWrapper, TouchableItem } from '../../styles';
import styles from '../../styles/styles';
import Colors from '../../styles/colors';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { MISSION, VIEW } from '../../assets/consts';
import { connect } from 'react-redux';
import * as MissionsActions from '../../store/actions/missions';
import { HeaderSubScreen } from '../../components/Header/headersNavigation';
import Combobox  from '../../components/Combobox';
import { Input, CheckBox, AirbnbRating } from 'react-native-elements';
import CheckBx from '../../components/CheckBox';
import Btn from '../../components/Buttons';
import { days, foodInfo, objCheckboxType } from './config';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import QtdModal from './QtdModal';
import FoodsModal from './FoodsModal';
import Toast from '../../components/Toasts';
import { insertMission } from '../../services/missionsService';
import { COUNT_DIF } from '../../utils';

const CreateMission = ({ navigation, getMissions }) => {

    const [loading, setLoading] = useState(false);
    const [difficult, setDifficult] = useState(0);
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [selectedFoods, setSelectedFoods] = useState([Object.assign({}, foodInfo)]);
    const [checkboxType, setCheckboxType] = useState(Object.assign({}, objCheckboxType));
    const [checkboxDays, setCheckboxDays] = useState(Array.from(days, (d => d = { ...d, selected: false })));
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [modalQtdVisible, setModalQtdVisible] = useState(false);
    const [modalFoodVisible, setModalFoodVisible] = useState(false);
    const [pickerSelected, setPickerSelected] = useState(null);
    const [qtdTyped, setQtdTyped] = useState('');

    useEffect(() => {
        if (navigation.getParam('mission')) {
            setViewInfo();
        } else {
            resetForm();
        }
    }, [])

    const setViewInfo = () => {
        setTitle(navigation.state.params.mission.TITLE);
        setTime(navigation.state.params.mission.TIME);
        setDifficult(navigation.state.params.mission.DIFFCULT);
        setCheckboxType({ value: navigation.state.params.mission.TFAVOID ? 'avoid' : 'eat', state: true });
        setInfoViewDays(navigation.state.params.mission.DAYS);
        setInfoViewFoods(navigation.state.params.mission.foods);
    };

    const setInfoViewDays = (dias) => {
        setCheckboxDays(
            checkboxDays.map(day => {
                if (dias.includes(day.id.toString())) {
                    day.selected = true;
                }
                return day;
            })
        );
    };

    const setInfoViewFoods = (alimentos) => {
        setSelectedFoods(
            alimentos.map(food => {
                return {
                    IDFOOD: food.IDFOOD,
                    DESCRIPT: food.DESCRIPT,
                    FOODQTY: food.FOODQTY
                }
            })
        );
    };

    const resetForm = () => {
        setTitle('');
        setTime('');
        setDifficult(0);
        setCheckboxType({ value: '', state: false });
        setCheckboxDays(Array.from(days, (d => d = { ...d, selected: false })));
        setSelectedFoods([Object.assign({}, foodInfo)]);
    }

    const addMission = async () => {
        setLoading(true);

        let formObj = {
            difficult: difficult,
            days: checkboxDays,
            foods: selectedFoods,
            type: checkboxType,
            title: title,
            time: time
        };
        const validation = await validationForm(formObj);

        if (validation.state) {
            formObj = {...formObj, foods: formObj.foods.filter(f => {return f.IDFOOD})}
            await insertMission(formObj).then(res => {
                setLoading(false);
                Toast('Missão criada com sucesso');
                getMissions();
                navigation.pop();
            }).catch(err => {
                setLoading(false);
                Toast('Erro ao criar a missão');
            });
        } else {
            setLoading(false);
            Toast(validation.message);
        }
    }

    const validationForm = (form) => {
        const emptyFoods = form.foods.filter(function (item) {
            return item.IDFOOD != 0;
        });

        const OnlyNameFoods = form.foods.filter(function (item) {
            return item.FOODQTY == 0 && item.IDFOOD != 0;
        });

        const emptyDays = form.days.filter(function (item) {
            return item.selected;
        });

        if (form.title == '') {
            return { state: false, message: 'Você não informou o título' };
        } else if (form.time == '') {
            return { state: false, message: 'Você não informou o horário' };
        } else if (!emptyFoods || emptyFoods.length == 0) {
            return { state: false, message: 'Você não selecionou nenhum alimento' };
        } else if (OnlyNameFoods && OnlyNameFoods.length > 0) {
            return { state: false, message: 'Você não informou a quantidade de um dos alimentos' };
        } else if (form.type.value == '') {
            return { state: false, message: 'Você não selecionou um tipo' };
        } else if (form.difficult == 0) {
            return { state: false, message: 'Você não selecionou a dificuldade' };
        } else if (!emptyDays || emptyDays.length == 0) {
            return { state: false, message: 'Você não selecionou os dias' };
        } else {
            return { state: true, message: '' };
        }
    }

    const addQtd = () => {
        if (qtdTyped != '' && qtdTyped != 0) {
            setSelectedFoods(
                selectedFoods.map(data => {
                    if (data.IDFOOD == pickerSelected.IDFOOD) {
                        data.FOODQTY = qtdTyped;
                    }
                    return data;
                })
            )
            if (pickerSelected.DESCRIPT != '') {
                reorderPickers();
            }
        }
    };

    const addFoods = food => {
        const checkRepete = checkRepeteFood(food);
        if (checkRepete) {
            setSelectedFoods(
                selectedFoods.map(data => {
                    if (data.IDFOOD == pickerSelected.IDFOOD) {
                        data.DESCRIPT = food.DESCRIPT;
                        data.IDFOOD = food.IDFOOD;
                        data.BASEUNIT = food.BASEUNIT;
                    }
                    return data;
                })
            )
            if (pickerSelected.FOODQTY != 0) {
               reorderPickers();
            }
        } else {
            Toast('Você já selecionou esse alimento');
        }
    };

    const reorderPickers = () => {
        const newPickerFood = [Object.assign({}, foodInfo)];
        const checkEmptyExist = selectedFoods.filter(data => { return data.IDFOOD == foodInfo.IDFOOD });
        setSelectedFoods(checkEmptyExist && checkEmptyExist.length > 0 ? selectedFoods : [...selectedFoods, ...newPickerFood]);
    }

    const checkRepeteFood = (food) => {
        const repeteFood = selectedFoods.filter(function (item) {
            return item.IDFOOD == food.IDFOOD;
        });
        if (repeteFood && repeteFood.length > 0) {
            return false;
        } else {
            return true;
        }
    };
    
    const changeStateCheckboxDays = (dayCheck) => {
        setCheckboxDays(
            checkboxDays.map(data => {
                if (data.id == dayCheck.id) {
                    data.selected = !(data.selected);
                }
                return data;
            })
        )
    };

    const setTimeMission = time => {
        setTimePickerVisibility(false);
        setTime(time.getHours() + ':' + time.getMinutes());
    };

    const openModalQtd = objPicker => {
        if (objPicker.IDFOOD) {
            setPickerSelected(objPicker);
            setModalQtdVisible(true);
        } else {
            Toast('Informe primeiro o alimento');
        }
    }

    const openModalFoods = objPicker => {
        setPickerSelected(objPicker);
        setModalFoodVisible(true);
    }

    return (
        <>
            <ContainerScroll
                paddingTop={'10px'}
                paddingLeft={'20px'}
                paddingRight={'20px'}
                paddingBottom={'20px'}>
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={time => { setTimeMission(time) }}
                    onCancel={() => { setTimePickerVisibility(false) }}
                    display='spinner'
                    is24Hour={true}
                />
                <QtdModal
                    visible={modalQtdVisible}
                    setModalQtdVisible={setModalQtdVisible}
                    setQtdTyped={setQtdTyped}
                    addQtd={addQtd}
                    unit={pickerSelected?.BASEUNIT}
                />
                <FoodsModal
                    visible={modalFoodVisible}
                    setModalFoodVisible={setModalFoodVisible}
                    addFoods={addFoods}
                />
                <Header sizeHeaderApp={true} height={20} image={navigation.getParam('mission') ? VIEW : MISSION } />
                <Hr spacing={'30px'} />
                <Container marginTop={'10px'} alignItems={'center'}>
                    <Title font={'25px'}>CRIAÇÃO</Title>
                    <Input
                        containerStyle={styles.inputContent}
                        inputContainerStyle={styles.inputCustom}
                        inputStyle={styles.textInputCustom}
                        placeholder='NOME'
                        placeholderTextColor={Colors.disabled}
                        onChangeText={text => setTitle(text)}
                        value={title}
                        disabled={navigation.getParam('mission') ? true : false}
                    />
                    {selectedFoods.map((picker, index) => (
                        <ContainerRow key={index} marginBottom={'10px'}>
                            <Combobox
                                label={picker.DESCRIPT == '' ? 'Alimentos' : picker.DESCRIPT}
                                onSubmit={openModalFoods}
                                disabled={navigation.getParam('mission')}
                                info={picker}/>
                            <Combobox
                                width={25}
                                label={picker.FOODQTY == 0 ? 'QTD' : picker.FOODQTY}
                                onSubmit={openModalQtd}
                                disabled={navigation.getParam('mission')}
                                info={picker}/>
                        </ContainerRow>
                    ))}
                    <Title font={'20px'}>TIPO</Title>
                    <ContainerRow>
                        <CheckBox
                            title='NÃO COMER'
                            checked={checkboxType.value == 'avoid' && checkboxType.state}
                            containerStyle={styles.checkBox}
                            textStyle={styles.textCheckBox}
                            fontFamily='Square'
                            checkedColor={Colors.third}
                            onPress={() => navigation.getParam('mission') ? {} : setCheckboxType({ value: 'avoid', state: true })}
                        />
                        <CheckBox
                            title='COMER'
                            checked={checkboxType.value == 'eat' && checkboxType.state}
                            containerStyle={styles.checkBox}
                            textStyle={styles.textCheckBox}
                            fontFamily='Square'
                            checkedColor={Colors.third}
                            onPress={() => navigation.getParam('mission') ? {} : setCheckboxType({ value: 'eat', state: true })}
                        />
                    </ContainerRow>
                    <ContainerRow>
                        <ContainerItem width={55} height={6}>
                            <ContainerRow>
                                <ContainerWrapper justifyContent={'flex-start'}>
                                    <Title left={'5px'} font={'16px'}>DIFICULDADE:</Title>
                                </ContainerWrapper>
                                <AirbnbRating
                                    count={COUNT_DIF}
                                    showRating={false}
                                    defaultRating={difficult}
                                    size={width / 20}
                                    isDisabled={navigation.getParam('mission') ? true : false}
                                    onFinishRating={rating => { setDifficult(rating) }} />
                            </ContainerRow>
                        </ContainerItem>
                        <TouchableItem
                            width={25}
                            height={6}
                            justifyContent={'center'}
                            disabled={navigation.getParam('mission') ? true : false}
                            onPress={() => { setTimePickerVisibility(true) }}>
                            <Title font={'16px'}>{time == '' ? 'Horário' : time}</Title>
                        </TouchableItem>
                    </ContainerRow>
                    <Title top={'10px'} font={'20px'}>REPETIÇÃO DOS DIAS</Title>
                    <ContainerRow>
                        {checkboxDays.map(day => (
                            <CheckBx
                                key={day.id}
                                margin={'10px'}
                                border={'1px'}
                                backgroundColor={day.selected ? Colors.third : Colors.primary}
                                Content={<Title font={'16px'}>{day.title}</Title>}
                                disabled={navigation.getParam('mission')}
                                onSubmit={() => {changeStateCheckboxDays(day)}}
                            />
                        ))}
                    </ContainerRow>
                </Container>
                {navigation.getParam('mission') ? null : <Btn label='CRIAR'
                    padding={'10px'}
                    bottom={'20px'}
                    onSubmit={addMission}
                />}
            </ContainerScroll>
            { loading ? <Loading /> : null}
        </>
  )
}

CreateMission.navigationOptions = ({ navigation }) => {
    const options = HeaderSubScreen(navigation.getParam('mission') ? 'MISSÃO':'CRIAR MISSÃO');
    return options;
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    getMissions: () => dispatch(MissionsActions.setAllMissions())
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateMission);