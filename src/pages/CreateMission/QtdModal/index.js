import React from 'react';
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
import { objUnits } from '../../../utils';

const QtdModal = ({ visible, setModalQtdVisible, setQtdTyped, addQtd, unit }) => {

    const closeModalQtd = () => {
        setModalQtdVisible(false);
        setQtdTyped('');
    };

    const submit = () => {
        addQtd()
        closeModalQtd();
    };

    return (
        <Modal
            onRequestClose={() => closeModalQtd()}
            animationType='Slide'
            transparent={true}
            visible={visible}>

            <TouchableWithoutFeedback onPress={() => closeModalQtd()}>
                <ContainerCenter backgroundColor={Colors.backgroundDark}>
                    <ContainerModal height={'35%'}>
                        <ContainerCenter backgroundColor={Colors.transparent}>
                            <Input
                                placeholder={'Quantidade em ' + objUnits.filter(u => {
                                    return u.value == unit
                                })[0]?.name} 
                                onChangeText={(qtd) => { setQtdTyped(qtd) }}
                                keyboardType='numeric'
                                inputStyle={styles.textInputCustom}
                                placeholderTextColor={Colors.white}
                                leftIcon={
                                    <Icon
                                        name='balance-scale'
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

export default QtdModal;