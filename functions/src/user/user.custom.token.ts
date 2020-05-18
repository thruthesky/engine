import { admin } from "../init/init.firebase";
// import { userDoc, error } from "../helpers/global-functions";
import * as express from 'express';
import { User } from "./user";
import { AUTH_USER_NOT_FOUND } from "../defines";
import { json as parser } from 'body-parser';


class UserCustomToken {

    public application: express.Application;
    private _user: User;

    constructor() {
        this.application = express();
        this._user = new User();
    }

    /**
     * Create firebase custom token.
     * 
     * `data` can have more properties to save as user information.
     * 
     * @param data object
     * 
     */
    async createFirebaseToken(req: any, res: any) {
        const body = JSON.parse(req.body);

        const uid = `kakao:${body.id}`;
        const email = body.email;
        const displayName = body.properties.nickname;
        const phoneNumber = body.properties.phoneNumber;
        const photoURL = body.properties.profile_image;
        const data = {
            provider: 'KAKAO',
            displayName: displayName,
            phoneNumber: phoneNumber,
            photoURL: photoURL,
        }
        if (!displayName) delete data.displayName;
        if (!phoneNumber) delete data.phoneNumber;
        if (!photoURL) delete data.photoURL;
        // console.log(data);

        const user = await this.registerOrCreateUser(uid, email, data);
        return await admin().auth().createCustomToken(user.uid, { provider: 'KAKAO' })
    }

    /**
     * Create firebase user or Update firebase user
     * 
     * `data` can have more properties to save as user information.
     * 
     * @param data object
     * 
     */
    async registerOrCreateUser(uid: any, email: string, data: any) {
        console.log(`registerOrCreateUser ${uid} ${email} ${data}`)
        return await admin().auth().updateUser(uid, data)
            .then(async (_) => {
                const userData = await this._user.updateUserDoc(uid, data);
                // console.log(userData);
                return userData;
            })
            .catch(async (error) => {
                if (error.code === AUTH_USER_NOT_FOUND) {
                    const created = await admin().auth().createUser({
                        ...data,
                        uid,
                        emailVerified: false,
                    });
                    if (email) data.email = email;

                    // console.log(created);
                    const userData = await this._user.setUserDoc(created.uid, data);
                    return userData;
                }
                throw error;
            });
    }
}


const userCustomToken = new UserCustomToken();
const userCustomTokenApp = userCustomToken.application;
userCustomTokenApp.use(parser());
userCustomTokenApp.post('/custom', (req, res) => {
    userCustomToken.createFirebaseToken(req, res)
        .then((firebaseToken) => {
            res.send({ firebase_token: firebaseToken })
        }).catch((error) => {
            console.log(error)
            throw error;
        });
});
export default userCustomTokenApp;