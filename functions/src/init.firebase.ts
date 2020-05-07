import firebaseAdmin = require('firebase-admin');
const serviceAccount = "./etc/enginf-admin-key.json";

/**
 * admin() 이 처음 호출 될 때 초기화를 하고 바로 사용한다.
 * 두번 초기화를 하지 않는다.
 * admin().firestore() 와 같이 사용하면 된다.
 */
export function admin() {

    try {
        if (firebaseAdmin.app()) return firebaseAdmin.app();
        else throw Error('admin() no instance.');
    }
    catch (e) {
        firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(<any>serviceAccount),
        });
        return firebaseAdmin;
    }
}
