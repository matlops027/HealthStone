import firebase from 'react-native-firebase';
import { decode as atob, encode as btoa } from 'base-64';
import { formatBDStringtoDate, formatDate } from '../utils';
import { GetHistByQuest, InsertHistoryDB, RemoveHistDB } from '../data/dao/historyDAO';
import { getMissions, removeMission, updateMission } from './missionsService';

export const getHistory = async () => {
    return new Promise(async (resolve, reject) => {
        let history = {
            completeHistory : [],
            failHistory :  []
        }
        let everyMission = [];
        try {
            
            await getMissions(true)
                .then(async res => {
                    everyMission = res;
                }).catch(err => {
                    reject(err);
                })
            
            for (let mission of everyMission) {
                await GetHistByQuest(mission.IDQUES)
                    .then(async res => {
                        for (let hist of res.hists) {
                            let histObj = {
                                mission: mission,
                                IDHIST : hist.IDHIST,
                                DTHIST : formatBDStringtoDate(hist.DTHIST),
                                HISTSTAT: hist.HISTSTAT,
                                IDQUES: hist.IDQUES
                            }
                            if (hist.HISTSTAT == 1) {
                                history.completeHistory.push(histObj);
                            } else {
                                history.failHistory.push(histObj);
                            }
                        }
                    }).catch(err => {
                        reject(err);
                    })
            }
            

            resolve(history);
            
        } catch (error) {
            reject(error);
        }
    });
}

export const addHistory = async (mission, status) => {
    return new Promise(async (resolve, reject) => {
        try {
            const date = new Date();

            const  hist = {
                IDQUES : mission,
                HISTSTAT : status,
                DTHIST :  formatDate(date, false)
            };

            await InsertHistoryDB(hist)
                .then(async res => {
                    resolve(res.insertID);
                }).catch(err => {
                    reject(err);
                })

        } catch (error) {
            reject(error);
        }
    });
}

export const removeHistory = async (idhist, idquest) => {
    return new Promise(async (resolve, reject) => {
        let objUpdate;
        try {

           await RemoveHistDB(idhist)
                .then(async res => {
                    
                }).catch(err => {
                    reject(err);
                })
            
            objUpdate = {
                QUESTSEQ: await getQuestStreak(idquest)
            }
            await updateMission(idquest, objUpdate)
                .then(async resp => {
                   
                }).catch(err => {
                    reject(err);
                })
            
            await removeMission(idquest, true)
                .then(async res => {
                    
                }).catch(err => {
                    reject(err);
                }) 
                  
            resolve(true);
            
            
            


        } catch (error) {
            reject(error);
        }
    });

}


export const getQuestStreak = async (idquest) => {
    return new Promise(async (resolve, reject) => {
        let COUNTSEQ = 0;       
        let foundAFail = false;
        try {
            await GetHistByQuest(idquest)
                    .then(async res => {
                        for (let hist of res.hists) {
                            if (hist.HISTSTAT == 1 && !foundAFail) {
                                COUNTSEQ++;
                            } else {
                                foundAFail = true;
                            } 
                        }
                        resolve(COUNTSEQ);
                    }).catch(err => {
                        reject(err);
                    })

        

        } catch (error) {
            reject(error);
        }
    });

}
