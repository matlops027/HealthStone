import { OpenHSDB } from '../connect';


export const GetFoodsFilter = async (filter, CATEGOIDS) => {
    return new Promise(async (resolve, reject) => {
        let filteredFoods = [];
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                    hsTransaction.executeSql(
                        `select IDFOOD, IDUSER, 
                                round(ENRGKCAL/BASEQTTY, 2) as KCALPU,
                                BASEQTTY, BASEUNIT, 
                                DESCRIPT, CATEGOID, 
                                ENRGKCAL, ENRGKJ, 
                                CARBQTTY, CARBUNIT, 
                                PROTQTTY, PROTUNIT, 
                                SODIQTTY, SODIUNIT, 
                                FIBEQTTY, FIBEUNIT,
                                STFTQTTY, STFTUNIT
                         from FOOD
                         where upper(DESCRIPT) like upper(?)
                            ${(CATEGOIDS != '' ? `and CATEGOID in (${CATEGOIDS})` : '' )}
                         ORDER BY IDFOOD
                            `,
                         ['%'+filter+'%'],
                    ).then(([hsTransaction, results]) => {
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            filteredFoods.push(row);
                        }
                    }).catch((err) => {
                        reject(err);
                    });
                }
            ).then((result) => {
                resolve({ success: true, filteredFoods: filteredFoods });

            }).catch((err) => {
                reject(err);
            })
        });

    });
}

export const GetFoodsByQuest = async (idquest) => {
    return new Promise(async (resolve, reject) => {
        let foods = [];
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                    hsTransaction.executeSql(
                        `SELECT 
                            QF.IDFOOD,
                            QF.FOODQTY,
                            F.DESCRIPT
                        FROM QUES_FOOD QF
                        JOIN FOOD F ON QF.IDFOOD = F.IDFOOD 
                        WHERE QF.IDQUES = ?
                            `,
                         [idquest],
                    ).then(([hsTransaction, results]) => {
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            foods.push(row);
                        }
                    }).catch((err) => {
                        reject(err);
                    });
                }
            ).then((result) => {
                resolve({ success: true, foods: foods });

            }).catch((err) => {
                reject(err);
            })
        });

    });
}

export const InsertCreatedFoodDB = async (foodInfo) => {
    return new Promise(async (resolve, reject) => {
        let insertId = '';
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                     hsTransaction.executeSql(
                         `insert into FOOD(${foodInfo.columns}) 
                            values(${foodInfo.values})
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


export const UpdateFoodByUserDB = async (IDFOOD, updates) => {
    return new Promise(async (resolve, reject) => {
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                    hsTransaction.executeSql(
                        `update FOOD SET
                                ${updates}
                            where IDFOOD = ? 
                            `,
                         [IDFOOD],
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



