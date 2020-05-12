import { admin } from "../init/init.firebase";
import { EnginSettings } from '../settings';
import { System } from "../system/system";
// import { UNDEFINED_FIELD_VALUE } from "../defines";
import * as functions from 'firebase-functions';
import { FunctionsErrorCode } from "firebase-functions/lib/providers/https";


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
export function categoryCol() {
    return admin().firestore().collection('category');
}

export function postCol() {
    return admin().firestore().collection('post');
}

export function postDoc(id: string) {
    return admin().firestore().collection('post').doc(id);
}

// export function categoryPostRelationDoc(postId: string) {
//     return admin().firestore().collection('category-post-relation').doc(postId);
// }


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
 * Let the user login by email based on the Firebase `Auth`.
 * When the Engin needs 'UID' but you only know 'email address', you can use this method.
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
 * @note `System.auth.uid` & `System.auth.email` can be set directly without accessing Firebase Auth.
 */
export async function forceUserLoginByEmail(email: string) {
    try {
        const user = await admin().auth().getUserByEmail(email);
        System.auth.uid = user.uid;
        System.auth.email = user.email as any;
    } catch (e) {
        throw error(e.code);
    }
}
export function forceUserLogout() {
    System.auth.uid = null as any;
    System.auth.email = null as any;
}

/**
 * Sets the email address as logged in.
 * @warning This must used only on unit testing.
 * @param email Email address
 */
export function setAuthEmail(email: string) {
    System.auth.email = email;
}

/**
 * Admin logs in.
 * @arning This must be used on unit testing only.
 */
export function setAdminLogin() {
    setAuthEmail(EnginSettings.adminEmails[0]);
}


/**
 * Setting category & post relationship is not an ideal solution. Document can contain array and it's searchable.
 * @deprecated
 * @param category category
 * @param postId post
 */
// export async function setCategoryPostRelation(category: string, postId: string) {

//     try {
//         if (postId === void 0) throw error(POST_ID_IS_UNDEFINED);
//         if (category === void 0) throw error(CATEGORY_IS_UNDEFINED);
//         await categoryPostRelationDoc(postId).set({ category: category });
//     } catch (e) {
//         throw e;
//     }
// }

/**
 * Returns 
 * @param e error object
 */
// export function isFirebaseAuthError(e: any): boolean {
//     if (!e) return false;
//     if (e.code !== void 0 && typeof e.code === 'string') {
//         return e.code.indexOf('auth/') === 0; // Admin SDK Auth Error
//     }
//     return false;
// }


/**
 * @deprecated
 * This converts Firebase error into javascript error.
 * @param e Error object
 */
// export function convertFirebaseErrorIntoJavascriptError(e: any) {
//     if (e instanceof Error) {



//         /// auth/...
//         if (isFirebaseAuthError(e)) {
//             return new Error((e as any).code);
//         }

//         /// If it is firebase error(mostly Firestore error), the message is very long.
//         /// Make long error string into short error code if it's firebase error.
//         let code = '';
//         if (e.message.indexOf(`Cannot use "undefined" as a Firestore value`) > -1) code = UNDEFINED_FIELD_VALUE;
//         if (code !== '') return new Error(code);

//         /// If it's not firebase error, just return.
//         return e;
//     }
//     return e;
// }


/**
 * Returns the standard error object of Cloud Functions.
 * @param code Engin Error code or Firebase error code
 * @param message description of the error code
 * @param fcode functions.https.HttpError code
 * @param fmessage description of funtions.https.HttpError code
 */
export function error(code: string, message = '', _fcode?: FunctionsErrorCode, _fmessage?: string) {
    const _details = {
        code: code,
        message: message,
    }
    let fcode = _fcode;
    let fmessage: any = _fmessage;
    if (_fcode === void 0) fcode = 'unknown';
    if (_fmessage === void 0) fmessage = message;
    return new functions.https.HttpsError(fcode as any, fmessage, _details);
}


export function details(e: functions.https.HttpsError): any {
    return e.details as any;
}


/**
 * There are many kinds of Error classes.
 *  - Cloud functions has `HttpsError` class.
 *  - Auth has `FirebaseAuthError` class.
 *  - Normal error has `Error` class.
 * 
 * So, it is another painful task to handl different kinds of error classes.
 * 
 * And `returnError` method gets different kinds of error and returns a unified(customised) error object to client.
 * 
 * Client, then, check if the returned value from object has `error` property to see if the result is failure.
 * 
 * 
 * @param e Error
 * 
 * 
 * @note Javascript error message will be delivered as in `.code` property.
 *  - For instance, "Cannot read property 'key' of undefined" is a Javascript error which is originallly in `message` property of Error.
 *      And it is delivered { error: : true, code: "Cannot read property 'key' of undefined", message: null } to Client.
 *  - Firestore looks like it throws an Exception just as the same way of normal Javascript Error class.
 *      For instance, `Error.message` has "Value for argument "documentPath" is not a valid resource path. Path must be a non-empty string." is a Firestore error.
 *      And this does not check the patterns of error message and customise it.
 *      It lets the firestore error message delivered to client just as it is.
 *  - Form validation is needed whereever needed.
 *      For instance, user create of Firebase Auth does not throw any error when email and password and other values are empty.
 *      It only throws error when the values are invalid.
 *      So, checking the email is provided or not is needed.
 */
export function returnError(e: any) {

    // console.log(e);
    const data = {
        error: true,
        code: null,
        message: null
    };

    // Is the standard Functions error?
    if (e instanceof functions.https.HttpsError) {
        data.code = details(e).code;
        data.message = details(e).message;
    } else if (e?.errorInfo?.code) {
        // If it's  Firebase Auth Error, then convert it into Functions error.
        data.code = e.errorInfo.code;
        data.message = e.errorInfo.message;
    } else {
        // Converting Javascript normal Error object into `Functions standard Error` object.
        // Normal Error thrown by normal `throw`
        // Firestore Error will be coming here.
        // Example of errors
        //  - "9 FAILED_PRECONDITION: The query requires an index. You can create it here: https://console.firebase.google.com/v1/r/project/enginf-856e7/firestore/indexes?create_composite=Cklwcm9qZWN0cy9lbmdpbmYtODU2ZTcvZGF0YWJhc2VzLyhkZWZhdWx0KS9jb2xsZWN0aW9uR3JvdXBzL3Bvc3QvaW5kZXhlcy9fEAEaDgoKY2F0ZWdvcmllcxgBGgsKB2NyZWF0ZWQQAhoMCghfX25hbWVfXxAC"
        data.code = e.message;
        data.message = e.message;
    }
    return data;
}