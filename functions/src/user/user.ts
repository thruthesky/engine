import { admin } from "../init/init.firebase";
import { EMAIL_NOT_PROVIDED, PASSWORD_NOT_PROVIDED, INPUT_NOT_PROVIDED, AUTH_USER_NOT_FOUND } from "../defines";
import { userDoc } from "../helpers/global-functions";


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

        // console.log('User::register() => await admin().auth().createUser(...)');
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

        data.created = (new Date).getTime();

        // console.log('User::register() => await userDoc()');
        await userDoc(created.uid).set(data);
        data.uid = created.uid;
        return data;
    }

    /**
     * 
     * Updates user information
     * 
     * @param data
     * 
     * @todo - user verification.
     * @todo - input validation. no password. no disabled option.
     * @todo Only admin can get other user's uid. Normal users can get only their own information. Normal users don't need to pass UID.
     * 
     */
    async update(data: any) {
        const uid = data.uid;
        delete data.uid;
        await admin().auth().updateUser(uid, {
            displayName: data.displayName,
            phoneNumber: data.phoneNumber,
            photoURL: data.photoURL,
            emailVerified: false
        });
        delete data.displayName;
        delete data.phoneNumber;
        delete data.photoURL;


        data.updated = (new Date).getTime();

        // console.log(data);
        await userDoc(uid).update(data);
        const userData = await this.data(uid);
        userData.uid = data.uid;
        return userData;
    }


    /**
     * Deletes from Firebase auth & user collection.
     * @param uid user uid
     */
    async delete(uid: string) {
        await admin().auth().deleteUser(uid);
        await userDoc(uid).delete();
        return { uid: uid };
    }

    /// Returns user data from Firestore & from Auth information.
    /// @example {'route': 'user.data', 'data': '....UID....'}
    /**
     * Returns user information
     * @param uid User uid to get information
     * @todo Only admin can get other user's uid. Normal users can get only their own information. Normal users don't need to pass UID.
     */
    async data(uid: string) {
        const gotUser = await admin().auth().getUser(uid);
        const snapshot = await userDoc(uid).get();
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
            throw new Error(AUTH_USER_NOT_FOUND);
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