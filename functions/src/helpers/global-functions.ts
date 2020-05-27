import { admin } from "../init/init.firebase";
import { EngineSettings, TestSettings } from '../settings';
import { System } from "../system/system";
// import { UNDEFINED_FIELD_VALUE } from "../defines";
import * as functions from 'firebase-functions';
import { FunctionsErrorCode } from "firebase-functions/lib/providers/https";
import { Router } from "../router/router";
import { CommentData } from "../comment/comment.interfaces";
import { firestore } from "firebase-admin";
import { PostData } from "../post/post.interfaces";
import { CategoryData } from "../category/category.interfaces";
import { UserRequestData } from "../user/user.interfaces";
import { LikeResponse, DOCUMENT_NOT_EXISTS } from "../defines";

export const Settings = EngineSettings;



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

export function likeDoc(id: string) {
    return admin().firestore().collection('like').doc(id);
}


export function commentCol() {
    return admin().firestore().collection('comment');
}

export function commentDoc(id: string) {
    return admin().firestore().collection('comment').doc(id);
}


// export function categoryPostRelationDoc(postId: string) {
//     return admin().firestore().collection('category-post-relation').doc(postId);
// }


/**
 * Returns true if the user is one of the admins.
 * @note for test, `System.auth.email` must be set before calling this method.
 * @example
 *      System.auth.email = EngineSettings.adminEmails[0]; //
 *      System.auth.email = 'admin@email.com'; // or
 *      assert.equal(isAdmin(), true);
 */
export function isAdmin(): boolean {
    return EngineSettings.adminEmails.includes(System.auth.email);
}

export function isLoggedIn(): boolean {
    return !!System.auth.uid;
}

/**
 * 로그인한 사용자의 UID 를 리턴한다.
 */
