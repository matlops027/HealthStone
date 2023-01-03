import { OpenHSDB } from '../connect';


export const InsertHistoryDB = async (hist) => {
    return new Promise(async (resolve, reject) => {
        let insertId = '';
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                    hsTransaction.executeSql(
                        `insert into HIST (IDQUES, DTHIST, HISTSTAT) VALUES (?, ?, ?);`,
                         [hist.IDQUES, hist.DTHIST, hist.HISTSTAT],
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

export const RemoveHistDB = async (idhist) => {
    return new Promise(async (resolve, reject) => {
        
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                     hsTransaction.executeSql(
                         `delete from hist 
                            where IDHIST = ?
                            `,
                         [idhist],
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


export const GetHistByQuest = async (idques) => {
    return new Promise(async (resolve, reject) => {
        let hists = [];
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                     hsTransaction.executeSql(
                         `
                            select 
                                IDHIST,
                                IDQUES,
                                DTHIST,
                                HISTSTAT
                            from
                                HIST
                            where
                                IDQUES = ?
                            order by 
                                DTHIST DESC
                            `,
                         [idques],
                     ).then(([hsTransaction, results]) => {
                        var len = results.rows.length;
                        for (let i = 0; i < len; i++) {
                            let row = results.rows.item(i);
                            hists.push(row);
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            ).then((result) => {
                resolve({ success: true, hists });

            }).catch((err) => {
                reject({ success: false });
            })
        });

    });
}




