import { OpenHSDB } from '../connect';


export const InitialAvatarDB = async (profID) => {
    return new Promise(async (resolve, reject) => {
        let insertId = '';
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                    hsTransaction.executeSql(
                        `insert into AVAT (IDPROF,
                                           ACCETYPE,
                                           CLOTCOLO,
                                           CLOTTYPE,
                                           EYETYPE,
                                           EYEBTYPE,
                                           FACHAICO,
                                           FACHAITY,
                                           GRAPTYPE,
                                           HAIRCOLO,
                                           HATCOLO,
                                           MOUNTYPE,
                                           SKINCOLO,
                                           TOPTYPE) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                        [profID, 'Blank', 'Black', 'BlazerShirt', 'Default', 'Default', 'Black', 'Blank', 'Deer', 'Black', 'Black', 'Default', 'Light', 'ShortHairTheCaesar'],
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


export const UpdateAvatarDB = async (profID, updates) => {
    return new Promise(async (resolve, reject) => {
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                    hsTransaction.executeSql(
                        `update AVAT SET
                                ${updates}
                            where IDPROF = ? 
                            `,
                         [profID],
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

export const GetAvatarInfo = async (profID) => {
    return new Promise(async (resolve, reject) => {
        avatarInfo = {}
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                    hsTransaction.executeSql(
                        `select IDAVAT, IDPROF, ACCETYPE, CLOTCOLO, CLOTTYPE,
                                EYETYPE, EYEBTYPE, FACHAICO, FACHAITY, GRAPTYPE, 
                                HAIRCOLO, HATCOLO, MOUNTYPE, SKINCOLO, TOPTYPE
                         from AVAT 
                         where IDPROF = ? 
                            `,
                         [profID],
                    ).then(([hsTransaction, results]) => {
                        avatarInfo = results.rows.item(0);
                    }).catch((err) => {
                        reject(err);
                    });
                }
            ).then((result) => {
                resolve({ success: true, avatarInfo: avatarInfo });

            }).catch((err) => {
                reject(err);
            })
        });

    });
}






