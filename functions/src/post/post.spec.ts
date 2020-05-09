
import { Router } from "../router/router";
import * as assert from 'assert';
// import { Settings } from "../helper";
import { PERMISSION_DEFINED } from "../defines";
import { System } from "../system/system";
import { TestSettings } from "../settings";
import { forceUserLoginByEmail, forceUserLogout, trace } from "../helpers/global-functions";
// import { System } from "../system/system";
// import { EnginSettings } from "../settings";
// import { System } from "../system/system";



describe('Post', function () {
    this.timeout(10000);

    forceUserLogout();
    System.debug = true;
    it('Create permission denied', async () => {
        try {
            const route = new Router('post.create');
            await route.run({});
        } catch (e) {
            assert.equal(e.message, PERMISSION_DEFINED);
        }
    });

    it('Create success', async () => {
        await forceUserLoginByEmail(TestSettings.testUserUID);
        System.auth.email
        try {
            const route = new Router('post.create');
            const re = await route.run({});
            trace(re);
        } catch (e) {
            trace(e);
            assert.fail(e.message);
        }
    });
});
