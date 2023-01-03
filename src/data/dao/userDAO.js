import Toast from '../../components/Toasts';
import { OpenHSDB } from '../connect';


export const InsertUserDB = async (email, nome) => {
    return new Promise(async (resolve, reject) => {
        let insertId = '';
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                    hsTransaction.executeSql(
                        `insert into USER (USERMAIL, USERNAME) VALUES (?, ?);`,
                         [email, nome],
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

export const GetUserByEmail = async (email) => {
    return new Promise(async (resolve, reject) => {
        let userID = '';
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                     hsTransaction.executeSql(
                        `select IDUSER from USER where USERMAIL = (?)`,
                         [email],
                    ).then(([hsTransaction, results]) => {
                        userID = results.rows.item(0).IDUSER;
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            ).then((result) => {
                resolve({ success: true, userID: userID });

            }).catch((err) => {
                reject(err);
            })
        });

    });
}

export const GetUserInfo = async (iduser) => {
    return new Promise(async (resolve, reject) => {
        let userInfo = {};
        await OpenHSDB().then(async con => {
            await con.transaction(
                 hsTransaction => {
                     hsTransaction.executeSql(
                        `select IDUSER, USERMAIL, USERNAME from USER where IDUSER = (?)`,
                         [iduser],
                    ).then(([hsTransaction, results]) => {
                        userInfo = results.rows.item(0);
                    }).catch((err) => {
                        reject(err);
                    });
                }
            ).then((result) => {
                resolve({ success: true, userInfo: userInfo });

            }).catch((err) => {
                reject(err);
            })
        });

    });
}