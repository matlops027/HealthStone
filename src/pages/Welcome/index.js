import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import Logo from '../../components/Logo';
import { getUserLogged } from '../../services/accountService';

export default Welcome = ({ navigation }) => {
    useEffect(() => {
        setTimeout( async () => {
            await getUserLogged().then(user => {
                if (user) {
                    navigation.navigate('App');
                } else {
                    navigation.navigate('Auth');
                }
            });
        }, 2000);
    }, []);
    return (
        <>
            <StatusBar hidden />
            <Logo />
        </>
    )
}