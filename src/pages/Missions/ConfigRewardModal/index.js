import React, { useState } from 'react';
import {
    Modal,
    TouchableWithoutFeedback
} from 'react-native';
import Colors from '../../../styles/colors';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    ContainerCenter,
    ContainerModal
} from '../../../styles';
import styles from '../../../styles/styles';
import { objInfo } from './config';
import Stone from '../../../components/Stone';

const ConfigRewardModal = ({ visible, setModalConfigReward, addConfigReward, mission }) => {

    const [objConfigReward, setObjConfigReward] = useState(objInfo(mission));

    const submit = () => {
        setModalConfigReward(false);
        addConfigReward(objConfigReward);
    };

    const closeModal = () => {
        setObjConfigReward(objInfo(mission));
        setModalConfigReward(false);
    };

    return (
        <Modal
            onRequestClose={() => closeModal()}
            animationType='Slide'
            transparent={true}
            visible={visible}>

            <TouchableWithoutFeedback onPress={() => closeModal()}>
                <ContainerCenter backgroundColor={Colors.backgroundDark}>
                    <ContainerModal height={'55%'}>
                        <ContainerCenter backgroundColor={Colors.transparent}>
                            <Input
                                label='Recompensa de pedras'
                                onChangeText={(qtd) => { setObjConfigReward({...objConfigReward, QUESCOIN: qtd}) }}
                                keyboardType='numeric'
                                inputStyle={styles.textInputCustom}
                                labelStyle={styles.textInputCustom}
                                placeholderTextColor={Colors.white}
                                value={objConfigReward.QUESCOIN?.toString()}
                                leftIcon={<Stone />}
                            />
                            <Input
                                label='Recompensa de XP'
                                onChangeText={(qtd) => { setObjConfigReward({...objConfigReward, QUESXP: qtd}) }}
                                keyboardType='numeric'
                                inputStyle={styles.textInputCustom}
                                placeholderTextColor={Colors.white}
                                labelStyle={styles.textInputCustom}
                                value={objConfigReward.QUESXP?.toString()}
                                leftIcon={
                                    <Icon
                                        name='angle-double-up'
                                        size={30}
                                        color={Colors.white}
                                    />
                                }
                            />
                        </ContainerCenter>
                        <Btn label='CONFIRMAR'
                            padding={'10px'}
                            bottom={'10px'}
                            onSubmit={submit}
                        />
                    </ContainerModal>
                </ContainerCenter>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default ConfigRewardModal;