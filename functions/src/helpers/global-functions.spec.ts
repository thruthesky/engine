
import * as assert from 'assert';
import {
    isAdmin,
} from "./global-functions";
import { System } from '../system/system';
import { EngineSettings } from '../settings';
describe('Helpers > Global functions', function () {
    this.timeout(10000);
    it('isAdmin', async () => {
        System.auth.email = undefined as any;
        assert.equal(isAdmin(), false);
        System.auth.email = EngineSettings.adminEmails[0];
        assert.equal(isAdmin(), true);
    });
});




