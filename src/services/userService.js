import firebase from 'react-native-firebase';
import { decode as atob, encode as btoa } from 'base-64';
import { InsertUserDB, GetUserByEmail, GetUserInfo } from '../data/dao/userDAO'

// import {openDatabase} from 'react-native-sqlite-storage';

// const db = openDatabase({name: 'HealthStoneDB.db', createFromLocation: 1});

export const InsertUser = async (email, nome) => {
    return new Promise(async (resolve, reject) => {
        try {
            await InsertUserDB(email, nome).then(async res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    });
}

export const getIdUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const userMail = firebase.auth().currentUser.email;

            let retorno = null;

            await GetUserByEmail(userMail).then(async res => {
                retorno = res.userID;
            }).catch(err => {
                reject(err);
            });
      

            // await getRewardUser().then(res => {
            //     retorno.recomp_user = res.userRewards;
            // })

            resolve(retorno);
        } catch (error) {
            reject(error);
        }
    });
}

export const getUserInfo = async () => {
    return new Promise(async (resolve, reject) => {
        let userID;
        try {
            await getIdUser()
                .then(async res => {
                    userID = res;
                })
                .catch(err => {
                    reject(err);
                });
            
            await GetUserInfo(userID)
                .then(async res => {
                    resolve(res.userInfo);
                })
                .catch(err => {
                    reject(err);
                });
    
            
        } catch (error) {
            reject(error);
        }
    });
}

