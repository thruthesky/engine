import { admin } from "../init.firebase";
import { USER_NOT_EXIST } from "../defines";


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

        try {
            const created = await admin().auth().createUser({
                email: data.email,
                password: data.password,
                emailVerified: false,
            });

            delete data.password;
            this.userDoc(created.uid).set(data);

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
     */
    async update(data: any) {
        try {
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
        } catch(e) {
            throw new Error(e.code);
        }
    }

    userDoc(uid: string) {
        return admin().firestore().collection('user').doc(uid);
    }
    async data(uid: string) {
        try {
            const snapshot = await this.userDoc(uid).get();
            if (snapshot.exists) {
                return snapshot.data() ?? {};
            } else {
                throw new Error(USER_NOT_EXIST);
            }
        } catch (e) {
            throw new Error(USER_NOT_EXIST);
        }
        // return this.userDoc(uid).get().then(snapshot => {
        //     if (snapshot.exists) {
        //         return snapshot.data() ?? {};
        //     } else {
        //         throw new Error(USER_NOT_EXIST);
        //     }
        // });
    }

    version(data?: any) {
        if (data === void 0) data = {};
        data.version = '0.1';
        return data;
    }
}