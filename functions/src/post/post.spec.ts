
import { Router } from "../router/router";
import * as assert from 'assert';
// import { Settings } from "../helper";
import { PERMISSION_DEFINED, CATEGORY_NOT_EXISTS, MISSING_INPUT, INVALID_INPUT } from "../defines";
import { System } from "../system/system";
import { TestSettings } from "../settings";
import { forceUserLoginByEmail, forceUserLogout, setAdminLogin } from "../helpers/global-functions";
// import { WriteResult } from "@google-cloud/firestore";
// import { System } from "../system/system";
// import { EnginSettings } from "../settings";
// import { System } from "../system/system";



describe('Post', function () {
    this.timeout(10000);

    forceUserLogout();
    System.debug = true;

    const tempCategory = {
        id: 'temp-category-id' + (new Date).getTime(),
        title: 'Temp Category',
    };

    it('Create permission denied', async () => {

        const route = new Router('post.create');
        const re = await route.run({});
        assert.equal(re.code, PERMISSION_DEFINED);

    });

    it('Create with empty category', async () => {
        await forceUserLoginByEmail(TestSettings.testUserEmail);
        System.auth.email
        const route = new Router('post.create');
        const re = await route.run({});
        assert.equal(re.code, MISSING_INPUT);
        assert.equal(re.message, 'categories');
    });
    it('Create with string category', async () => {
        await forceUserLoginByEmail(TestSettings.testUserEmail);
        System.auth.email
        const route = new Router('post.create');
        const re = await route.run({ categories: 'wrong-category-name' });
        assert.equal(re.code, INVALID_INPUT);
        assert.equal(re.message, 'categories');
    });

    it('Create with wrong category', async () => {
        await forceUserLoginByEmail(TestSettings.testUserEmail);
        System.auth.email
        const route = new Router('post.create');
        const re = await route.run({ categories: ['wrong-category-name'] });
        assert.equal(re.code, CATEGORY_NOT_EXISTS);
    });

    it('Create with two category. One exists, one non-exists.', async () => {

        // ===========> Create a category
        setAdminLogin();
        const routerCategory = new Router('category.create');
        let re: any = await routerCategory.run({ id: tempCategory.id, title: tempCategory.title });
        assert.equal(typeof re.writeTime.seconds === 'number', true);


        await forceUserLoginByEmail(TestSettings.testUserEmail);
        System.auth.email
        const route = new Router('post.create');
        re = await route.run({ categories: [tempCategory.id, 'non-existing-category-id'] });
        assert.equal(re.code, CATEGORY_NOT_EXISTS);
        assert.equal(re.message, 'non-existing-category-id');
    });


    it('Create a post', async () => {

        // ===========> Create another category
        setAdminLogin();
        const routerCategory = new Router('category.create');
        let re: any = await routerCategory.run({ id: tempCategory.id + 'another', title: tempCategory.title });
        assert.equal(typeof re.writeTime.seconds === 'number', true);


        await forceUserLoginByEmail(TestSettings.testUserEmail);
        System.auth.email
        const route = new Router('post.create');
        re = await route.run({ categories: [tempCategory.id, tempCategory.id + 'another'] });
        // console.log('re', re);
        assert.equal(re?.code === void 0, true);
        assert.equal(typeof re?.id === 'string', true);
    });


    it('Get posts', async () => {
        const router = new Router('post.list');
        let re = await router.run();
        assert.equal(re.length > 0, true);
    });


    it('search category with empty string', async () => {
        const router = new Router('post.list');
        let re = await router.run({ categories: '' });
        assert.equal(re.code, INVALID_INPUT);
        assert.equal(re.message, 'categories');
    });


    it('Get posts with a category', async () => {
        const router = new Router('post.list');
        let re = await router.run({ categories: [tempCategory.id, tempCategory.id + 'another'] });
        assert.equal(re.length == 1, true);
    });

});
