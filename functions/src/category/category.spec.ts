import { Router } from "../router/router";
import * as assert from 'assert';
// import { Settings } from "../helper";
import { PERMISSION_DEFINED } from "../defines";
// import { System } from "../system/system";

describe('Category', function () {
    this.timeout(10000);
    it('Category Create Update Delete', async () => {
        try {
            const route = new Router('category.create');
            await route.run();
        } catch (e) {
            assert.equal(e.message, PERMISSION_DEFINED);
        }

    });
});