export function getLoggedInUserId(): string | null {
    if (isLoggedIn()) return System.auth.uid;
    else return null;
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
 * Login as user.
 * This will set fake `UID` by default.
 * @param n no of user in Test Settings.
 * @param auth - if it is set to true, it gets real UID from `Firebase Auth`.
 * 
 * @code
 *  loginAsUser(0, true);
 * @endcode
 * 
 * TODO: 사용자 Email 주소만 기록하고, 항상 UID 를 Auth 에서 가져온다. 즉, UID 를 설정에서 지정하지 않도록 한다.
 * 이로 인해서 사용자 UID 를 설정의 것과 비교 할 수 없다.
 */
export async function loginAsUser(n: number = 0, auth: boolean = true) {
    if (auth) await forceUserLoginByEmail(TestSettings.emails[n]);
    else {
        System.auth.email = TestSettings.emails[n];
        System.auth.uid = TestSettings.uids[n];
    }
}

/**
 * Logs in as admin.
 * @arning This must be used on unit testing only.
 * 
 * @param auth - if it is set to true, then it will login with `Firebase Auth` meaning, it will have proper UID.
 *              This is needed to update admin profile and other works.
 */
export async function loginAsAdmin(auth: boolean = false) {
    if (auth) await forceUserLoginByEmail(EngineSettings.adminEmails[0]);
    else setAuthEmail(EngineSettings.adminEmails[0]);
}

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


/**
 * Creates a user. This is test purpose only.
 * @param data user data
 */
export async function testCreateUser(data: any): Promise<any> {
    const router = new Router('user.register');
    const displayName = 'name' + (new Date).getTime();
    const email = displayName + '@gmail.com';
    const photoURL = 'https://photourl.com/' + displayName + '.jpg';
    const req = {
        email: email,
        password: '12345a',
        displayName: displayName,
        photoURL: photoURL,
        phoneNumber: '+82-10-' + getRandomInt(1000, 9999) + '-' + getRandomInt(1000, 9999),
        name: displayName
    };
    return await router.run(req);
}

/**
 * Updates a user.
 * @attenton Test purpose only.
 * @param data user data
 *  - `data.uid`, which is madatory.
 */
export async function testUpdateUser(data: UserRequestData): Promise<any> {
    const newRouter = new Router('user.update');
    return await newRouter.run(data);
}


/**
 * Creates a temporary category as admin.
 * @note this automatically logs in as admin.
 * @attention this is for test purpose only
 */
export async function testCreateCategory(): Promise<CategoryData> {
    await loginAsAdmin();
    const tempCategory = {
        id: 'temp-category-id-for-comment-' + (new Date).getTime(),
        title: 'Temp Category',
    };
    const routerCategory = new Router('category.create');
    const re: CategoryData = await routerCategory.run({ id: tempCategory.id, title: tempCategory.title });
    return re;
}

/**
 * Creates a post with the given categories.
 * @note you may login into a user before creating a post.
 * @warning it needs `auth uid`. Meaning, it needs to login by `forceUserLoginByEmail`.
 * @attention this is for test purpose only.
 */
export async function testCreatePost(authorEmail: string, categories: string[]): Promise<PostData> {
    await forceUserLoginByEmail(authorEmail);
    const route = new Router('post.create');
    const data = { uid: System.auth.uid, categories: categories, };
    // console.log('System.auth: ', System.auth);
    // console.log('data: ', data);
    const post: PostData = await route.run<PostData>(data);
    return post;
}

/**
 * Creates a commnet.
 * @note this is for test only.
 * @param postId post id
 * @param content content of comment
 * @param parentId parent comment id
 * @code
 * const aa = await testCreateComment(post.id!, 'AA', a.id);
 */
export async function testCreateComment(postId: string, content: string, parentId?: string): Promise<CommentData> {

    const routerComent = new Router('comment.create');
    const comment: CommentData = await routerComent.run<CommentData>({
        postId: postId,
        content: content,
        parentId: parentId,
    });
    return comment;
}




/**
 * 
 * like 또는 dislike 투표를 한다.
 * 
 * post.ts 나 comment.ts 에서 해당 도큐먼트 ref 와 like, dislike 로 주고 호출한다.
 * 
 * @param obj 글 또는 코멘트 레퍼런스 일 수 있다.
 *  - Dependency Injection 방식으로 처리를 한다.
 * @throw 에러가 있으면 throw 한다.
 *  - 도큐먼트가 존재하지 않는 등의 에러
 * @logic
 *  - like 했는데, dislike 하면,
 *      - 에러를 내지 않고, like 를 dislike 로 변경한다
 *  - 동일한 vote 를 두번하면, 무료 처리 한다.
 *      - 예를 들어, dislike 를 했는데 또 dislike 를 하면 dislike 를 없앤다.=
 * - vote 할 때마다 해당 글/코멘트 도큐먼트에 likes 와 dislikes 카운트를 조정한다.
 * @example
 *  like(postRef, 'like');
 *  like(commentRef, 'dislike');
 * 
 */
export async function vote(doc: firestore.DocumentReference, vote: 'like' | 'dislike'): Promise<LikeResponse> {


    const key: string = doc.id + getLoggedInUserId();

    const docData = (await doc.get()).data(); /// Get doc data.
    if (docData == null) throw error(DOCUMENT_NOT_EXISTS);
    const snapshot = await likeDoc(key).get(); /// Like doc

    let result: 'cancelled' | 'voted';
    if (snapshot.exists) { /// Like exists
        // console.log('like exists');
        const likeData = snapshot.data(); /// Get like data
        if (likeData?.vote == vote) { /// Same vote again? then, cancel
            // console.log('same vote. cancel');
            /// cancel
            await snapshot.ref.delete(); /// Delete the like
            // console.log('delete like');
            /// decrease the vote
            if (vote === 'like') {
                docData.likes--;
            } else {
                docData.dislikes--;
            }
            result = 'cancelled';
        } else {
            /// update the vote in like collection
            await snapshot.ref.update({ vote: vote });
            /// update the doc
            if (vote === 'like') {
                docData.likes++;
                docData.dislikes--;
            } else {
                docData.likes--;
                docData.dislikes++;
            }
            result = 'voted';
        }
    } else {
        /// create like
        const data = {
            id: doc.id,
            uid: getLoggedInUserId(),
            vote: vote,
        };
        await likeDoc(key).set(data);

        if (docData.likes === void 0) docData.likes = 0;
        if (docData.dislikes === void 0) docData.dislikes = 0;
        if (vote == 'like') docData.likes++;
        else docData.dislikes++;

        result = 'voted';
    }

    /// update doc's vote.
    await doc.update({ likes: docData.likes, dislikes: docData.dislikes })
    const ret: LikeResponse = {
        id: doc.id,
        vote: vote,
        result: result,
        likes: docData.likes,
        dislikes: docData.dislikes,
    };
    return ret;
}


/**
 * This does pre-processing(sanitizing) before delivering data to client.
 * @note it adds author's `displayName` & `photoUrl`
 * @note obj - which is either a post or a comment.
 * @return the object which was added user data.
 *  - The prameter is called-by-refernce.
 */
/// 한번 가져온 사용자 정보를 컨테이너에 보관해서, 두 번 가져 오지 않도록 한다. 이를 통해서 쿼리 성능 향상을 꽤한다.
/// @warning `글 읽기 -> 회원 정보 수정 -> 글 읽기` 와 같이 하는 경우, container 로 인해 수정된 회원 정보가 반영되지 않는다.
/// 이와 같은 경우, container 를 리셋하면 된다.
/// 특히 테스트를 하는 경우, 자주 회원 정보를 변경 할 수 있으니 유의한다.
let userDataContainer: any = {};
export function resetUserContainerData() {
    userDataContainer = {};
}
export async function addUserData(obj: PostData | CommentData): Promise<PostData | CommentData> {
    // console.log('obj', obj);

    if (obj === null) return obj;
    if (obj.uid === void 0) return obj;
    if (userDataContainer[obj.uid] !== void 0) {
        obj.displayName = userDataContainer[obj.uid]['displayName'];
        obj.photoUrl = userDataContainer[obj.uid]['photoUrl'];
    } else {
        let user;
        try {
            user = await admin().auth().getUser(obj.uid);

            if (user.displayName) {
                obj.displayName = user.displayName;
            }
            else obj.displayName = '';

            if (user.photoURL) {
                obj.photoUrl = user.photoURL;
            } else {
                obj.photoUrl = '';
            }

        } catch (e) {
            obj.displayName = '';
            obj.photoUrl = '';
        }
        userDataContainer[obj.uid] = {
            displayName: obj.displayName,
            photoUrl: obj.photoUrl,
        };
    }

    // console.log(`displayName: ${obj.displayName}, photoUrl: ${obj.photoUrl}`);

    return obj;
}


