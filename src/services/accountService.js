import firebase from 'react-native-firebase';

export const Login = async (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password).then(async res => {
                res ? resolve(true) : reject(false);
            }).catch(err => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    });
}

export const Signin = async (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password).then(async res => {
                res ? resolve(true) : reject(false);
            }).catch(err => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    });
}

export const SignOut = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await firebase.auth().signOut().then(async res => {
                resolve(true);
            }).catch(err => {
                reject(err);
            })
        } catch (error) {
            reject(error);
        }
    });
}


export const getUserLogged = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            await firebase.auth().onAuthStateChanged(async user => {
                if (user) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        } catch (e) { reject(e); }
    });
}