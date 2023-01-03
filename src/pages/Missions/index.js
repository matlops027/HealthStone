import React, { useState, useEffect } from 'react';
import { SectionList, Alert } from 'react-native';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import FabBtn from '../../components/Buttons/fabButton';
import Empty from '../../components/Empty';
import HeaderList from '../../components/Header/headerList';
import { addHistory } from '../../services/historyService';
import { removeMission, updateStatusMission, updateMission } from '../../services/missionsService';
import Toast from '../../components/Toasts';
import * as ProfileActions from '../../store/actions/profile';
import * as MissionsActions from '../../store/actions/missions';
import * as HistoryActions from '../../store/actions/history';
import { ContainerCenter } from '../../styles';
import FeedBackModal from './FeedBackModal';
import AchievementsModal from './AchievementsModal';
import Mission from './Mission';
import { optionsAvatar } from './../../utils';
import { objProfileInfo, arAchievements } from './config';
import { HeaderApp } from '../../components/Header/headersNavigation';

const Missions = ({ navigation, missions, getMissions, profile, getProfile, getHistory }) => {

    const [loading, setLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [modalFeedBack, setModalFeedBack] = useState(false);
    const [modalAchievements, setModalAchievements] = useState(false);
    const [achievements, setAchievements] = useState(null);
    const [profileInfo, setProfileInfo] = useState(Object.assign({}, objProfileInfo));

    useEffect(() => {
        getAllMissions(false);
    }, [])

    const getAllMissions = async (refreshing) => {
        setIsRefreshing(refreshing);
        await getMissions();
        setIsRefreshing(false);
    }

    const changeCheckbox = async (mission, status, keepOrGiveUp) => {
        try {
            setLoading(true);

            const objUpdate = {
                mission: mission,
                status: status,
                keepOrGiveUp: keepOrGiveUp,
                profile: profile.data
            }

            await addHistory(mission.IDQUES, status);

            const profileInfoReturn = await updateStatusMission(objUpdate);

            setProfileInfo(profileInfoReturn);

            await getProfile();

            await getHistory();

            setLoading(false);
            Toast('Status da Missão atualizado com sucesso!');
            await getAllMissions(false);
            setModalFeedBack(true);
            setTimeout(() => {
                setModalFeedBack(false);
                if (profileInfoReturn.ACHIEV != '') {
                    let achvs = [];
                    arAchievements.map(a => {
                       achvs = achvs.concat(optionsAvatar[a].filter(o => {
                            return o.level == profileInfoReturn.CURLEVEL
                        }));
                    })
                    setAchievements(achvs.length > 0 ? achvs : null);
                    setModalAchievements(true);
                }
            }, 3000);
        } catch (error) {
            setLoading(false);
            Toast('Erro ao mudar status da Missão');
        }
    }

    const informAchivement = (mission) => {
        switch (mission.STATUS) {
            case 0:
                Toast('Hoje não é o dia agendado para essa Missão');
                break;
            case 1:
                Alert.alert(
                    'Status da Missão',
                    'Você gostaria de marcar essa missão como concluída ou não concluída ?',
                    [
                        {
                            text: 'Concluída',
                            onPress: () => InformKeepOrGiveUp(mission, 1)
                        },
                        {
                            text: 'Não Concluída',
                            onPress: () => InformKeepOrGiveUp(mission, 2)
                        },
                    ],
                    { cancelable: true }
                );
                break;
            default:
                Toast('Essa Missão já está marcada.');
        }
    }

    const InformKeepOrGiveUp = (mission, status) => {
        Alert.alert(
            'Continuar ou desistir',
            'Você gostaria de continuar ou parar de fazer essa missão ?',
            [
                {
                    text: 'Continuar',
                    onPress: () => changeCheckbox(mission, status, 1)
                },
                {
                    text: 'Parar',
                    onPress: () => changeCheckbox(mission, status, 2)
                },
            ],
            { cancelable: true }
        );
    }

    const deleteMission = async (mission) => {
        setLoading(true);

        await removeMission(mission.IDQUES).then(res => {
            setLoading(false);
            Toast('Missão deletada com sucesso!');
            getAllMissions(false);
        }).catch(err => {
            setLoading(false);
            Toast('Erro ao deletar a Missão');
        });
    }

    const alertDeleteConfirmation = (mission) => {
        Alert.alert(
            "Deletar Missião",
            "Tem certeza que deseja deletar essa Missão?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteMission(mission) }
            ],
            { cancelable: false }
        );
    }

    const addConfigReward = async (objConfig) => {
        setLoading(true);
        await updateMission(objConfig.IDQUES,objConfig).then(async res => {
            setLoading(false);
            Toast('Recompensa configurada com sucesso');
            await getAllMissions(false);
        }).catch(err => {
            setLoading(false);
            Toast('Erro ao configurar recomenpensa');
        });
    }

    return (
        <>
            <ContainerCenter>
                <FeedBackModal
                    setModalFeedBack={setModalFeedBack}
                    visible={modalFeedBack}
                    info={profileInfo}
                />
                <AchievementsModal
                    setModalAchievements={setModalAchievements}
                    visible={modalAchievements}
                    info={profileInfo}
                    achievements={achievements}
                />
                <SectionList
                    sections={missions.data}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) =>
                        <Mission
                            info={item}
                            informAchivement={informAchivement}
                            navigation={navigation}
                            alertDeleteConfirmation={alertDeleteConfirmation}
                            addConfigReward={addConfigReward}
                        />
                    }
                    renderSectionHeader={({ section: { title } }) => (
                        title != '' ?
                        <HeaderList padding={'32px'} font={'30px'} label={title} /> : null
                    )}
                    ListEmptyComponent={<Empty label={'Nenhuma missão encontrada!'}/>}
                    onRefresh={() => { getAllMissions(true) }}
                    refreshing={isRefreshing}
                />
                <FabBtn icon='plus'
                    onSubmit={() => { navigation.push('CreateMission') }} />
                {!isRefreshing && (loading || missions.loading) ? <Loading /> : null}
            </ContainerCenter>
        </>
    )
}

Missions.navigationOptions = ({ navigation }) => {
    const options = HeaderApp(navigation, 'MISSÕES');
    return options;
}

const mapStateToProps = state => ({
    missions: state.missions,
    profile: state.profile
});

const mapDispatchToProps = dispatch => ({
    getMissions: () => dispatch(MissionsActions.setAllMissions()),
    getProfile: () => dispatch(ProfileActions.setProfInfo()),
    getHistory: () => dispatch(HistoryActions.setAllHistory())
})


export default connect(mapStateToProps, mapDispatchToProps)(Missions);