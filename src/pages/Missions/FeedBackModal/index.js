import React from 'react';
import {
    Modal,
    TouchableWithoutFeedback
} from 'react-native';
import Colors from '../../../styles/colors';
import {
    ContainerCenter,
    ContainerModal,
    Title,
    ContainerColumn,
    ContainerRow,
    Content
} from '../../../styles';
import Stone from '../../../components/Stone';

const FeedBackModal = ({ setModalFeedBack, visible, info }) => {
    return (
        <Modal
            onRequestClose={() => setModalFeedBack(false)}
            animationType='fade'
            transparent={true}
            visible={visible}>

            <TouchableWithoutFeedback onPress={() => setModalFeedBack(false)}>
                <ContainerCenter backgroundColor={Colors.backgroundDark}>
                    <ContainerModal height={'25%'}>
                        <Title
                            font={'30px'}
                            top={'10px'}>{info.STATUS == 1 ? 'Parabéns !' : 'Que Pena !'}</Title>
                        <ContainerColumn alignItems={'flex-start'} flex={1}>
                            <Title
                                font={'20px'}
                                left={'10px'}
                                align={'left'}>Vida {info.CURHP}</Title>
                            <Title
                                font={'20px'}
                                left={'10px'}
                                align={'left'}>EXP {info.CURXP}</Title>
                            <ContainerRow>
                                <Stone />
                                <Title
                                    font={'20px'}
                                    left={'10px'}
                                    align={'left'}>{info.COIN}</Title>
                            </ContainerRow>
                        </ContainerColumn>
                        {info.BONUS ? <Content marginBottom={'10px'}>
                            <Title>{info.BONUS}</Title>
                        </Content> : null }
                    </ContainerModal>
                </ContainerCenter>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default FeedBackModal;