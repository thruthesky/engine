
import { WriteResult } from '@google-cloud/firestore';

import { Router } from "../router/router";
import * as assert from 'assert';
// import { Settings } from "../helper";
import { PERMISSION_DEFINED, TITLE_IS_EMPTY, INPUT_IS_EMPTY, ID_IS_EMPTY, CATEGORY_ALREADY_EXISTS } from "../defines";
import { System } from "../system/system";
import { EnginSettings } from "../settings";
import { CategoryData } from './category.interfaces';
// import { System } from "../system/system";



describe('Category', function () {

    const categoryId = 'cat-' + (new Date).getTime();

    this.timeout(10000);
    it('Admin check', async () => {
        const route = new Router('category.create');
        const re = await route.run();
        assert.equal(re.code, PERMISSION_DEFINED);
    });

    it('Category create without input', async () => {

        System.auth.email = EnginSettings.adminEmails[0];
        const route = new Router('category.create');
        const re = await route.run();
        assert.equal(re.code, INPUT_IS_EMPTY);
    });


    it('Category create with empty string on id', async () => {
        System.auth.email = EnginSettings.adminEmails[0];
        const route = new Router('category.create');
        const re = await route.run({ id: '' });
        assert.equal(re.code, ID_IS_EMPTY);
    });
    it('Category create with empty string on title', async () => {
        System.auth.email = EnginSettings.adminEmails[0];
        const route = new Router('category.create');
        const re = await route.run({ id: 'aa', title: '' });
        assert.equal(re.code, TITLE_IS_EMPTY);
    });

    it('Create category with empty string on both of id and title', async () => {

        const route = new Router('category.create');
        const re = await route.run({ description: 'yo' });
        assert.equal(re.code, ID_IS_EMPTY);

    });
    // it('Title check', async () => {
    //     const route = new Router('category.create');
    //     const re = await route.run({ id: 'apple', description: 'yo' });
    //     assert.equal(re.code, TITLE_IS_EMPTY);
    // });

    it('Create a category', async () => {
        const route = new Router('category.create');
        const re: CategoryData = await route.run({ id: categoryId, title: 'apple', description: 'yo' });
        // assert.equal(typeof re.writeTime.seconds === 'number', true);
        // console.log(re);
        assert.equal(re.id, categoryId);
        assert.equal(re.title, 'apple');
    });

    it('Create category that is already exists.', async () => {
        const route = new Router('category.create');
        const re = await route.run({ id: categoryId, title: 'apple', description: 'yo' });
        assert.equal(re.code, CATEGORY_ALREADY_EXISTS);
    });

    it('Update the category', async () => {
        const route = new Router('category.update');
        const re: CategoryData = await route.run<CategoryData>({ id: categoryId, title: 'title updated', description: 'description updated' });
        // assert.equal(typeof re.writeTime.seconds === 'number', true);

        assert.equal(re.id, categoryId);
        assert.equal(re.title, 'title updated');
    });


    it('Category list', async () => {
        const router = new Router('category.list');
        const re = await router.run();

        let found = false;
        for (const id of Object.keys(re)) {
            if (id === categoryId) {
                found = true;
                break;
            }
        }
        assert.equal(found, true);
        assert.equal(Object.keys(re).length > 0, true);
    })

    it('Delete the category', async () => {
        const route = new Router('category.delete');
        const re: WriteResult = await route.run({ id: categoryId, title: 'title updated', description: 'description updated' });
        assert.equal(typeof re.writeTime.seconds === 'number', true);

    });


});




