import React from 'react';

import { AddButton } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../styles/colors';

export default AddBtn = ({ onSubmit, icon }) => (
    <AddButton onPress={() => onSubmit()}>
        <Icon name={icon} color={Colors.white} size={20}></Icon>
    </AddButton>
)