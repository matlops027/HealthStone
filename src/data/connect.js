import SQLite from 'react-native-sqlite-storage';
SQLite.enablePromise(true);

let hsdb = SQLite.openDatabase({name : "HealthStoneDB.db", createFromLocation : 1});

export const OpenHSDB = async () => {
  return new Promise((resolve, reject) => {
    SQLite.openDatabase({name : "HealthStoneDB.db", createFromLocation : 1}).then((HSDB) => {
      hsdb = HSDB;
      resolve(hsdb);
    }).catch((error) => {
      reject({ success: false, error: error })
    });
  })
}