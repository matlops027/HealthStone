import React from 'react';
import { TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ContainerRow, Hr, Title } from '../../../styles';
import Colors from '../../../styles/colors';
import styles from '../../../styles/styles';
import { typesCategoryFoods } from '../../../utils';

const FoodList = ({ food, editButtonSubmit }) => {

    return (
        <>
            <ListItem
                title={food.DESCRIPT}
                containerStyle={{ backgroundColor: Colors.transparent }}
                titleStyle={styles.textInputCustom}
                rightIcon={
                        <TouchableOpacity onPress={() => editButtonSubmit({ food: food })}>
                            <Icon name={'pencil'} color={Colors.white} size={25} />
                        </TouchableOpacity>
                    }
            />
            <ContainerRow paddingLeft={'15px'} paddingRight={'15px'} justifyContent={"space-between"}>
                <Title font={'16px'}>
                    {food.CATEGOID ? typesCategoryFoods.filter(c => { return c.id == food.CATEGOID })[0].description : 'n.i.'}
                </Title>
                <Title font={'16px'}>
                    {food.KCALPU ? food.KCALPU : 'n.i.'} <Title font={'16px'}>{'Kcal/' + food.BASEUNIT}</Title>
                </Title>
            </ContainerRow>
            <ContainerRow paddingLeft={'15px'} paddingRight={'15px'} marginTop={'5px'} justifyContent={"space-between"}>
                <Title font={'16px'}>
                    {food.SODIQTTY ? food.SODIQTTY : 'n.i.'}
                    <Title font={'14px'}>{food.SODIQTTY ? food.SODIUNIT : ''}</Title>
                    <Title font={'16px'}> Sódio </Title>
                </Title>
                <Title font={'16px'}>
                    {food.PROTQTTY ? food.PROTQTTY : 'n.i.'}
                    <Title font={'14px'}>{food.PROTQTTY ? food.PROTUNIT : ''}</Title>
                    <Title font={'16px'}> Proteína </Title>
                </Title>
            </ContainerRow>
            <ContainerRow paddingLeft={'15px'} paddingRight={'15px'} marginTop={'5px'} justifyContent={"space-between"}>
                <Title font={'16px'}>
                    {food.STFTQTTY ? food.STFTQTTY : 'n.i.'}
                    <Title font={'14px'}>{food.STFTQTTY ? food.STFTUNIT : ''}</Title>
                    <Title font={'16px'}> Gordura </Title>
                </Title>
                <Title font={'16px'}>
                    {food.CARBQTTY ? food.CARBQTTY : 'n.i.'}
                    <Title font={'14px'}>{food.CARBQTTY ? food.CARBUNIT : ''}</Title>
                    <Title font={'16px'}> Carboidrato </Title>
                </Title>
            </ContainerRow>
            <Hr/>
        </>
    )
}

export default FoodList;