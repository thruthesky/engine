
import { Router } from '../router/router';

import * as assert from 'assert';
import { WRONG_CLASS_NAME } from '../defines';


describe('Error tests', function () {
    this.timeout(10000);

    it('Wrong class test', async () => {
    
            const router = new Router('worng-class');
            const e = await router.run();
            assert.equal(e instanceof Object, true);
            assert.equal(e.code, WRONG_CLASS_NAME);
            
    });




    // it('Firebase email-already-exists teset', async () => {
    //     try {
    //         const router = new Router('user.register');
    //         await router.run({ email: 'email_already_exists_test@gmail.com', password: '12345a', displayName: '' });
    //         await router.run({ email: 'email_already_exists_test@gmail.com', password: '12345a', displayName: '' });
    //     } catch (e) {
    //         console.log(e);
    //         assert.equal(typeof e === 'object', true);
    //         assert.equal(e instanceof Error, true);
    //         assert.equal(typeof e.message, 'string');
    //         assert.equal(isFirebaseAuthError(e), false); // The error has been converted into javascript error already.
    //         assert.equal(e.message, AUTH_EMAIL_ALREADY_EXISTS);
    //     }
    // });



    // it('Firebase invalid uid', async () => {
    //     try {
    //         const router = new Router('user.data');
    //         await router.run(123);
    //     } catch (e) {
    //         assert.equal(typeof e === 'object', true);
    //         assert.equal(e instanceof Error, true);
    //         assert.equal(typeof e.message, 'string');
    //         assert.equal(isFirebaseAuthError(e), false); // The error has been converted into javascript error already.
    //         assert.equal(e.message, AUTH_INVALID_UID);
    //     }
    // });



    // it('Firebase undefined field value teset', async () => {
    //     try {
    //         await forceUserLoginByEmail('email_already_exists_test@gmail.com');
    //         const router = new Router('user.update');
    //         await router.run({ uid: System.auth.uid, name: undefined });
    //     } catch (e) {
    //         // console.log(e);
    //         assert.equal(e.message, UNDEFINED_FIELD_VALUE);
    //     }
    // });



    // it('Firebase undefined field value teset', async () => {
    //     try {
    //         await forceUserLoginByEmail('none_existing_user_test_123@gmail.com');
    //     } catch (e) {
    //         assert.equal(e.message, AUTH_USER_NOT_FOUND);
    //     }
    // });



    // it('Firebase get non-existing doc', async () => {
    //     try {
    //         const router = new Router('user.data');
    //         await router.run('abc');
    //     } catch (e) {
    //         assert.equal(e.message, AUTH_USER_NOT_FOUND);
    //     }
    // });

});




