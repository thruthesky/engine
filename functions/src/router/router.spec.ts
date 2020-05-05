
import { Router } from './router';
import * as assert from 'assert';
import { WRONG_CLASS_NAME, WRONG_METHOD_NAME } from '../defines';
import { User } from '../user/user';

describe('Router', () => {
    it('Router parsing test', () => {
        const router = new Router('wrong.func');
        assert.equal(router.className, 'wrong');
        assert.equal(router.methodName, 'func');
    })

    it('Wrong class & method test', () => {
        let router = new Router('wrong.func');
        let error = router.run();
        assert.equal(error.message, WRONG_CLASS_NAME);

        router = new Router('user.func');
        error = router.run();
        assert.equal(error.message, WRONG_METHOD_NAME);
    })

    it('Call User::version()', () => {

        const router = new Router('user.version');

        const user = new User();
        assert.equal(router.className, 'user');
        assert.equal(router.methodName, 'version');

        const re = router.run({ name: 'abc' });
        assert.equal(re.version, user.version().version);
        assert.equal(re.name, 'abc');
    })


    // it('Test set/delete on Firestore', async () => {
    //     try {
    //         const name = 'name3';
    //         const doc = admin().firestore().collection('test').doc(name);
    //         await doc.set({ name: 'test abc' });
    //         const snapshot = await doc.get();
    //         if (snapshot.exists) {
    //             await doc.delete();
    //             const snapshot = await doc.get();
    //             if (snapshot.exists) {
    //                 assert('failed to delete created doc');
    //             }
    //         } else {
    //             assert.fail('failed to create doc');
    //         }
    //     } catch (e) {
    //         assert.fail(e.message);
    //     }
    // })
});



