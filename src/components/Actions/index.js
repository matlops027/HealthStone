import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../styles/colors';
import styles from '../../styles/styles';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

export default Actions = ({ options }) => (
    <Menu style={styles.menuAction}>
        <MenuTrigger
            customStyles={{
                TriggerTouchableComponent: TouchableOpacity
            }}
            children={<Icon color={Colors.white} size={width / 14} name='ellipsis-h' />} />
        
        <MenuOptions optionsContainerStyle={styles.menuOptions}>
            {options.map((op, i) => (
                <MenuOption
                    key={i}
                    onSelect={op.fn}
                    text={op.label}
                />
            ))}
        </MenuOptions>
    </Menu>
)