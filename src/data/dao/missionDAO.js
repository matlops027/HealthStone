import { OpenHSDB } from '../connect';

export const InsertQuestDB = async (profID, mission) => {
    return new Promise(async (resolve, reject) => {
        let insertId = '';
        await OpenHSDB().then(async con => {
            await con.transaction(
                hsTransaction => {
                    hsTransaction.executeSql(
                        `insert into QUES (IDPROF,
                                           DAYS,
                                           TIME,
                                           DTREGIST,
                                           DIFFCULT,
                                           TITLE,
                                           PERIOD,
                                           STATUS,
                                           TFAVOID,
                                           QUESTSEQ,
                                           DTLASTAT,
                                           QUESXP,
                                           QUESCOIN,
                                           QUESHP) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                        [profID,
                         mission.DAYS,
                         mission.TIME,
                         mission.DTREGIST,
                         mission.DIFFCULT,
                         mission.TITLE,
                         mission.PERIOD,
                         mission.STATUS,
                         mission.TFAVOID,
                         mission.QUESTSEQ,
                         mission.DTLASTAT,
                         mission.QUESXP,
                         mission.QUESCOIN,
                         mission.QUESHP],
                    ).then(([hsTransaction, results]) => {
                        insertId = results.insertId;
                    }).catch((err) => {
                        
                    });
                }
            ).then((result) => {
                resolve({ success: true, insertId: insertId });
            }).catch((err) => {
                reject(err);
            })
        });

    });
}

export const InsertFoodQuestDB = async (questId, foods) => {
    return new Promise(async (resolve, reject) => {
        
        
        let insertId = [];
        await OpenHSDB().then(async con => {
            await con.transaction(
                hsTransaction => {
                    foods.map(async (food) => {
                        hsTransaction.executeSql(
                            `insert into QUES_FOOD (IDQUES,
                                            IDFOOD,
                                            FOODQTY)
                                VALUES (?, ?, ?)`,
                            [questId, food.IDFOOD, food.FOODQTY],
                        ).then(([hsTransaction, results]) => {
                            insertId.push(results.insertId);
                        }).catch((err) => {
                            
                        });
                    })  
                }
                
            ).then((result) => {
                resolve({ success: true, insertId: insertId });
            }).catch((err) => {
                reject(err);
            })
        });
    });
}


export const GetQuestsByProfileDB = async (idprof, aditWhere) => {
    return new Promise(async (resolve, reject) => {
        let missions = [];
        await OpenHSDB().then(async con => {
            await con.transaction(
                hsTransaction => {
                    hsTransaction.executeSql(
                        `select Q.DAYS, 
                                Q.TIME, 
                                Q.DTREGIST, 
                                Q.DIFFCULT, 
                                Q.TITLE, 
                                Q.PERIOD, 
                                Q.STATUS, 
                                Q.TFAVOID, 
                                Q.QUESTSEQ, 
                                Q.DTLASTAT,
                                Q.IDQUES,
                                Q.TFDELETE,
                                Q.QUESXP,
                                Q.QUESCOIN,
                                Q.QUESHP,
                                sum((F.ENRGKCAL / F.BASEQTTY) * QF.FOODQTY) KCALTOT
                            FROM QUES Q
                            JOIN QUES_FOOD QF ON Q.IDQUES = QF.IDQUES
                            JOIN FOOD F ON QF.IDFOOD = F.IDFOOD 
                            WHERE Q.IDPROF = ?
                                ${aditWhere}
                            GROUP BY QF.IDQUES
                            `,
                         [idprof],
                    ).then(([hsTransaction, results]) =>  {
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            missions.push(row);
                        }
                    }).catch((err) => {
                        reject(err);
                    });
                }
            ).then((result) => {
                resolve({ success: true, missions: missions });

            }).catch((err) => {
                reject(err);
            })
        });

    });
}



export const DeleteQuestDB = async (questId) => {
    return new Promise(async (resolve, reject) => {
        
        await OpenHSDB().then(async con => {
            await con.transaction(
                hsTransaction => {
                    hsTransaction.executeSql(
                        `DELETE FROM QUES WHERE IDQUES = ?`,
                        [questId],
                    ).then(([hsTransaction, results]) => {
                        
                    }).catch((err) => {
                        
                    });
                    
                }
                
            ).then((result) => {
                resolve({ success: true});
            }).catch((err) => {
                reject(err);
            })
        });
    });
}

export const DeleteFoodsQuestDB = async (questId) => {
    return new Promise(async (resolve, reject) => {
        
        await OpenHSDB().then(async con => {
            await con.transaction(
                hsTransaction => {
                    hsTransaction.executeSql(
                        `DELETE FROM QUES_FOOD WHERE IDQUES = ?`,
                        [questId],
                    ).then(([hsTransaction, results]) => {
                        
                    }).catch((err) => {
                        
                    });
                }
                
            ).then((result) => {
                resolve({ success: true });
            }).catch((err) => {
                reject(err);
            })
        });
    });
}

export const UpdateQuestDB = async (questId, updates) => {
    return new Promise(async (resolve, reject) => {
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                    hsTransaction.executeSql(
                        `update QUES SET
                                ${updates}
                            where IDQUES = ? 
                            `,
                         [questId],
                    ).then(([hsTransaction, results]) => {
                        console.log(results);
                    }).catch((err) => {
                        reject(err);
                    });
                }
            ).then((result) => {
                resolve({ success: true });

            }).catch((err) => {
                reject(err);
            })
        });

    });
}


export const GetQuestsByIdDB = async (idques) => {
    return new Promise(async (resolve, reject) => {
        let mission;
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                    hsTransaction.executeSql(
                        `select Q.DAYS, 
                                Q.TIME, 
                                Q.DTREGIST, 
                                Q.DIFFCULT, 
                                Q.TITLE, 
                                Q.PERIOD, 
                                Q.STATUS, 
                                Q.TFAVOID, 
                                Q.QUESTSEQ, 
                                Q.DTLASTAT,
                                Q.IDQUES,
                                Q.TFDELETE,
                                Q.QUESXP,
                                Q.QUESCOIN,
                                Q.QUESHP,
                                sum((F.ENRGKCAL / F.BASEQTTY) * QF.FOODQTY) KCALTOT
                            FROM QUES Q
                            JOIN QUES_FOOD QF ON Q.IDQUES = QF.IDQUES
                            JOIN FOOD F ON QF.IDFOOD = F.IDFOOD 
                            WHERE Q.IDQUES = ?
                            GROUP BY QF.IDQUES
                            `,
                         [idques],
                    ).then(([hsTransaction, results]) =>  {
                        mission = results.rows.item(0);
                        
                    }).catch((err) => {
                        reject(err);
                    });
                }
            ).then((result) => {
                resolve({ success: true, mission: mission });

            }).catch((err) => {
                reject(err);
            })
        });

    });
}