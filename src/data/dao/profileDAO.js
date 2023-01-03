import { OpenHSDB } from '../connect';


export const CreateProfileDB = async (userID, userNick) => {
    return new Promise(async (resolve, reject) => {
        let insertId = '';
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                    hsTransaction.executeSql(
                        `insert into PROF (IDUSER,
                                           PROFNICK,
                                           MAXHP,
                                           CURHP,
                                           LEVEL,
                                           COIN,
                                           MAXXP,
                                           CURXP,
                                           TFACTIVE) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                         [userID, userNick, 50, 50, 1, 0, 100, 0, 1],
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

export const UpdateProfileDB = async (userID, updates) => {
    return new Promise(async (resolve, reject) => {
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                    hsTransaction.executeSql(
                        `update PROF SET
                                ${updates}
                            where IDUSER = ? 
                                AND TFACTIVE = 1
                            `,
                         [userID],
                    ).then(([hsTransaction, results]) => {
                        console.log(results);
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

export const GetActiveProfileByUserDB = async (userID) => {
    return new Promise(async (resolve, reject) => {
        let profileID = '';
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                     hsTransaction.executeSql(
                        `select IDPROF from PROF where IDUSER = (?) and TFACTIVE = 1`,
                         [userID],
                     ).then(([hsTransaction, results]) => {
                         profileID = results.rows.item(0).IDPROF;
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            ).then((result) => {
                resolve({ success: true, profileID: profileID });

            }).catch((err) => {
                reject(err);
            })
        });

    });
}

export const GetProfileInfo = async (profileID) => {
    return new Promise(async (resolve, reject) => {
        let profileInfo = {};
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                     hsTransaction.executeSql(
                        `select IDPROF, IDUSER, PROFNICK, MAXHP, CURHP, LEVEL, COIN, MAXXP, CURXP, TFACTIVE from PROF where IDPROF = (?)`,
                         [profileID],
                    ).then(([hsTransaction, results]) => {
                        profileInfo = results.rows.item(0);
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            ).then((result) => {
                resolve({ success: true, profileInfo: profileInfo });

            }).catch((err) => {
                reject(err);
            })
        });

    });
}

