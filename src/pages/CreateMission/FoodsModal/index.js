import React, { useState } from 'react';
import {
    Modal,
    TouchableWithoutFeedback,
    FlatList
} from 'react-native';
import Colors from '../../../styles/colors';
import { SearchBar } from 'react-native-elements';
import FoodItem from './FoodItem';
import {
    ContainerCenter,
    ContainerModal,
    Title,
    SafeContainer
} from '../../../styles';
import { getFoodsFilter } from '../../../services/foodService';
import Toast from '../../../components/Toasts';
import Grid from '../../../components/Grid';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../../styles/styles';
import { typesCategoryFoods } from '../../../utils';

const FoodsModal = ({ visible, setModalFoodVisible, addFoods }) => {

    const [searchFood, setSearchFood] = useState('');
    const [category, setCategory] = useState('');
    const [filterFoods, setFilterFoods] = useState([]);
    const [timeOutID, setTimeOutID] = useState(null);
    const [filters, setFilters] = useState(Array.from(typesCategoryFoods, (c => c = { ...c, state: false })));
    
    const updateSearchFood = search => {
        setSearchFood(search);
        clearTimeout(timeOutID);
        if (search != '' && search.length > 2) {
            setTimeOutID(setTimeout(function () { getFoodSearched(search, category) }, 2000));
        } else {
            setFilterFoods([]);
        }
    };

    const updateFilterFood = (categories) => {
        setFilters(categories);
        const selectedFilters = [];
        categories.map(data => {
            if (data.state) {
                selectedFilters.push(data.id)
            }
        });
        if (selectedFilters.length > 0) {
            setCategory(selectedFilters.join());
            getFoodSearched(searchFood, selectedFilters.join());
        } else {
            setCategory('');
        }
    };

    const getFoodSearched = async (searchFood, category) => {
        await getFoodsFilter(searchFood, category).then(res => {
            setFilterFoods(res);
        }).catch(err => {
            Toast('Erro ao buscar comida');
        });
    }

    const closeModalFoods = () => {
        setModalFoodVisible(false);
        setSearchFood('');
        setFilterFoods([]);
        setFilters(Array.from(typesCategoryFoods, (c => c = { ...c, state: false })));
    }

    const submit = data => {
        addFoods(data);
        closeModalFoods();
    };

    const RenderFilters = (data) => (
        <Title font={'14px'}>{data.description}</Title>
    );

    return (
        <Modal
            onRequestClose={() => closeModalFoods()}
            animationType='Slide'
            transparent={true}
            visible={visible}>

            <TouchableWithoutFeedback onPress={() => closeModalFoods()}>
                <ContainerCenter backgroundColor={Colors.backgroundDark}>
                    <ContainerModal spacing={'10px'}>
                        <SearchBar
                            platform='android'
                            round={true}
                            placeholder="Pesquisar..."
                            onChangeText={(textInput) => { updateSearchFood(textInput) }}
                            value={searchFood}
                            containerStyle={{ backgroundColor: Colors.modalColor }}
                            inputStyle={styles.textInputCustom}
                            placeholderTextColor={Colors.white}
                            cancelIcon={<Icon name={'arrow-left'} color={Colors.white} size={25} />}
                            clearIcon={<Icon name={'times'} color={Colors.white} size={25} />}
                            searchIcon={<Icon name={'search'} color={Colors.white} size={25} />}
                        />
                        <SafeContainer>
                            <FlatList
                                data={filterFoods}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => <FoodItem food={item} submit={submit} />}
                            />
                        </SafeContainer>
                        <ContainerCenter backgroundColor={Colors.transparent}>
                            <Title top={'30px'}>Categorias</Title>
                            <Grid
                                sizeW={22}
                                type={'filter'}
                                info={filters}
                                columns={3}
                                fn={updateFilterFood}
                                contentRender={RenderFilters} />
                        </ContainerCenter>
                    </ContainerModal>
                </ContainerCenter>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default FoodsModal;