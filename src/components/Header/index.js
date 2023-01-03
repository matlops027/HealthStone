import React from 'react';
import { Image } from 'react-native';
import styles from '../../styles/styles';
import { ContainerHeader } from '../../styles';


export default Header = ({ image, height, sizeHeaderApp}) => (
    <ContainerHeader height={height}>
        <Image style={sizeHeaderApp ? styles.imgHeader : null} source={image} />
    </ContainerHeader>
)