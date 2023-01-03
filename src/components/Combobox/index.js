import React from 'react';
import { Combo, ContainerRow, Title } from '../../styles';
import Colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const Combobox = ({label, onSubmit, width, height, info, right, disabled}) => {
  return (
    <Combo
      width={width}
      height={height}
      marginRight={right}
      onPress={() => disabled ? {} : onSubmit(info)}>
      <ContainerRow
        paddingLeft={'10px'}
        paddingRight={'10px'}
        alignSelf={'stretch'}
        justifyContent={'space-between'}>
        <Title color={disabled ? Colors.disabled : Colors.white} font={'16px'}>{label}</Title>
        <Icon color={disabled ? Colors.disabled : Colors.white} size={20} name='caret-down' />
      </ContainerRow>
    </Combo>
  )
}

export default Combobox;