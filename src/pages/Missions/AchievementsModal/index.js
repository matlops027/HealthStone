import React from 'react';
import {
    Modal,
    TouchableWithoutFeedback
} from 'react-native';
import Colors from '../../../styles/colors';
import Unlockeds from './Unlockeds';
import {
    ContainerCenter,
    ContainerModal,
    Title,
    ContainerColumn
} from '../../../styles';

const AchievementsModal = ({ setModalAchievements, achievements, visible, info }) => {
    return (
        <Modal
            onRequestClose={() => setModalAchievements(false)}
            animationType='fade'
            transparent={true}
            visible={visible}>

            <TouchableWithoutFeedback onPress={() => setModalAchievements(false)}>
                <ContainerCenter backgroundColor={Colors.backgroundDark}>
                    <ContainerModal paddingLeft={'30px'} paddingRight={'30px'} height={achievements ? '50%' : '25%'}>
                        <Title
                            font={'25px'}
                            top={'10px'}>Conquistas</Title>
                        <ContainerColumn flex={1}>
                            <Title
                                font={'20px'}
                                left={'10px'}
                                align={'left'}>{info.ACHIEV}</Title>
                        </ContainerColumn>
                        {achievements ? <Unlockeds achievements={achievements}/> : null}
                    </ContainerModal>
                </ContainerCenter>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default AchievementsModal;