import { admin } from "./init.firebase";
import * as assert from 'assert';

describe('Firebase initialization', () => {
    it('Test set/delete on Firestore', async () => {
        try {
            const name = 'name3';
            const doc = admin().firestore().collection('test').doc(name);
            await doc.set({ name: 'test abc' });
            const snapshotTestName = await doc.get();
            if (snapshotTestName.exists) {
                await doc.delete();
                const snapshot = await doc.get();
                if (snapshot.exists) {
                    assert('failed to delete created doc');
                }
            } else {
                assert.fail('failed to create doc');
            }
        } catch (e) {
            assert.fail(e.message);
        }
    })
});