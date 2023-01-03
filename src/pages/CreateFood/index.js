import React, { useState } from 'react';
import { ContainerScroll, Hr, Container, Title, ContainerRow } from '../../styles';
import { HeaderSubScreen } from '../../components/Header/headersNavigation';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Combobox from '../../components/Combobox';
import Btn from '../../components/Buttons';
import Toast from '../../components/Toasts';
import Dropbox from '../../components/Dropbox';
import { Input } from 'react-native-elements';
import styles from '../../styles/styles';
import Colors from '../../styles/colors';
import { MISSION } from '../../assets/consts';
import { objUnits, typesCategoryFoods } from '../../utils';
import { objForm, units } from './config';
import { createFoodUser, updateUserFood } from '../../services/foodService';

const CreateFood = ({ navigation }) => {

  const [loading, setLoading] = useState(false);
  const [modalCategories, setModalCategories] = useState(false);
  const [formName, setFormName] = useState(null);
  const [modalUnits, setModalUnits] = useState(false);
  const [form, setForm] = useState(
    Object.assign({}, navigation.getParam('food') ? navigation.getParam('food') : objForm)
  );

  const addFood = async () => {
    setLoading(true);

    const validation = await validationForm();
    if (validation.state) {
      await createFoodUser(form).then(res => {
          setLoading(false);
          Toast('Alimento criado com sucesso');
          navigation.pop();
      }).catch(err => {
          setLoading(false);
          Toast('Erro ao criar o alimento');
      });
    } else {
        setLoading(false);
        Toast(validation.message);
    }
  }

  const editFood = async () => {
    setLoading(true);
    const objUpdateFood = Object.assign({}, objForm);
    Object.keys(objUpdateFood).forEach(function(item){
      objUpdateFood[item] = form[item];
    });
    objUpdateFood['IDFOOD'] = form.IDFOOD;
    const validation = await validationForm();
    if (validation.state) {
      await updateUserFood(objUpdateFood).then(res => {
          setLoading(false);
          Toast('Alimento editado com sucesso');
          navigation.pop();
      }).catch(err => {
          setLoading(false);
          Toast('Erro ao editar o alimento');
      });
    } else {
        setLoading(false);
        Toast(validation.message);
    }
  }

  const validationForm = () => {

        if (form.DESCRIPT == '') {
            return { state: false, message: 'Você não informou o nome' };
        } else if (form.BASEUNIT == '') {
            return { state: false, message: 'Você não informou a unidade base' };
        } else if (!form.BASEQTTY) {
            return { state: false, message: 'Você não informou a quantidade base' };
        } else if (!form.CATEGOID) {
            return { state: false, message: 'Você não informou a categoria' };
        } else {
            return { state: true, message: '' };
        }
    }

  const changeCategory = (idCategory) => {
    setForm({ ...form, CATEGOID: idCategory });
    setModalCategories(false);
  }

  const showUnitOptions = (key) => {
    setFormName(key);
    setModalUnits(true);
  }

  const changeUnits = (value, key) => {
    const auxForm = form;
    auxForm[key] = value;
    setForm(auxForm);
    setModalUnits(false);
  }

  return (
    <>
      <ContainerScroll
        paddingTop={'10px'}
        paddingLeft={'20px'}
        paddingRight={'20px'}
        paddingBottom={'20px'}>
        <Dropbox
          setModalVisible={setModalCategories}
          submit={changeCategory}
          visible={modalCategories}
          info={typesCategoryFoods}
          text={'description'}
          id={'id'}
        />
        <Dropbox
          setModalVisible={setModalUnits}
          submit={changeUnits}
          visible={modalUnits}
          info={objUnits}
          formColumn={formName}
          text={'name'}
          id={'value'}
        />
        <Header sizeHeaderApp={true} height={20} image={MISSION} />
        <Hr spacing={'30px'} />
        <Container marginTop={'10px'} alignItems={'center'}>
          <Title font={'25px'}>CRIAÇÃO</Title>
          <Input
            containerStyle={styles.inputContent}
            inputContainerStyle={styles.inputCustom}
            inputStyle={styles.textInputCustom}
            placeholder='NOME'
            placeholderTextColor={Colors.disabled}
            onChangeText={text => setForm({...form, DESCRIPT: text})}
            value={form.DESCRIPT}
          />
          <ContainerRow marginBottom={'10px'}>
            <Combobox width={40} onSubmit={showUnitOptions} info={'BASEUNIT'} label={form.BASEUNIT ? objUnits.filter(u => {
              return u.value == form.BASEUNIT
            })[0].name : 'UNIDADE BASE' }/>
            <Input
              containerStyle={styles.inputHalfContent}
              inputContainerStyle={styles.inputHalfCustom}
              inputStyle={styles.textInputCustom}
              placeholder='QTD BASE'
              placeholderTextColor={Colors.disabled}
              keyboardType={'numeric'}
              onChangeText={text => setForm({...form, BASEQTTY: text})}
              value={form.BASEQTTY?.toString()}
            />
          </ContainerRow>
          <Combobox
            label={form.CATEGOID ? typesCategoryFoods.filter(c => {
              return c.id == form.CATEGOID
            })[0].description : 'CATEGORIA'}
              width={80}
            onSubmit={setModalCategories}
            info={true}
            />
          <Title top={'10px'}  font={'20px'}>CAMPOS OPCIONAIS</Title>
          <Input
              containerStyle={styles.inputContent}
              inputContainerStyle={styles.inputCustom}
              inputStyle={styles.textInputCustom}
              placeholder={'KCAL/'+ form.BASEQTTY + form.BASEUNIT}
              placeholderTextColor={Colors.disabled}
              keyboardType={'numeric'}
              onChangeText={text => setForm({...form, ENRGKCAL: text})}
              value={form.ENRGKCAL?.toString()}
            />
          { units.map((u,i) => (
              <ContainerRow key={i} marginBottom={'10px'}>
                <Input
                  containerStyle={styles.inputHalfContent}
                  inputContainerStyle={styles.inputHalfCustom}
                  inputStyle={styles.textInputCustom}
                  placeholder={u.description}
                  placeholderTextColor={Colors.disabled}
                  keyboardType={'numeric'}
                  onChangeText={text => changeUnits(text, u.qtd)}
                  value={form[u.qtd]?.toString()}
                />
                <Combobox width={40} onSubmit={showUnitOptions} info={u.unit} label={form[u.unit] ? objUnits.filter(obj => {
                  return obj.value == form[u.unit]
                })[0].name : 'UNIDADE' }/>
              </ContainerRow>
            ))
          }
        </Container>
        <Btn label='CRIAR'
          padding={'10px'}
          bottom={'20px'}
          onSubmit={form.IDFOOD ? editFood : addFood}
        />
      </ContainerScroll>
      { loading ? <Loading /> : null}
    </>
  )
}

CreateFood.navigationOptions = ({ navigation }) => {
  const options = HeaderSubScreen('CRIAR ALIMENTO');
  return options;
}

export default CreateFood;