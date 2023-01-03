import React from 'react';
import {
  View,
  ActivityIndicator
} from "react-native";
import style from "./style";
import Colors from '../../styles/colors';

const Loading = () => {

    return (
        <View style={style.container}>
            <ActivityIndicator size="large" color={Colors.secondary} />
        </View>
    )
};

export default Loading;