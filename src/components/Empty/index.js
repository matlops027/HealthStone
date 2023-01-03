import React from 'react';

import { ContainerCenter, ImageEmpty, Title } from '../../styles';
import Colors from '../../styles/colors';
import { EMPTY } from '../../assets/consts';

export default Empty = ({ label, height, width }) => (
    <ContainerCenter backgroundColor={Colors.transparent}>
        <ImageEmpty source={EMPTY} sizeW={width} sizeH={height} />
        <Title font={'20px'} color={Colors.disabled}>{label}</Title>
    </ContainerCenter>
)