import React from 'react';
import { Image } from 'react-native';

import { ContainerCenter } from '../../styles';
import { LOGO } from '../../assets/consts';

export default Logo = () => (
    <ContainerCenter>
        <Image source={LOGO} />
    </ContainerCenter>
)