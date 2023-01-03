import React from 'react';
import {
    ProgressBarAndroid
} from "react-native";
import { Title, ContainerRow } from '../../styles';
import Colors from '../../styles/colors';
import styles from '../../styles/styles';
import Stone from '../Stone';


export default StatusArea = ({ profile }) => {

    return (
        <>
            <ContainerRow
                marginTop={'10px'}
                justifyContent={'space-between'}
                alignSelf={'stretch'}>
                <Title font={'12px'} family={'SansSerif'}>VIDA</Title>
                <Title font={'12px'} family={'SansSerif'}>
                    {profile.data.CURHP}/{profile.data.MAXHP}
                </Title>
            </ContainerRow>
            <ProgressBarAndroid
                style={styles.progressBar}
                indeterminate={false}
                progress={profile.data.CURHP / profile.data.MAXHP}
                styleAttr="Horizontal"
                color={Colors.red} />
            <ContainerRow
                justifyContent={'space-between'}
                alignSelf={'stretch'}>
                <Title font={'12px'} family={'SansSerif'}>NIVEL {profile.data.LEVEL}</Title>
                <Title font={'12px'} family={'SansSerif'}>
                    {profile.data.CURXP}/{profile.data.MAXXP}
                </Title>
            </ContainerRow>
            <ProgressBarAndroid
                style={styles.progressBar}
                indeterminate={false}
                progress={profile.data.CURXP / profile.data.MAXXP}
                styleAttr="Horizontal"
                color={Colors.yellow} />
            <ContainerRow
                marginTop={'5px'}
                justifyContent={'space-between'}
                alignSelf={'stretch'}>
                <Title font={'16px'} family={'SansSerif'}>{profile.data.PROFNICK}</Title>
                <ContainerRow>
                    <Stone />
                    <Title font={'16px'} family={'SansSerif'}>x{profile.data.COIN}</Title>
                </ContainerRow>
            </ContainerRow>
        </>
    )
};