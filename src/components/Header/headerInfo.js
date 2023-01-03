import React from 'react';
import { Dimensions } from "react-native";
import { Avatar } from "react-native-avataaars";
const { width, height } = Dimensions.get('window');

import AddBtn from '../Buttons/AddButton';
import StatusArea from '../StatusArea';
import { Container, ContainerRow, Content } from '../../styles';
import styles from '../../styles/styles';

const HeaderInfo = ({ profile, avatar, addButton, fnAddButton }) => {
  return (
      <ContainerRow
          alignSelf={'stretch'}
          justifyContent={'space-around'}
      >
        <Content marginRight={'5px'}>
          <Avatar
              style={styles.avatar}
              size={width * (30 / 100)}
              topType={avatar.data.TOPTYPE}
              hairColor={avatar.data.HAIRCOLO}
              hatColor={avatar.data.HATCOLO}
              facialHairType={avatar.data.FACHAITY}
              facialHairColor={avatar.data.FACHAICO}
              accessoriesType={avatar.data.ACCETYPE}
              clotheType={avatar.data.CLOTTYPE}
              clotheColor={avatar.data.CLOTCOLO}
              graphicType={avatar.data.GRAPTYPE}
              eyeType={avatar.data.EYETYPE}
              eyebrowType={avatar.data.EYEBTYPE}
              mouthType={avatar.data.MOUNTYPE}
              skinColor={avatar.data.SKINCOLO}
          />
          {
            addButton ? <AddBtn icon='pencil'
              onSubmit={fnAddButton} /> : null
          }
        </Content>
        <Container>
          <StatusArea profile={profile}/>
        </Container>
      </ContainerRow>
  )
}

export default HeaderInfo;