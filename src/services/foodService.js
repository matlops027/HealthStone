import { GetFoodsFilter, InsertCreatedFoodDB, UpdateFoodByUserDB } from '../data/dao/foodDAO'
import { prepareObjToInsert, prepareObjToUpdate } from '../utils';
import { getIdUser } from './userService';

export const getFoodsFilter = async (filter, CATEGOIDS) => {
    return new Promise(async (resolve, reject) => {
        try {

            let retorno = null;

            await GetFoodsFilter(filter, CATEGOIDS).then(async res => {
                retorno = res.filteredFoods;
            }).catch(err => {
                reject(err);
            });
            resolve(retorno);
        } catch (error) {
            reject(error);
        }
    });
}

export const createFoodUser = async (createdFood) => {
    return new Promise(async (resolve, reject) => {
        try {
            let insertObj;

            await getIdUser()
                .then(async res => {
                    createdFood.IDUSER = res;
                })
                .catch(err => {
                    reject(err);
                });

            insertObj = prepareObjToInsert(createdFood)

            await InsertCreatedFoodDB(insertObj)
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

export const updateUserFood = async (objUpdateFood) => {
    return new Promise(async (resolve, reject) => {
        
        
        let updates;
        try {

            let IDFOOD = objUpdateFood.IDFOOD;
            delete objUpdateFood.IDFOOD;


            await getIdUser()
                .then(async res => {
                    objUpdateFood.IDUSER = res;
                })
                .catch(err => {
                    reject(err);
                });

            
            updates = prepareObjToUpdate(objUpdateFood)

            await UpdateFoodByUserDB(IDFOOD, updates)
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
