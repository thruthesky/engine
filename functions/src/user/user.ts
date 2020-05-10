import { admin } from "../init/init.firebase";
import { EMAIL_NOT_PROVIDED, PASSWORD_NOT_PROVIDED, INPUT_NOT_PROVIDED } from "../defines";
import { userDoc, error } from "../helpers/global-functions";


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
        if (!data) throw error(INPUT_NOT_PROVIDED);
        if (data.email === void 0) throw error(EMAIL_NOT_PROVIDED);
        if (data.password === void 0) throw error(PASSWORD_NOT_PROVIDED);

        // console.log('User::register() => await admin().auth().createUser(...)');
        // console.log('register data: ', data);
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

        /**
         * If a user is created on Firebase console, the user has no `user` doc in Firestore.
         */
        const u = await this.data(uid);
        if (u.created === void 0) {
            await userDoc(uid).set({
                created: (new Date).getTime(),
            });
        }

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
     * @note When there is no user doc in `Firebase`, it just return with `auth` data.
     * @todo Only admin can get other user's uid. Normal users can get only their own information. Normal users don't need to pass UID.
     */
    async data(uid: string) {
        const gotUser = await admin().auth().getUser(uid);

        const snapshot = await userDoc(uid).get();


        /**
         * If there is no document for the user in Firestore, just pass Auth data.
         * If user is created on Firebase console, then the user does not have `user` doc in Firestore.
         */
        let data;
        if (!snapshot.exists) {
            /**
             * If there is no user doc, then `create` property is undefined.
             */
            data = {};
        } else {
            data = snapshot.data();
        }
        if (data === void 0) data = {};
        data.email = gotUser.email;
        data.uid = gotUser.uid;
        data.displayName = gotUser.displayName;
        data.phoneNumber = gotUser.phoneNumber;
        data.photoURL = gotUser.photoURL;

        return data;

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