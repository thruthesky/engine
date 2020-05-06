
import { Router } from './router';
import * as assert from 'assert';
import { WRONG_CLASS_NAME, WRONG_METHOD_NAME } from '../defines';
import { User } from '../user/user';

describe('Router', () => {

    it('Router parsing test with empty route', async () => {
        let router = new Router(null as any);
        try {
            await router.run();
        } catch (e) {
            assert.equal(e.message, WRONG_CLASS_NAME);
        }
        router = new Router('');
        try {
            await router.run();
        } catch (e) {
            assert.equal(e.message, WRONG_CLASS_NAME);
        }
        router = new Router(undefined as any);
        try {
            await router.run();
        } catch (e) {
            assert.equal(e.message, WRONG_CLASS_NAME);
        }
    })

    it('Router parsing test with wrong class name.', async () => {
        const router = new Router('wrong.func');
        try {
            await router.run();
        } catch (e) {
            assert.equal(e.message, WRONG_CLASS_NAME);
            assert.equal(router.className, 'wrong');
            assert.equal(router.methodName, 'func');
        }
    })

    it('Router parsing test with wrong method name.', async () => {
        const router = new Router('user.func');

        try {
            await router.run();
        } catch (e) {
            assert.equal(e.message, WRONG_METHOD_NAME);
        }
    })

    it('Call User::version()', async () => {

        const router = new Router('user.version');


        const user = new User();

        const re = await router.run({ name: 'abc' });
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



