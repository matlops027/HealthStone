import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { Container, ContainerRow, Hr, Title, Content, ContainerCenter } from '../../styles';
import styles from '../../styles/styles';
import { connect } from 'react-redux';
import * as ProfileActions from '../../store/actions/profile';
import { getRewards, addReward } from '../../services/rewardsService';
import Toast from '../../components/Toasts';
import { HeaderApp } from '../../components/Header/headersNavigation';
import Header from '../../components/Header';
import { REWARDS, RewardPath } from '../../assets/consts';
import Stone from '../../components/Stone';
import Loading from '../../components/Loading';
import Grid from '../../components/Grid';
import Btn from '../../components/Buttons';
import { resetSelectedGrid } from '../../utils';

const Rewards = ({ navigation, profile, getProfile }) => {

    const [loading, setLoading] = useState(false);
    const [rewards, setRewards] = useState([]);

    useEffect(() => {
        getAllRewards();
    }, [])

    const getAllRewards = async () => {
        setLoading(true);
        await getRewards(setRewards).then(res => {
            setLoading(false);
        }).catch(err => {
            setLoading(false);
            Toast('Erro ao carregar as recompensas');
        });
    };

    const insertRewards = async () => {
        setLoading(true);
        const validation = await validationForm();

        if (validation.state) {
            await addReward(validation.data, profile.data).then(res => {
                resetSelectedGrid(setRewards, rewards);
                getProfile();
                setLoading(false);
                Toast('Recompensa adquirida com sucesso');
            }).catch(err => {
                setLoading(false);
                Toast('Erro ao adquirir a(s) recompensa(s)');
            })
        } else {
            setLoading(false);
            Toast(validation.message);
        }
    }

    const validationForm = () => {
        const selectedRewards = rewards.filter((item) => {
            return item.state == true;
        });

        if (!selectedRewards || selectedRewards.length == 0) {
            return {
                state: false,
                message: 'Nenhuma recompensa selecionada'
            }
        } else {
            const totalValue = selectedRewards.reduce((d, value) => d + value.PRICE, 0);
            if (totalValue > profile.data.COIN) {
                return {
                    state: false,
                    message: 'Você não tem pedras suficientes'
                }
            } else {
                return {
                    state: true,
                    message: '',
                    data: {
                        totalValue: totalValue,
                        selectedRewards: selectedRewards
                    }
                }
            }
        }
    }

    const RenderRewards = (data) => (
        <>
            <Image
                style={styles.imageReward}
                source={RewardPath(data.IMAGE)}
            />
            {
                !data.empty ?
                    <ContainerRow>
                        <Stone />
                        <Title font={'16px'} family={'SansSerif'}>{data.PRICE}</Title>
                    </ContainerRow> : null
            }
        </>
    );

    return (
        <>
            <ContainerCenter paddingRight={'30px'} paddingLeft={'30px'}>
                <Header sizeHeaderApp={true} height={25} image={REWARDS} />
                <Hr spacing={'30px'} />
                <ContainerRow
                    alignSelf={'stretch'}
                    marginTop={'30px'}>
                    <Content style={{ width: '33.3%' }}/>
                    <Content style={{ width: '33.3%' }}>
                        <Title font={'25px'}>ITENS</Title>
                    </Content>
                    <Content alignItems={'flex-end'} style={{ width: '33.3%' }}>
                        <ContainerRow>
                            <Stone />
                            <Title font={'16px'} family={'SansSerif'}>x{profile.data.COIN}</Title>
                        </ContainerRow>
                    </Content>
                </ContainerRow>
                <Container alignItems={'center'} marginTop={'10px'}>
                    <Grid
                        type={'table'}
                        info={rewards}
                        columns={4}
                        fn={setRewards}
                        contentRender={RenderRewards} />
                </Container>
                <Btn label='COMPRAR'
                    padding={'10px'}
                    bottom={'10px'}
                    onSubmit={insertRewards}
                />
            </ContainerCenter>
            { loading || profile.loading ? <Loading /> : null}
        </>
    )
}

Rewards.navigationOptions = ({ navigation }) => {
    const options = HeaderApp(navigation, 'LOJA');
    return options;
}

const mapStateToProps = state => ({
    profile: state.profile
});

const mapDispatchToProps = dispatch => ({
    getProfile: () => dispatch(ProfileActions.setProfInfo())
})

export default connect(mapStateToProps, mapDispatchToProps)(Rewards);