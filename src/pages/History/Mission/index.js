import React from 'react';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { ContainerItem, ContainerRow, ContainerWrapper, Hr, Title } from '../../../styles';
import Actions from '../../../components/Actions';
import { AirbnbRating } from 'react-native-elements';
import { COUNT_DIF } from '../../../utils';

const Mission = ({ info, alertDeleteConfirmation, navigation }) => {
    return (
        <ContainerItem justifyContent={'flex-start'} marginBottom={'10px'}>
            <ContainerRow>
                <ContainerWrapper>
                    <Title font={'16px'} family={'SansSerif'}>{info.mission.TITLE}</Title>
                </ContainerWrapper>
                <AirbnbRating
                    count={COUNT_DIF}
                    isDisabled={true}
                    showRating={false}
                    defaultRating={info.mission.DIFFCULT}
                    size={width / 40} />
                <Actions
                    options={[
                        { label: 'Visualizar', fn: () => { navigation.push('CreateMission', { mission: info.mission }) } },
                        { label: 'Deletar', fn: () => { alertDeleteConfirmation(info) } }
                    ]}
                />
            </ContainerRow>
            <Hr spacing={'0px'} />
            <Title
                alignSelf={'flex-start'}
                family={'SanSerif'}
                font={'15px'}
                left={'10px'}
                top={'5px'}
                bottom={'5px'}>Data: {info.DTHIST}</Title>
        </ContainerItem>
    )
}

export default Mission;