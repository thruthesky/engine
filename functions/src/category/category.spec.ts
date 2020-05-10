
import { WriteResult } from '@google-cloud/firestore';

import { Router } from "../router/router";
import * as assert from 'assert';
// import { Settings } from "../helper";
import { PERMISSION_DEFINED, TITLE_IS_EMPTY, INPUT_IS_EMPTY, ID_IS_EMPTY } from "../defines";
import { System } from "../system/system";
import { EnginSettings } from "../settings";
// import { System } from "../system/system";



describe('Category', function () {
    this.timeout(10000);
    it('Admin check', async () => {
        const route = new Router('category.create');
        const re = await route.run();
        assert.equal(re.code, PERMISSION_DEFINED);
    });

    it('Empty input', async () => {

        System.auth.email = EnginSettings.adminEmails[0];
        const route = new Router('category.create');
        const re = await route.run();
        assert.equal(re.code, INPUT_IS_EMPTY);
    });

    it('Id check', async () => {

        const route = new Router('category.create');
        const re = await route.run({ description: 'yo' });

        assert.equal(re.code, ID_IS_EMPTY);

    });
    it('Title check', async () => {

        const route = new Router('category.create');
        const re = await route.run({ id: 'apple', description: 'yo' });
        assert.equal(re.code, TITLE_IS_EMPTY);

    });

    it('Create a category', async () => {

        const route = new Router('category.create');
        const re: WriteResult = await route.run({ id: 'apple', title: 'apple', description: 'yo' });
        assert.equal(typeof re.writeTime.seconds === 'number', true);

    });

    it('Update the category', async () => {
        const route = new Router('category.update');
        const re: WriteResult = await route.run({ id: 'apple', title: 'title updated', description: 'description updated' });
        assert.equal(typeof re.writeTime.seconds === 'number', true);

    });

    it('Delete the category', async () => {
        const route = new Router('category.delete');
        const re: WriteResult = await route.run({ id: 'apple', title: 'title updated', description: 'description updated' });
        assert.equal(typeof re.writeTime.seconds === 'number', true);

    });


});




