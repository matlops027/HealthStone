import firebase from 'react-native-firebase';
import { GetAllRewardsDB, GetRewardsByUserDB, InsertCreatedRewardDB, InsertProfReward, RemoveProfReward, UpdateRewardByUserDB } from '../data/dao/rewardDAO';
import { getIdProfile, updateProfInfo } from './profileService';
import { formatDate, prepareObjToInsert } from '../utils';
import { getIdUser } from './userService';

export const getRewards = async (callback) => {
    return new Promise(async (resolve, reject) => {
        let rewards = [];
        try {
            
            await GetAllRewardsDB()
                .then(async res => {
                    rewards = res.returnSql;
                })
                .catch(err => {
                    reject(err);
                });

            resolve(callback(rewards));

        } catch (error) {
            reject(error);
        }
    });
}


export const useRewards = async (data, profile) => {
    return new Promise(async (resolve, reject) => {
        try {
            data.map(async reward => {
                await RemoveProfReward(profile.IDPROF, reward.IDREWD).catch(err => {
                    reject(err);
                });
            });
            resolve({success: true});
        } catch (error) {
            reject(error);
        }
    });
}

export const getRewardProfile = async () => {
    return new Promise(async (resolve, reject) => {
        let profRewards = [];
        try {

            let profID;
            await getIdProfile()
                .then(async res => {
                    profID = res;
                })
                .catch(err => {
                    reject(err);
                });
            
            

            await GetRewardsByUserDB(profID)
                .then(async res => {
                    profRewards = res.returnSql;
                })
                .catch(err => {
                    reject(err);
                });
            
            resolve({ profRewards })
            
        } catch (error) {
            reject(error);
        }
    });
}

export const addReward = async (data, profile) => {
    return new Promise(async (resolve, reject) => {
        try {
            data.selectedRewards.map(async reward => {
                const date = formatDate(new Date());
                await InsertProfReward(profile.IDPROF, reward.IDREWD, date).catch(err => {
                    reject(err);
                });
            });
             
            await updateProfInfo({
                coin: profile.COIN - data.totalValue
            }).then(async res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });

        } catch (error) {
            reject(error);
        }
    });
}

export const createRewardUser = async (createdReward) => {
    return new Promise(async (resolve, reject) => {
        try {
            let insertObj;

            await getIdUser()
                .then(async res => {
                    createdReward.IDUSER = res;
                })
                .catch(err => {
                    reject(err);
                });

            insertObj = prepareObjToInsert(createdReward)

            await InsertCreatedRewardDB(insertObj)
                .then(async res => {
                    
                })
                .catch(err => {
                    reject(err);
                });
            
            resolve(true)
            
        } catch (error) {
            reject(error);
        }
    });
}

export const updateUserReward = async (objUpdateReward) => {
    return new Promise(async (resolve, reject) => {
        
        
        let updates;
        try {

            let IDREWD = objUpdateReward.IDREWD;
            delete objUpdateReward.IDREWD;


            await getIdUser()
                .then(async res => {
                    objUpdateReward.IDUSER = res;
                })
                .catch(err => {
                    reject(err);
                });

            
            updates = prepareObjToUpdate(objUpdateReward)

            await UpdateRewardByUserDB(IDREWD, updates)
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