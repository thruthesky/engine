
import { Router } from '../router/router';

import * as assert from 'assert';
import { WriteResult } from '@google-cloud/firestore';


describe('Test class', function () {

    this.timeout(1000);

    it('Document without key', async () => {
        // The code is: "Cannot read property 'key' of undefined"
        const router = new Router('test.docCreate');
        const re = await router.run();
        assert.equal(re.code.indexOf('key') > 0, true);
        assert.equal(re.code.indexOf('undefined') > 0, true)
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

});
