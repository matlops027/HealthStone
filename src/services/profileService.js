import firebase from 'react-native-firebase';
import { decode as atob, encode as btoa } from 'base-64';
import { CreateProfileDB, UpdateProfileDB, GetProfileInfo, GetActiveProfileByUserDB } from '../data/dao/profileDAO';
import { getIdUser } from './userService';
import { prepareObjToUpdate } from '../utils';



export const CreateProfile = async (idUser, userNick) => {
    return new Promise(async (resolve, reject) => {
        try {
            await CreateProfileDB(idUser, userNick)
                .then(async res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        } catch (error) {
            reject(error);
        }
    });
}

export const updateProfInfo = async (objUpdateProf) => {
    return new Promise(async (resolve, reject) => {

        let userID;
        let updates = ' ';
        try {
            await getIdUser()
                .then(async res => {
                    userID = res;
                })
                .catch(err => {
                    reject(err);
                });
            
            updates = prepareObjToUpdate(objUpdateProf)

            await UpdateProfileDB(userID, updates)
                .then(async res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
    
            
        } catch (error) {
            reject(error);
        }
    });
}

export const getIdProfile = async () => {
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
            

            await GetActiveProfileByUserDB(userID)
                .then(async res => {
                    resolve(res.profileID);
                })
                .catch(err => {
                    reject(err);
                });
    
            
        } catch (error) {
            reject(error);
        }
    });
}

export const getProfileInfo = async () => {
    return new Promise(async (resolve, reject) => {

        let profileID;
        try {
            await getIdProfile()
                .then(async res => {
                    profileID = res;
                })
                .catch(err => {
                    reject(err);
                });
            
            
            await GetProfileInfo(profileID)
                .then(async res => {
                    resolve(res.profileInfo);
                })
                .catch(err => {
                    reject(err);
                });
    
            
        } catch (error) {
            reject(error);
        }
    });
}


