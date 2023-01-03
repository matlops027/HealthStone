import { GetStatisticsDB } from '../data/dao/statisticDAO';
import { getIdProfile } from './profileService';


export const getStatistic = async () => {
    return new Promise(async (resolve, reject) => {
        try {

            let ret = {};

            let IDPROF;

            await getIdProfile()
                .then(async res => {
                    IDPROF = res;
                })
                .catch(err => {
                    reject(err);
                });
            
            await GetStatisticsDB(IDPROF)
                .then(async res => {
                    for (const [i, row] of res.stats.entries()) {

                        switch (i) {
                            case 0:
                                ret.quests = {
                                    success: row.SUCCESS,
                                    fail: row.FAIL
                                };
                                break;
                            case 1:
                                ret.kcal = {
                                    success: row.SUCCESS,
                                    fail: row.FAIL
                                };
                                break;
                            case 2:
                                ret.category = {
                                    success: row.SUCCESS ? row.SUCCESS.split(',') : [],
                                    fail: row.FAIL ? row.FAIL.split(',') : []
                                };
                                break;
                        }
                    }
                    resolve(ret);
                })
                .catch(err => {
                    reject(err);
                });

        } catch (error) {
            reject(error);
        }
    });
}

