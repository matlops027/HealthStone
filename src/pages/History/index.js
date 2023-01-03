import React, { useState, useEffect } from 'react';
import { Alert, FlatList, View } from "react-native";
import { ContainerCenter } from '../../styles';
import { HeaderApp } from '../../components/Header/headersNavigation';
import styles from '../../styles/styles';
import Colors from '../../styles/colors';
import { ScrollableTabView } from '@valdio/react-native-scrollable-tabview';
import * as HistoryActions from '../../store/actions/history';
import { connect } from 'react-redux';
import { removeHistory } from '../../services/historyService';
import Toast from '../../components/Toasts';
import Empty from '../../components/Empty';
import Loading from '../../components/Loading';
import Mission from './Mission';

const History = ({ navigation, history, getHistory }) => {

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getAllHistory();
    }, [])

    const getAllHistory = async () => {
        getHistory();
    }

    const deleteHistory = async (hist) => {
        setLoading(true);
        await removeHistory(hist.IDHIST, hist.IDQUES).then(res => {
            setLoading(false);
            Toast('Histórico deletado com sucesso!');
            getAllHistory();
        }).catch(err => {
            setLoading(false);
            Toast('Erro ao deletar o Histórico');
        });
    }

    const alertDeleteConfirmation = (hist) => {
        Alert.alert(
            "Deletar Histórico",
            "Tem certeza que deseja deletar esse Histórico?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteHistory(hist) }
            ],
            { cancelable: false }
        );
    }

    return (
        <>
            <ContainerCenter>
                <ScrollableTabView
                    tabBarTextStyle={styles.textTitlePage}
                    tabBarBackgroundColor={Colors.primary}
                    tabBarUnderlineStyle={{ backgroundColor: Colors.secondary }}
                >
                    <View tabLabel="Concluidas" style={styles.viewTabs}>
                        <FlatList
                            data={history.completeHistory}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={<Empty label={'Nenhuma missão encontrada!'}/>}
                            renderItem={({ item }) => 
                                <Mission
                                    info={item}
                                    navigation={navigation}
                                    alertDeleteConfirmation={alertDeleteConfirmation}
                                />
                            }
                        />
                        {loading || history.loading ? <Loading /> : null}
                    </View>
                    <View tabLabel="Não Concluidas" style={styles.viewTabs}>
                        <FlatList
                            data={history.failHistory}
                            keyExtractor={(item, index) => index.toString()}
                            ListEmptyComponent={<Empty label={'Nenhuma missão encontrada!'} />}
                            renderItem={({ item }) =>
                                <Mission
                                    info={item}
                                    navigation={navigation}
                                    alertDeleteConfirmation={alertDeleteConfirmation}
                                />
                            }
                        />
                        {loading || history.loading ? <Loading /> : null}
                    </View>
                </ScrollableTabView>
            </ContainerCenter>
        </>
    )
}

History.navigationOptions = ({ navigation }) => {
    const options = HeaderApp(navigation, 'HISTÓRICO');
    return options;
}

const mapStateToProps = state => ({
    history: state.history.data
});

const mapDispatchToProps = dispatch => ({
    getHistory: () => dispatch(HistoryActions.setAllHistory())
})

export default connect(mapStateToProps, mapDispatchToProps)(History);