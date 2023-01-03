import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { HeaderApp } from '../../components/Header/headersNavigation';
import { SafeContainer, Hr, Content, Title, Container, ContainerRow } from '../../styles';
import styles from '../../styles/styles';
import Colors from '../../styles/colors';
import HeaderInfo from '../../components/Header/headerInfo';
import Grid from '../../components/Grid';
import Btn from '../../components/Buttons';
import Toast from '../../components/Toasts';
import Loading from '../../components/Loading';
import { RewardPath } from '../../assets/consts';
import { useRewards, getRewardProfile } from '../../services/rewardsService';
import * as ProfileActions from '../../store/actions/profile';

const Profile = ({ navigation, profile, avatar, user, getProfile }) => {

  const [loading, setLoading] = useState(false);
  const [profileRewards, setProfileRewards] = useState([]);

  useEffect(() => {
    if (profile.data.IDPROF) {
      getAllProfileRewards();
    }
  }, [profile])

  const getAllProfileRewards = async () => {
    setLoading(true);
    await getRewardProfile().then(res => {
      setLoading(false);
      setProfileRewards(res.profRewards);
    }).catch(err => {
      setLoading(false);
      Toast('Erro ao carregar as recompensas');
    });
  }

  const RenderProfileRewards = (data) => (
    <>
      <Image
        style={styles.imageReward}
        source={RewardPath(data.IMAGE)}
      />
      {
        !data.empty ?
          <Title font={'16px'} family={'SansSerif'}>x{data.QTD}</Title> : null
      }
    </>
  );

  const useReward = async () => {

    if (profileRewards.length > 0) {

      const profileRewardsSelected = profileRewards.filter(userReward => { return userReward.state });

      if (profileRewardsSelected.length > 0) {
        setLoading(true);

        await useRewards(profileRewardsSelected, profile.data).then(res => {
          setLoading(false);
          getProfile();
          Toast('Recompensa consumida com sucesso');
        }).catch(err => {
          setLoading(false);
          Toast('Erro ao consumir recompensa');
        });

      } else {
        Toast('Nenhuma recompensa selecionada');
      }

    }
  }
  
  return (
    <>
      <SafeContainer
        paddingTop={'20px'}
        paddingLeft={'20px'}
        paddingRight={'20px'}
        paddingBottom={'20px'}
        backgroundColor={Colors.primary}>
        <HeaderInfo
          profile={profile}
          avatar={avatar}
          addButton={true}
          fnAddButton={() => { navigation.push('CreateAvatar') }} />
        <Hr />
        <ContainerRow
          marginTop={'20px'}
          marginBottom={'5px'}
          alignSelf={'stretch'}
          alignItems={'flex-start'}
          justifyContent={'flex-start'}
        >
          <Title align={'left'} color={Colors.disabled}>Nome Completo:</Title>
          <Title align={'left'} color={Colors.disabled}>{user.data.USERNAME}</Title>
        </ContainerRow>
        <ContainerRow
          alignSelf={'stretch'}
          alignItems={'flex-start'}
          justifyContent={'flex-start'}
        >
          <Title align={'left'} color={Colors.disabled}>E-mail:</Title>
          <Title align={'left'} color={Colors.disabled}>{user.data.USERMAIL}</Title>
        </ContainerRow>
        <Content marginTop={'30px'} alignSelf={'stretch'}>
          <Title font={'25px'}>INVENTÁRIO</Title>
        </Content>
        <Container alignItems={'center'} marginTop={'10px'}>
          <Grid
            type={'table'}
            info={profileRewards}
            columns={4}
            fn={setProfileRewards}
            contentRender={RenderProfileRewards} />
        </Container>
        <Btn label='USAR'
          padding={'10px'}
          bottom={'10px'}
          onSubmit={useReward}
        />
      </SafeContainer>
      { loading || profile.loading ? <Loading /> : null}
    </>
  )
}

Profile.navigationOptions = ({ navigation }) => {
  const options = HeaderApp(navigation, 'PERFIL');
  return options;
}

const mapStateToProps = state => ({
  avatar: state.avatar,
  profile: state.profile,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getProfile: () => dispatch(ProfileActions.setProfInfo()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);