// import { Router } from "../router/router";
import * as assert from 'assert';
// import { Settings } from "../helper";
// import { PERMISSION_DEFINED } from "../defines";
import { isAdmin } from "./global-functions";
import { System } from '../system/system';
import { EnginSettings } from '../settings';
// import { System } from "../system/system";

describe('Helper', function () {
    this.timeout(10000);
    it('isAdmin', async () => {
        assert.equal(isAdmin(), false);
        System.auth.email = EnginSettings.adminEmails[0];
        assert.equal(isAdmin(), true);
    });
});




