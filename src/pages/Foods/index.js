import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { Container } from '../../styles';
import styles from '../../styles/styles';
import Colors from '../../styles/colors';
import { HeaderApp } from '../../components/Header/headersNavigation';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import FabBtn from '../../components/Buttons/fabButton';
import Toast from '../../components/Toasts';
import FoodList from './FoodList';
import { getFoodsFilter } from '../../services/foodService';

const Foods = ({ navigation }) => {

  const [searchFood, setSearchFood] = useState('');
  const [filterFoods, setFilterFoods] = useState([]);
  const [timeOutID, setTimeOutID] = useState(null);

  const updateSearchFood = search => {
    setSearchFood(search);
    clearTimeout(timeOutID);
    if (search != '' && search.length > 2) {
      setTimeOutID(setTimeout(function () { getFoodSearched(search) }, 2000));
    } else {
      setFilterFoods([]);
    }
  };

  const getFoodSearched = async (searchFood) => {
    await getFoodsFilter(searchFood, '').then(res => {
      setFilterFoods(res);
    }).catch(err => {
      Toast('Erro ao buscar comida');
    });
  }

  const goFoward = (param) => {
    setSearchFood('');
    setFilterFoods([]);
    navigation.push('CreateFood', param);
  }

  return (
    <>
      <Container
        paddingTop={'10px'}
        paddingLeft={'10px'}
        paddingRight={'10px'}
        paddingBottom={'10px'}
        backgroundColor={Colors.primary}>
        <SearchBar
          platform='android'
          round={true}
          placeholder="Pesquisar..."
          onChangeText={(textInput) => { updateSearchFood(textInput) }}
          value={searchFood}
          containerStyle={{ backgroundColor: Colors.transparent }}
          inputStyle={styles.textInputCustom}
          placeholderTextColor={Colors.disabled}
          underlineColorAndroid={Colors.disabled}
          cancelIcon={<Icon onPress={() => { setSearchFood('') }} name={'arrow-left'} color={Colors.disabled} size={20} />}
          searchIcon={<Icon name={'search'} color={Colors.disabled} size={20} />}
          clearIcon={<Icon onPress={() => {setSearchFood('')}} name={'times'} color={Colors.disabled} size={20} />}
        />
        <FlatList
          data={filterFoods}
          style={{alignSelf:'stretch'}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <FoodList food={item} editButtonSubmit={goFoward} />}
        />
        <FabBtn icon='plus'
          onSubmit={goFoward} />
      </Container>
    </>
  )
}

Foods.navigationOptions = ({ navigation }) => {
  const options = HeaderApp(navigation, 'ALIMENTOS');
  return options;
}

export default Foods;