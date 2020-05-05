"use strict";
const functions = require("firebase-functions");
/// Firebase Database 및 기타 Resource 에 접속하기 위해서는 Admin SDK 가 필요하다.
/// 서버에서 실행이 되므로 Service Key 가 필요 없다. (단, 로컬에서 테스트 할 때에는 필요하다.)
const admin = require("firebase-admin");
const serviceAccount = "../etc/enginf-admin-key.json";
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.changeName2 = functions.https.onCall(async (data, context) => {
    /// 값 읽기
    const text = data.text;
    /// 값이 올바르지 않으면, 에러 출력
    if (!(typeof text === 'string') || text.length === 0) {
        // Throwing an HttpsError so that the client gets the error details.
        throw new functions.https.HttpsError('invalid-argument', 'The function must be called with ' +
            'one arguments "text" containing the message text to add.');
    }
    // DB 에 저장
    const sanitizedMessage = text.toUpperCase();
    const tempRef = admin.firestore().collection('names');

    try {
        await tempRef.doc(text).set({ name: sanitizedMessage });
        return { name: sanitizedMessage };
    }
    catch(e) {
        throw new functions.https.HttpsError('unknown', e.message, e);
    }
});




