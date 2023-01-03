import firebase from 'react-native-firebase';
import { decode as atob, encode as btoa } from 'base-64';
import { GetAvatarInfo, InitialAvatarDB, UpdateAvatarDB } from '../data/dao/avatarDAO'
import Toast from '../components/Toasts';
import { getIdProfile } from './profileService';
import { prepareObjToUpdate } from '../utils';



export const InitialAvatar = async (profID) => {
    return new Promise(async (resolve, reject) => {
        try {
            await InitialAvatarDB(profID).then(async res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    });
}



export const updateAvatar = async (objUpdateAvatar) => {
    return new Promise(async (resolve, reject) => {
        
        let profID;
        let updates;
        try {
            await getIdProfile()
                .then(async res => {
                    profID = res;
                })
                .catch(err => {
                    reject(err);
                });
            
            updates = prepareObjToUpdate(objUpdateAvatar)

            await UpdateAvatarDB(profID, updates)
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

export const getAvatarInfo = async () => {
    return new Promise(async (resolve, reject) => {
        
        let profID;
        try {
            await getIdProfile()
                .then(async res => {
                    profID = res;
                })
                .catch(err => {
                    reject(err);
                });
            

            await GetAvatarInfo(profID)
                .then(async res => {
                    resolve(res.avatarInfo);
                })
                .catch(err => {
                    reject(err);
                });
    
            
        } catch (error) {
            reject(error);
        }
        
    });
}