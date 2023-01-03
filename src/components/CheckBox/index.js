import React from 'react';
import { CheckBox } from '../../styles';

export default CheckBx = ({ backgroundColor, onSubmit, margin, disabled, size, border, Content, alignSelf }) => (
    <CheckBox
        backgroundColor={backgroundColor}
        activeOpacity={0.7}
        margin={margin}
        size={size}
        border={border}
        alignSelf={alignSelf}
        onPress={() => disabled ? {} : onSubmit()}>
        { Content }
    </CheckBox>
)