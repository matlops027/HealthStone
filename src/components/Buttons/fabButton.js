import React from 'react';

import { FabButton } from '../../styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../styles/colors';

export default FabBtn = ({ backgroundColor, onSubmit, icon, padding, disabled }) => (
    <FabButton
        disabled={disabled}
        backgroundColor={backgroundColor}
        activeOpacity={0.7}
        padding={padding}
        onPress={() => onSubmit()}>
        <Icon name={icon} color={Colors.white} size={16}></Icon>
    </FabButton>
)