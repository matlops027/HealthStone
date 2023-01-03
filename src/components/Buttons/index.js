import React from 'react';
import { View } from 'react-native';

import { TextBtn, Button } from '../../styles';
import Colors from '../../styles/colors';
import styles from '../../styles/styles';

export default Btn = ({ backgroundColor, onSubmit, label, padding, font, disabled, bottom }) => (
    <View style={styles.containerButton}>
        <Button
            disabled={disabled}
            backgroundColor={backgroundColor}
            activeOpacity={0.7}
            padding={padding}
            bottom={bottom}
            onPress={() => onSubmit()}>
            <TextBtn font={font} color={Colors.white}>{label}</TextBtn>
        </Button>
    </View>
)