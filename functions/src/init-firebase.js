
/**
 * 이미 초기화 했으면 두번하지 않는다.
 * 테스트 할 때에 --watch 를 하면, 두번 실행되지 않도록 한다.
 */
if ( typeof admin == 'undefined' ) {

    /**
     * 글로벌 변수로 지정을 해서 어떤 스크립트에서던 그냥 `admin`, `functions` 으로 참조 가능하도록 한다.
     */

    global.functions = require("firebase-functions");
    global.admin = require("firebase-admin");
    const serviceAccount = "../etc/enginf-admin-key.json";

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

}

