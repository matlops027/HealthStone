import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../styles/colors';

export const HeaderApp = (navigation, name) => {

    return {
        title: name,
        headerStyle: {
            backgroundColor: Colors.third,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
            fontWeight: 'normal',
            fontSize: 20,
            fontFamily: 'Square'
        },
        headerLeft: () =>
            <Icon
                name="bars"
                size={30}
                color={Colors.white}
                style={{ paddingLeft: 10 }}
                onPress={() => { navigation.openDrawer() }} />,

        animationEnabled: true
    }

}

export const HeaderAccount = () => {

    return {
        headerShown: false,
        animationEnabled: false
    }

}
export const HeaderSubScreen = (name) => {

    return {
        title: name,
        headerStyle: {
            backgroundColor: Colors.third,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
            fontWeight: 'normal',
            fontSize: 20,
            fontFamily: 'Square'
        },
        animationEnabled: true
    }

}