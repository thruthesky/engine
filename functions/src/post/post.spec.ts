
import { Router } from "../router/router";
import * as assert from 'assert';
// import { Settings } from "../helper";
import { PERMISSION_DEFINED } from "../defines";
import { System } from "../system/system";
import { TestSettings } from "../settings";
import { forceUserLoginByEmail, forceUserLogout } from "../helpers/global-functions";
// import { System } from "../system/system";
// import { EnginSettings } from "../settings";
// import { System } from "../system/system";



describe('Post', function () {
    this.timeout(10000);

    forceUserLogout();
    System.debug = true;
    it('Create permission denied', async () => {

        const route = new Router('post.create');
        const re = await route.run({});
        assert.equal(re.code, PERMISSION_DEFINED);

    });

    it('Create success', async () => {
        await forceUserLoginByEmail(TestSettings.testUserEmail);
        System.auth.email

        const route = new Router('post.create');
        const re = await route.run({ category: 'apple' });
        assert.equal(re?.code === void 0, true);
    });
});
