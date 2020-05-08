
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
        try {
            const route = new Router('category.create');
            await route.run();
        } catch (e) {
            assert.equal(e.message, PERMISSION_DEFINED);
        }
    });

    it('Empty input', async () => {

        System.auth.email = EnginSettings.adminEmails[0];
        try {
            const route = new Router('category.create');
            await route.run();
        } catch (e) {
            assert.equal(e.message, INPUT_IS_EMPTY);
        }
    });

    it('Id check', async () => {
        try {
            const route = new Router('category.create');
            await route.run({ description: 'yo' });
        } catch (e) {
            assert.equal(e.message, ID_IS_EMPTY);
        }
    });
    it('Title check', async () => {
        try {
            const route = new Router('category.create');
            await route.run({ id: 'apple', description: 'yo' });
        } catch (e) {
            assert.equal(e.message, TITLE_IS_EMPTY);
        }
    });

    it('Create a category', async () => {
        try {
            const route = new Router('category.create');
            const re: WriteResult = await route.run({ id: 'apple', title: 'apple', description: 'yo' });
            assert.equal(typeof re.writeTime.seconds === 'number', true);
        } catch (e) {
            assert.fail();
        }
    });

    it('Update the category', async () => {
        try {
            const route = new Router('category.update');
            const re: WriteResult = await route.run({ id: 'apple', title: 'title updated', description: 'description updated' });
            assert.equal(typeof re.writeTime.seconds === 'number', true);
        } catch (e) {
            assert.fail(e.message);
        }
    });

    it('Delete the category', async () => {
        try {
            const route = new Router('category.delete');
            const re: WriteResult = await route.run({ id: 'apple', title: 'title updated', description: 'description updated' });
            assert.equal(typeof re.writeTime.seconds === 'number', true);
        } catch (e) {
            assert.fail(e.message);
        }
    });


});




