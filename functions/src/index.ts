import * as functions from 'firebase-functions';
/// Firebase Database 및 기타 Resource 에 접속하기 위해서는 Admin SDK 가 필요하다.
/// 서버에서 실행이 되므로 Service Key 가 필요 없다. (단, 로컬에서 테스트 할 때에는 필요하다.)
import * as admin from 'firebase-admin';
admin.initializeApp();

// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.addMessage3 = functions.https.onCall(async (data, context) => {
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
    // console.log('updatePhoto: ref: ', tempRef.path);
    return tempRef.doc(text).set({ name: sanitizedMessage })

        .then(() => {
            console.log('New Message written');
            // 결과 리턴
            return { name: sanitizedMessage };
        })
        // 에러가 있으면, 클라이언트로 전달
        .catch((error) => {
            // Re-throwing the error as an HttpsError so that the client gets the error details.
            throw new functions.https.HttpsError('unknown', error.message, error);
        });
    // [END_EXCLUDE]
});