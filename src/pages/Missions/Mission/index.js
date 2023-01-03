import React, { useState } from 'react';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { ContainerItem, ContainerWrapper, Title, ContainerRow, Hr } from '../../../styles';
import CheckBx from '../../../components/CheckBox';
import Actions from '../../../components/Actions';
import Colors from '../../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AirbnbRating } from 'react-native-elements';
import { COUNT_SEQ, COUNT_DIF } from '../../../utils';
import ConfigRewardModal from '../ConfigRewardModal';

const Mission = ({ info, informAchivement, alertDeleteConfirmation, addConfigReward, navigation }) => {
  
  const [modalConfigReward, setModalConfigReward] = useState(false);

  const IconContent = ({data}) => (
    data.STATUS == 2 ? <Icon color={Colors.white} size={20} name='check' /> :
    data.STATUS == 4 ? <Icon color={Colors.white} size={20} name='times' /> :
    data.STATUS == 0 ? <Icon color={Colors.white} size={20} name='ban' /> : null
  );
  
  return (
    <>
    <ConfigRewardModal
      visible={modalConfigReward}
      setModalConfigReward={setModalConfigReward}
      addConfigReward={addConfigReward}
      mission={info}
    />
    <ContainerItem marginBottom={'10px'}>
      <ContainerRow>
        <CheckBx
          size={11}
          margin={'10px'}
          backgroundColor={
            info.STATUS == 1 ? Colors.white  :
            info.STATUS == 2 ? Colors.done  :
            info.STATUS == 4 ? Colors.undone  : Colors.block
          }
          Content={<IconContent data={info} />}
          onSubmit={() => { informAchivement(info) }}
        />
        <ContainerWrapper>
          <Title font={'16px'} family={'SansSerif'}>{info.TITLE}</Title>
        </ContainerWrapper>
        <AirbnbRating
          count={COUNT_DIF}
          isDisabled={true}
          showRating={false}
          defaultRating={info.DIFFCULT}
          size={width / 40} />
        <Actions
          options={[
            { label: 'Configurar Recompensa', fn: () => { setModalConfigReward(true) } },
            { label: 'Visualizar', fn: () => { navigation.push('CreateMission', { mission: info }) } },
            { label: 'Deletar', fn: () => { alertDeleteConfirmation(info) } }
          ]}
        />
      </ContainerRow>
      <Hr spacing={'0px'} />
      <ContainerRow
        justifyContent={'space-between'}
        alignSelf={'stretch'}>
        <Title
          family={'SanSerif'}
          font={'15px'}
          left={'10px'}
          top={'5px'}
          bottom={'5px'}>Sequência: {info.QUESTSEQ}/{Math.ceil((info.QUESTSEQ == 0 ? 1 : info.QUESTSEQ) / COUNT_SEQ) * COUNT_SEQ}
        </Title>
        <Title
          family={'SanSerif'}
          font={'15px'}
          right={'10px'}
          top={'5px'}
          bottom={'5px'}>Kcal: {info.KCALTOT}</Title>
      </ContainerRow>
      </ContainerItem>
      </>
  )
}

export default Mission;