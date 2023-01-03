//import foods from '../../assets/json/food.json';
import { OpenHSDB } from '../connect';



export const GetAllRewardsDB = async () => {
    return new Promise(async (resolve, reject) => {
        let returnSql = [];
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                     hsTransaction.executeSql(
                        `select IDREWD, IMAGE, PRICE, NAME from REWD`,
                         [],
                    ).then(([hsTransaction, results]) => {
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            returnSql.push(row);
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            ).then((result) => {
                resolve({ success: true, returnSql });

            }).catch((err) => {
                reject({ success: false });
            })
        });

    });
}


export const GetRewardsByUserDB = async (idProfile) => {
    return new Promise(async (resolve, reject) => {
        let returnSql = [];
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                     hsTransaction.executeSql(
                         `select R.IDREWD, R.IMAGE, R.PRICE, R.NAME, count(R.IDREWD) QTD
                            from REWD R
                                join REWD_PROF RP on R.IDREWD = RP.IDREWD
                            where RP.IDPROF = ?
                            group by R.IDREWD
                            `,
                         [idProfile],
                     ).then(([hsTransaction, results]) => {
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            returnSql.push(row);
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            ).then((result) => {
                resolve({ success: true, returnSql });

            }).catch((err) => {
                reject({ success: false });
            })
        });

    });
}

export const InsertProfReward = async (idProfile, idReward, date) => {
    return new Promise(async (resolve, reject) => {
        let insertId = '';
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                     hsTransaction.executeSql(
                         `insert into REWD_PROF(IDPROF, IDREWD, DTBOUGHT) 
                            values(? ,?, ?)
                            `,
                         [idProfile, idReward, date],
                    ).then(([hsTransaction, results]) => {
                        insertId = results.insertId;
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            ).then((result) => {
                resolve({ success: true, insertId: insertId });

            }).catch((err) => {
                reject({ success: false });
            })
        });

    });
}


export const RemoveProfReward = async (idProfile, idReward) => {
    return new Promise(async (resolve, reject) => {
        
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                     hsTransaction.executeSql(
                         `delete from REWD_PROF 
                            where IDREPR = 
                                (select IDREPR 
                                    from REWD_PROF 
                                    where IDPROF = ? AND IDREWD = ? 
                                    order by IDREPR DESC limit 1
                                )
                            `,
                         [idProfile, idReward],
                    ).then(([hsTransaction, results]) => {
                        console.log(results);
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            ).then((result) => {
                resolve({ success: true });

            }).catch((err) => {
                reject({ success: false });
            })
        });

    });
}

export const InsertCreatedRewardDB = async (rewardInfo) => {
    return new Promise(async (resolve, reject) => {
        let insertId = '';
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                     hsTransaction.executeSql(
                         `insert into REWD(${rewardInfo.columns}) 
                            values(${rewardInfo.values})
                            `,
                         [],
                    ).then(([hsTransaction, results]) => {
                        insertId = results.insertId;
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            ).then((result) => {
                resolve({ success: true, insertId: insertId });

            }).catch((err) => {
                reject({ success: false });
            })
        });

    });
}


export const UpdateRewardByUserDB = async (IDREWD, updates) => {
    return new Promise(async (resolve, reject) => {
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                    hsTransaction.executeSql(
                        `update REWD SET
                                ${updates}
                            where IDREWD = ? 
                            `,
                         [IDREWD],
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