import { decode as atob, encode as btoa } from 'base-64';
import firebase from 'react-native-firebase';
import { getIdProfile, updateProfInfo } from './profileService';
import { ValidationStatusMission, buildUpdateProfileInfo, statusValidation, formatDate, prepareObjToUpdate } from '../utils';
import { DeleteFoodsQuestDB, DeleteQuestDB, GetQuestsByIdDB, GetQuestsByProfileDB, InsertFoodQuestDB, InsertQuestDB, UpdateQuestDB } from '../data/dao/missionDAO';
import { GetFoodsByQuest } from '../data/dao/foodDAO';
import { GetHistByQuest } from '../data/dao/historyDAO';
import { getQuestStreak } from './historyService';

export const getMissions = async (forHist = false) => {
    return new Promise(async (resolve, reject) => {
        let aditWhere = '';

        let retorno = {
            allMissions: [],
        };
        let profID;
        let missions;
        let morningMissions = [];
        let eveningMissions = [];
        let nightMissions = [];
        let everyMission = [];

        try {

            await getIdProfile()
                .then(async res => {
                    profID = res;
                })
                .catch(err => {
                    reject(err);
                });
            
            aditWhere = forHist ? '' : 'AND Q.TFDELETE = 0' ; 

            await GetQuestsByProfileDB(profID, aditWhere)
                .then(async res => {
                    missions = res.missions;
                    for (let row of missions) {
                        row.KCALTOT = row.KCALTOT.toFixed(2);
                        row.DAYS = row.DAYS.split(',');
                        row = ValidationStatusMission(row);
                        await GetFoodsByQuest(row.IDQUES)
                            .then(async res => {
                                row.foods = res.foods;
                            }).catch(err => {
                                reject(err);
                            });

                        switch (row.PERIOD) {
                            case 1:
                                morningMissions.push(row);
                                break;
                            case 2:
                                eveningMissions.push(row);
                                break;
                            case 3:
                                nightMissions.push(row);
                                break;
                        }

                        everyMission.push(row);

                    }

                    if (forHist) {
                        resolve(everyMission);
                    }

                })
                .catch(err => {
                    reject(err);
                });

            if (everyMission.length != 0) {

                const missionsReturn = [
                    {
                        title: morningMissions.length > 0 ? 'Manhã' : '',
                        data: morningMissions
                    },
                    {
                        title: eveningMissions.length > 0 ? 'Tarde' : '',
                        data: eveningMissions
                    },
                    {
                        title: nightMissions.length > 0 ? 'Noite' : '',
                        data: nightMissions
                    }
                ];
                retorno.allMissions = missionsReturn;
            }

            if (!forHist) {
                resolve(retorno);      
            }
            

        } catch (error) {
            console.warn(error);
            reject(error);
        }
    });

}

export const updateStatusMission = async (params) => {
    return new Promise(async (resolve, reject) => {

        const status = await statusValidation(params);
        const date = new Date();

        

        let objUpdate = {
            STATUS: status,
            DTLASTAT: formatDate(date, false),
            QUESTSEQ: await getQuestStreak(params.mission.IDQUES)
        }

        try {


            await updateMission(params.mission.IDQUES, objUpdate)
                .then(async resp => {
                   
                }).catch(err => {
                    reject(err);
                })
        

            const obj = await buildUpdateProfileInfo(params);

            await updateProfInfo(obj.objUpdateProf).catch(err => {
                reject(err);
            });

            resolve(obj.objReturn);

        } catch (error) {
            reject(error);
        }
    });

}

export const updateMission = async (idquest, objUpdate) => {
    return new Promise(async (resolve, reject) => {

        try {

            updates = prepareObjToUpdate(objUpdate);

            await UpdateQuestDB(idquest, updates)
                .then(async resp => {
                    resolve(true);
                }).catch(err => {
                    reject(err);
                })
        

        } catch (error) {
            reject(error);
        }
    });

}


export const removeMissionById = async (mission) => {
    return new Promise(async (resolve, reject) => {

        try {

            await DeleteQuestDB(mission)
                .then(async res => {
                    await DeleteFoodsQuestDB(mission)
                        .then(async resp => {
                            resolve(true);
                        }).catch(err => {
                            reject(err);
                        })
                })
                .catch(err => {
                    reject(err);
                });

        } catch (error) {
            reject(error);
        }
    });

}



export const removeMission = async (mission, fromHist = false) => {
    return new Promise(async (resolve, reject) => {
        try {

            let haveHist;

            await GetHistByQuest(mission)
                .then(async res => {
                    haveHist = res.hists.length == 0 ? false : true;
                }).catch(err => {
                    reject(err);
                })
            
            
            if (!fromHist) {
                if (haveHist) {
                     await updateMission(mission, {TFDELETE: 1})
                        .then(async resp => {
                            resolve(true);
                        }).catch(err => {
                            reject(err);
                        })
                } else {
                    await removeMissionById(mission)
                        .then(async resp => {
                            resolve(true);
                        }).catch(err => {
                            reject(err);
                        })
                }
            } else {
                if (haveHist) {
                    resolve(true)
                } else {
                    await GetQuestsByIdDB(mission)
                        .then(async res => {
                            if (res.mission.TFDELETE == 1) {
                                await removeMissionById(mission)
                                    .then(async resp => {
                                        resolve(true);
                                    }).catch(err => {
                                        reject(err);
                                    })
                            }
                            resolve(true);
                        }).catch(err => {
                            reject(err);
                        })
                 }

                
            }
            

        } catch (error) {
            reject(error);
        }
    });

}

export const insertMission = async (form) => {
    return new Promise(async (resolve, reject) => {
        try {
            
            let days = '';
            const date = new Date();
            
            let questId;
            let profID;

            await getIdProfile()
                .then(async res => {
                    profID = res;
                })
                .catch(err => {
                    reject(err);
                });


            form.days.map((item) => {
                if (item.selected) {
                    days += item.id + ',';
                }
            });
            

            let time = form.time.slice(0, form.time.indexOf(":"));

            const mission = {
                DTREGIST: formatDate(date),
                TITLE: form.title.toUpperCase(),
                TIME: form.time,
                //alimentos: arFoods,
                //kcalTotal: kcalTotal.toFixed(2),
                DAYS: days.substr(0, days.length-1),
                DIFFCULT: form.difficult,
                TFAVOID: form.type.value == 'avoid' ? 1 : 0,
                STATUS: 1,
                DTLASTAT: null,
                QUESTSEQ: 0,
                PERIOD: time < 12 ? 1 : time >= 12 && time < 18 ? 2 : 3,
                QUESXP: form.difficult * 10,
                QUESCOIN: form.difficult,
                QUESHP: form.difficult * 10
            };

            
            await InsertQuestDB(profID, mission)
                .then(async res => {
                    questId = res.insertId;
                })
                .catch(err => {
                    reject(err);
                });
            
            
            await InsertFoodQuestDB(questId, form.foods)
                .then(async res => {
                    console.log(res);
                    
                })
                .catch(err => {
                    reject(err);
                });
            
            resolve(true);

        } catch (error) {
            reject(error);
        }
    });
}


