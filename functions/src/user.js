"use strict";


var user = {};


const userCol = admin.firestore().collection('names');

user.add = async (data) => {
    try {
        const wres = await userCol.doc(data.name).set(data);
        return wres;
    } catch (e) {
        throw new functions.https.HttpsError('unknown', e.message, e);
    }
}

user.get = async (name) => {
    try {
        const user = await userCol.doc(name).get().then(snapshot => {
            if (snapshot.exists) {
                const data = snapshot.data();
                return data;
            } else {
                throw new Error('no_user_by_that_name');
            }
        });
        return user;
    } catch (e) {
        throw new functions.https.HttpsError('unknown', e.message, e);
    }
}

module.exports = user;
