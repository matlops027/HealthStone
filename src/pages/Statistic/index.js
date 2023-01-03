import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { ContainerScroll, Hr, Content, Title, ContainerRow, Dashboard, ContainerCenter } from '../../styles';
import HeaderInfo from '../../components/Header/headerInfo';
import Loading from '../../components/Loading';
import { HeaderApp } from '../../components/Header/headersNavigation';
import { getStatistic } from '../../services/statisticService';
import Toast from '../../components/Toasts';
import { typesCategoryFoods } from '../../utils';
import { objStatistic } from './config';

const Statistic = ({ profile, avatar, history }) => {

    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState(Object.assign({}, objStatistic));

    useEffect(() => {
        getAllStatistic();
    }, [history])

    const getAllStatistic = async () => {
        setLoading(true);
        await getStatistic().then(res => {
            setLoading(false);
            setInfo(res);
        }).catch(err => {
            setLoading(false);
            Toast('Erro ao carregar as informações');
        });
    }

    return (
        <>
            <ContainerScroll
                paddingTop={'20px'}
                paddingLeft={'20px'}
                paddingRight={'20px'}
                paddingBottom={'20px'}>
                <HeaderInfo
                    profile={profile}
                    avatar={avatar}/>
                <Hr />
                <Content marginTop={'30px'} alignSelf={'stretch'}>
                    <Title font={'25px'}>CONCLUÍDAS</Title>
                </Content>
                <ContainerRow justifyContent={'space-around'}>
                    <Dashboard marginRight={'1%'} marginTop={'10px'}>
                        <Title font={'40px'}>{info.quests.success}</Title>
                        <Title>Missões</Title>
                    </Dashboard>
                    <Dashboard marginLeft={'1%'} marginTop={'10px'}>
                        <Title font={'40px'}>{info.kcal.success.toFixed(0)}</Title>
                        <Title>Calorias</Title>
                    </Dashboard>
                </ContainerRow>
                <Dashboard width={'100%'} marginTop={'10px'}>
                    <ContainerRow alignSelf={'stretch'}justifyContent={'space-between'}>
                        <ContainerCenter>
                            <Title>Top Categorias</Title>
                        </ContainerCenter>
                        <ContainerCenter>
                            <ContainerRow paddingLeft={'20px'} paddingRight={'20px'} alignSelf={'stretch'} justifyContent={'space-between'}>
                                <Content>
                                    {info.category.success[0] ? <Title alignSelf={'flex-start'}>1.</Title> : null}
                                    {info.category.success[1] ? <Title alignSelf={'flex-start'}>2.</Title> : null}
                                    {info.category.success[2] ? <Title alignSelf={'flex-start'}>3.</Title> : null}
                                </Content>
                                <Content>
                                    {
                                        info.category.success.map((c,i) => (
                                            <Title key={i} alignSelf={'flex-start'}>{typesCategoryFoods.filter(ca => {
                                                return ca.id == Number(c)
                                            })[0].description}</Title>
                                        ))
                                    }
                                </Content>
                            </ContainerRow>
                        </ContainerCenter>
                    </ContainerRow>
                </Dashboard>
                <Content marginTop={'30px'} alignSelf={'stretch'}>
                    <Title font={'25px'}>FALHOS</Title>
                </Content>
                <ContainerRow justifyContent={'space-around'}>
                    <Dashboard marginRight={'1%'} marginTop={'10px'}>
                        <Title font={'40px'}>{info.quests.fail}</Title>
                        <Title>Missões</Title>
                    </Dashboard>
                    <Dashboard marginLeft={'1%'} marginTop={'10px'}>
                        <Title font={'40px'}>{info.kcal.fail.toFixed(0)}</Title>
                        <Title>Calorias</Title>
                    </Dashboard>
                </ContainerRow>
                <Dashboard width={'100%'} marginTop={'10px'} marginBottom={'30px'}>
                    <ContainerRow alignSelf={'stretch'} justifyContent={'space-between'}>
                        <ContainerCenter>
                            <Title>Top Categorias</Title>
                        </ContainerCenter>
                        <ContainerCenter>
                            <ContainerRow paddingLeft={'20px'} paddingRight={'20px'} alignSelf={'stretch'} justifyContent={'space-between'}>
                                <Content>
                                    {info.category.fail[0] ? <Title alignSelf={'flex-start'}>1.</Title> : null}
                                    {info.category.fail[1] ? <Title alignSelf={'flex-start'}>2.</Title> : null}
                                    {info.category.fail[2] ? <Title alignSelf={'flex-start'}>3.</Title> : null}
                                </Content>
                                <Content>
                                    {
                                        info.category.fail.map((c, i) => (
                                            <Title key={i} alignSelf={'flex-start'}>{typesCategoryFoods.filter(ca => {
                                                return ca.id == Number(c)
                                            })[0].description}</Title>
                                        ))
                                    }
                                </Content>
                            </ContainerRow>
                        </ContainerCenter>
                    </ContainerRow>
                </Dashboard>
            </ContainerScroll>
            { loading ? <Loading /> : null}
        </>
    )
}

Statistic.navigationOptions = ({ navigation }) => {
    const options = HeaderApp(navigation, 'Estatisticas');
    return options;
}

const mapStateToProps = state => ({
    profile: state.profile,
    avatar: state.avatar,
    history: state.history.data
});

export default connect(mapStateToProps)(Statistic);