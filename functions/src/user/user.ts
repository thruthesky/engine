import { admin } from "../init.firebase";
import { USER_NOT_EXIST, EMAIL_NOT_PROVIDED, PASSWORD_NOT_PROVIDED, INPUT_NOT_PROVIDED } from "../defines";


export class User {

    /**
     * Register user with email & password.
     * 
     * `data` can have more properties to save as user information.
     * 
     * @param data object
     * 
     * @example open `user.spec.ts` to see more examples.
     * 
     */
    async register(data: any) {
        if (!data) throw new Error(INPUT_NOT_PROVIDED);
        if (data.email === void 0) throw new Error(EMAIL_NOT_PROVIDED);
        if (data.password === void 0) throw new Error(PASSWORD_NOT_PROVIDED);

        try {
            const created = await admin().auth().createUser({
                email: data.email,
                password: data.password,
                displayName: data.displayName,
                phoneNumber: data.phoneNumber,
                photoURL: data.photoURL,
                emailVerified: false,
            });

            delete data.password;
            delete data.displayName;
            delete data.phoneNumber;
            delete data.photoURL;

            await this.userDoc(created.uid).set(data);
            data.uid = created.uid;
            return data;
        } catch (e) {
            throw new Error(e.code);
        }

    }

    /**
     * 
     * Updates user information
     * 
     * @param data
     * 
     * @todo - user verification.
     * @todo - input validation. no password. no disabled option.
     */
    async update(data: any) {
        try {
            await admin().auth().updateUser(data.uid, {
                displayName: data.displayName,
                phoneNumber: data.phoneNumber,
                photoURL: data.photoURL,
                emailVerified: false
            });
            delete data.displayName;
            delete data.phoneNumber;
            delete data.photoURL;
            await this.userDoc(data.uid).update(data);
            const userData = await this.data(data.uid);
            userData.uid = data.uid;
            return userData;
        } catch (e) {
            throw new Error(e.code);
        }
    }


    /**
     * Deletes from Firebase auth & user collection.
     * @param uid user uid
     */
    async delete(uid: string) {
        try {
            await admin().auth().deleteUser(uid);
            await this.userDoc(uid).delete();
            return uid;
        } catch (e) {
            throw new Error(e.code);
        }
    }

    userDoc(uid: string) {
        return admin().firestore().collection('user').doc(uid);
    }
    /// Returns user data from Firestore & from Auth information.
    async data(uid: string) {
        try {
            const gotUser = await admin().auth().getUser(uid);
            const snapshot = await this.userDoc(uid).get();
            if (snapshot.exists) {
                let data = snapshot.data();
                if (data === void 0) data = {};
                data.email = gotUser.email;
                data.uid = gotUser.uid;
                data.displayName = gotUser.displayName;
                data.phoneNumber = gotUser.phoneNumber;
                data.photoURL = gotUser.photoURL;

                return data;
            } else {
                throw new Error(USER_NOT_EXIST);
            }
        } catch (e) {
            throw new Error(USER_NOT_EXIST);
        }
    }

    /**
     * This method is only for testing.
     * @param data data - any data will be passed back to client.
     */
    version(data?: any) {
        let newData;
        if (data === void 0) newData = {};
        else newData = data;
        newData.version = '0.1';
        return newData;
    }
}