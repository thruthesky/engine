import firebaseAdmin = require('firebase-admin');
const serviceAccount = "./etc/enginf-admin-key.json";

/**
 * admin().firestore() 와 같이 사용하면 된다.
 */
export function admin() {
    if (firebaseAdmin.apps.length) return firebaseAdmin;
    else {
        firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(serviceAccount),
            // databaseURL: 'https://enginf-856e7.firebaseio.com',
        });
        return firebaseAdmin;
    }
}
