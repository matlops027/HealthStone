import React from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { ListItem } from 'react-native-elements';
import Colors from '../../../styles/colors';
import {
  ContainerCenter,
  ContainerModal
} from '../../../styles';
import styles from '../../../styles/styles';

const OptionsModal = ({ setModalPickerVisible, visible, info, changeAvatar, level }) => {
  return (
    <Modal
      onRequestClose={() => setModalPickerVisible(false)}
      animationType='Slide'
      transparent={true}
      visible={visible}>

      <TouchableWithoutFeedback onPress={() => setModalPickerVisible(false)}>
        <ContainerCenter backgroundColor={Colors.backgroundDark}>
          <ContainerModal height={'50%'}>
            <FlatList
              data={info.value}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                item.level <= level ?
                <TouchableOpacity onPress={() => changeAvatar(item)}>
                  <ListItem
                    title={item.label}
                    bottomDivider
                    containerStyle={{ backgroundColor: Colors.modalColor }}
                    titleStyle={styles.textInputCustom}
                  />
                </TouchableOpacity> : null
              }
            />
          </ContainerModal>
        </ContainerCenter>
      </TouchableWithoutFeedback>

    </Modal>
  )
}

export default OptionsModal;