import { admin } from "../init/init.firebase";
import { EnginSettings } from '../settings';
import { System } from "../system/system";
import { POST_ID_IS_UNDEFINED, CATEGORY_IS_UNDEFINED, UNDEFINED_FIELD_VALUE } from "../defines";



export const Settings = EnginSettings;



export function getRandomInt(minValue: number, maxValue: number) {
    const min = Math.ceil(minValue);
    const max = Math.floor(maxValue);
    // The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min)) + min;
}


/// @todo - Move to helper
export function userDoc(uid: string) {
    return admin().firestore().collection('user').doc(uid);
}

export function categoryDoc(id: string) {
    return admin().firestore().collection('category').doc(id);
}

export function postCol() {
    return admin().firestore().collection('post');
}

export function categoryPostRelationDoc(postId: string) {
    return admin().firestore().collection('category-post-relation').doc(postId);
}


/**
 * Returns true if the user is one of the admins.
 * @note for test, `System.auth.email` must be set before calling this method.
 * @example
 *      System.auth.email = EnginSettings.adminEmails[0]; //
 *      System.auth.email = 'admin@email.com'; // or
 *      assert.equal(isAdmin(), true);
 */
export function isAdmin(): boolean {
    return EnginSettings.adminEmails.includes(System.auth.email);
}

export function isLoggedIn(): boolean {
    return !!System.auth.uid;
}

export function trace(msg: any, extra?: any) {
    console.log(`Trace >>>>>`, msg, extra ?? '');
}


/**
 * Let the user login by email.
 * @warning Use this method only for testing purpose.
 * @todo block this method not to be used in production. Or move it to test lirbrary.
 * @param email user email
 * @example
 *  try {
 *      // You can force the user login and update user's information for test.
 *      await forceUserLoginByEmail('email_already_exists_test@gmail.com');
 *      const router = new Router('user.update');
 *      await router.run({ uid: System.auth.uid, name: undefined });
 *  } catch (e) {
 *      assert.equal(e.message, UNDEFINED_FIELD_VALUE);
 *  }
 */
export async function forceUserLoginByEmail(email: string) {
    try {
        const user = await admin().auth().getUserByEmail(email);
        System.auth.uid = user.uid;
        System.auth.email = user.email as any;
    } catch (e) {
        throw new Error(e.code);
    }
}
export function forceUserLogout() {
    System.auth.uid = null as any;
    System.auth.email = null as any;
}


export async function setCategoryPostRelation(category: string, postId: string) {

    try {
        if (postId === void 0) throw new Error(POST_ID_IS_UNDEFINED);
        if (category === void 0) throw new Error(CATEGORY_IS_UNDEFINED);
        await categoryPostRelationDoc(postId).set({ category: category });
    } catch (e) {
        throw e;
    }
}


export function isFirebaseAuthError(e: any): boolean {
    if (!e) return false;
    if (e.code !== void 0) {
        return e.code.indexOf('auth/') === 0; // Admin SDK Auth Error
    }
    return false;
}


/**
 * This converts Firebase error into javascript error.
 * @param e Error object
 */
export function convertFirebaseErrorIntoJavascriptError(e: any) {
    if (e instanceof Error) {

        

        /// auth/...
        if (isFirebaseAuthError(e)) {
            return new Error((e as any).code);
        }

        /// If it is firebase error(mostly Firestore error), the message is very long.
        /// Make long error string into short error code if it's firebase error.
        let code = '';
        if (e.message.indexOf(`Cannot use "undefined" as a Firestore value`) > -1) code = UNDEFINED_FIELD_VALUE;
        if (code !== '') return new Error(code);

        /// If it's not firebase error, just return.
        return e;
    }
    return e;
}
