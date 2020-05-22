
import { Router } from '../router/router';
import { loginAsAdmin, loginAsUser } from '../helpers/global-functions';
import { System } from '../system/system';

import * as assert from 'assert';

describe('Admin check', function () {
    this.timeout(10000);
    it('Login as admin and check', async () => {
        await loginAsAdmin(true);
        const router = new Router('user.update');
        const req = {
            uid: System.auth.uid,
            name: 'I am root'
        };
        const re = await router.run(req);
        // console.log(re);
        assert.equal(re.error, undefined);
        assert.equal(re.admin, true);
    });

    it('Login as user and check', async () => {
        await loginAsUser(0, true);
        const router = new Router('user.update');
        const req = {
            uid: System.auth.uid,
            name: 'I am user'
        };
        const re = await router.run(req);
        // console.log(re);
        assert.equal(re.error, undefined);
        assert.equal(re.admin, undefined);
    });


});



