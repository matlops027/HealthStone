import React, { useState } from 'react';
import {
    TouchableOpacity,
    View
} from 'react-native';
import { ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ContainerRow, Title } from '../../../../styles';
import Colors from '../../../../styles/colors';
import styles from '../../../../styles/styles';

const FoodItem = ({ food, submit }) => {

    const [infoVisible, setInfoVisible] = useState(false);

    return (
        <>
            <TouchableOpacity onPress={() => { submit(food) }}>
                <ListItem
                    title={food.DESCRIPT}
                    bottomDivider
                    containerStyle={{ backgroundColor: Colors.modalColor }}
                    titleStyle={styles.textInputCustom}
                    rightIcon={
                        <TouchableOpacity onPress={() => {setInfoVisible(!infoVisible)}}>
                            <Icon name={infoVisible ? 'eye-slash' : 'eye'} color={Colors.white} size={25} />
                        </TouchableOpacity>
                    }
                />
                {
                    infoVisible ?
                        <View style={styles.distance}>
                            <ContainerRow justifyContent={"space-between"}>
                                <Title font={'18px'}>
                                    {food.KCALPU ? food.KCALPU : 'n.i.'}
                                    <Title font={'16px'}>{' Kcal/' + food.BASEUNIT}</Title>
                                </Title>
                                <Title font={'18px'}>
                                    {food.PROTQTTY ? food.PROTQTTY : 'n.i.'}
                                    <Title font={'14px'}>{food.PROTQTTY ? food.PROTUNIT : ''}</Title>
                                    <Title font={'16px'}> Proteína </Title>
                                </Title>
                            </ContainerRow>
                            <ContainerRow marginTop={'5px'} justifyContent={"space-between"}>
                                <Title font={'18px'}>
                                    {food.CARBQTTY ? food.CARBQTTY : 'n.i.'}
                                    <Title font={'14px'}>{food.CARBQTTY ? food.CARBUNIT : ''}</Title>
                                    <Title font={'16px'}> Carboidrato </Title>
                                </Title>
                                <Title font={'18px'}>
                                    {food.STFTQTTY ? food.STFTQTTY : 'n.i.'}
                                    <Title font={'14px'}>{food.STFTQTTY ? food.STFTUNIT : ''}</Title>
                                    <Title font={'16px'}> Gordura </Title>
                                </Title>
                            </ContainerRow>
                            <ContainerRow marginTop={'5px'} justifyContent={"space-between"}>
                                <Title font={'18px'}>
                                    {food.SODIQTTY ? food.SODIQTTY : 'n.i.'}
                                    <Title font={'14px'}>{food.SODIQTTY ? food.SODIUNIT : ''}</Title>
                                    <Title font={'16px'}> Sódio </Title>
                                </Title>
                            </ContainerRow>
                        </View>
                    : null
                }
                
            </TouchableOpacity>
        </>
    )
}

export default FoodItem;