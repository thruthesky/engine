
import { Router } from '../router/router';

import * as assert from 'assert';
import { WriteResult } from '@google-cloud/firestore';
import { RESULT_IS_NOT_OBJECT } from '../defines';


describe('Test class', function () {

    this.timeout(1000);

    it('Document without key', async () => {
        // The code is: 'Value for argument "documentPath" is not a valid resource path. Path must be a non-empty string.'
        const router = new Router('test.docCreate');
        const re = await router.run({});
        assert.equal(re.code.indexOf('documentPath') > 0, true)
        assert.equal(re.code.indexOf('non-empty string') > 0, true);
    });


    it('Document with key and undefined as its value', async () => {
        // The code is: 'Value for argument "documentPath" is not a valid resource path. Path must be a non-empty string.'
        const router = new Router('test.docCreate');
        const re = await router.run({ key: undefined });
        assert.equal(re.code.indexOf('documentPath') > 0, true)
        assert.equal(re.code.indexOf('non-empty string') > 0, true);
    });



    it('Document with key and null as its value', async () => {
        // The code is: 'Value for argument "documentPath" is not a valid resource path. Path must be a non-empty string.'
        const router = new Router('test.docCreate');
        const re = await router.run({ key: null });
        assert.equal(re.code.indexOf('documentPath') > 0, true)
        assert.equal(re.code.indexOf('non-empty string') > 0, true);
    });


    it('Document create', async () => {
        // The result is: WriteResult
        const router = new Router('test.docCreate');
        const re: WriteResult = await router.run({ key: 'name' });
        assert.equal(re.writeTime !== void 0, true);
    });


    it('Get non-existing doc', async () => {
        // Since the document does not exsit, the result is `undefined` and `router.run()` will throw result is not object.
        // Expect: { error: true, code: 'engin/result-is-not-object', message: '' }
        const router = new Router('test.docGet');
        const re = await router.run('this-is-the-key');
        assert.equal(re.code, RESULT_IS_NOT_OBJECT);
    })

});
