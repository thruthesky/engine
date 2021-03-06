import { Router } from "../router/router";
import * as assert from 'assert';
import { Settings } from "../helpers/global-functions";

describe('System', function () {
    this.timeout(10000);
    it('Admin emails', async () => {
        const router = new Router('system.adminEmails');
        const adminEmails: String[] = await router.run();
        assert.equal(adminEmails.length, Settings.adminEmails.length);
    });
});
