import React from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { ListItem } from 'react-native-elements';
import Colors from '../../styles/colors';
import {
  ContainerCenter,
  ContainerModal
} from '../../styles';
import styles from '../../styles/styles';

const Dropbox = ({ setModalVisible, visible, info, submit, text, id, formColumn }) => {
  return (
    <Modal
      onRequestClose={() => setModalVisible(false)}
      animationType='Slide'
      transparent={true}
      visible={visible}>

      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <ContainerCenter backgroundColor={Colors.backgroundDark}>
          <ContainerModal height={'50%'}>
            <FlatList
              data={info}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                <TouchableOpacity onPress={() => submit(item[id], formColumn)}>
                  <ListItem
                    title={item[text]}
                    bottomDivider
                    containerStyle={{ backgroundColor: Colors.modalColor }}
                    titleStyle={styles.textInputCustom}
                  />
                </TouchableOpacity>
              }
            />
          </ContainerModal>
        </ContainerCenter>
      </TouchableWithoutFeedback>

    </Modal>
  )
}

export default Dropbox;