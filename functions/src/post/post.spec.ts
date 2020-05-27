
import { Router } from "../router/router";
import * as assert from 'assert';
// import { Settings } from "../helper";
import {  CATEGORY_NOT_EXISTS, MISSING_INPUT, INVALID_INPUT,
     POST_TITLE_DELETED, POST_CONTENT_DELETED,
      LOGIN_FIRST } from "../defines";
import { System } from "../system/system";
import { TestSettings } from "../settings";
import { forceUserLoginByEmail, forceUserLogout, loginAsAdmin, loginAsUser } from "../helpers/global-functions";
import { CategoryDatas, CategoryData } from "../category/category.interfaces";
import { PostData } from './post.interfaces';

// import { WriteResult } from "@google-cloud/firestore";
// import { System } from "../system/system";
// import { EngineSettings } from "../settings";
// import { System } from "../system/system";



describe('Post', function () {
    this.timeout(100000);

    forceUserLogout();
    System.debug = true;

    const tempCategory = {
        id: 'temp-category-id' + (new Date).getTime(),
        title: 'Temp Category',
    };

    it('Create permission denied', async () => {
        forceUserLogout();
        const route = new Router('post.create');
        const re = await route.run({});
        assert.equal(re.code, LOGIN_FIRST);
    });

    it('Create with empty category', async () => {
        await forceUserLoginByEmail(TestSettings.emails[0]);
        System.auth.email
        const route = new Router('post.create');
        const re = await route.run({});
        assert.equal(re.code, MISSING_INPUT);
        assert.equal(re.message, 'categories');
    });
    
    it('Create with string category', async () => {
        await forceUserLoginByEmail(TestSettings.emails[0]);
        System.auth.email
        const route = new Router('post.create');
        const re = await route.run({ categories: 'wrong-category-name' });
        assert.equal(re.code, INVALID_INPUT);
        assert.equal(re.message, 'categories');
    });

    it('Create with wrong category', async () => {
        await forceUserLoginByEmail(TestSettings.emails[0]);
        System.auth.email
        const route = new Router('post.create');
        const re = await route.run({ categories: ['wrong-category-name'] });
        assert.equal(re.code, CATEGORY_NOT_EXISTS);
    });

    it('Create with two category. One exists, one non-exists.', async () => {

        // ===========> Create a category
        await loginAsAdmin();
        const routerCategory = new Router('category.create');
        let re: CategoryDatas = await routerCategory.run({ id: tempCategory.id, title: tempCategory.title });
        assert.equal(typeof re.id === 'string', true);
        assert.equal(re.id, tempCategory.id);


        await forceUserLoginByEmail(TestSettings.emails[0]);
        System.auth.email
        const route = new Router('post.create');
        re = await route.run({ categories: [tempCategory.id, 'non-existing-category-id-xx'] });

        assert.equal(re.code, CATEGORY_NOT_EXISTS);
        assert.equal(re.message, 'non-existing-category-id-xx');
    });


    it('Create a post', async () => {

        // ===========> Create another category
        await loginAsAdmin();
        const routerCategory = new Router('category.create');
        const re: CategoryData = await routerCategory.run({ id: tempCategory.id + 'another', title: tempCategory.title });
        assert.equal(typeof re.id === 'string', true);
        assert.equal(re.id === tempCategory.id + 'another', true);


        // #1. Create a post
        await loginAsUser();
        const route = new Router('post.create');
        const post: PostData = await route.run<PostData>({ categories: [tempCategory.id, tempCategory.id + 'another'], });
        
        // console.log(post);k
        assert.equal(typeof post.id === 'string', true);
        assert.equal(typeof post.createdAt === 'number', true);
    });


    it('Update a post', async () => {

        /// #2. Create a post
        await loginAsUser();
        const route = new Router('post.create');
        const post: PostData = await route.run<PostData>({ categories: [tempCategory.id], title: 'hi' });
        assert.equal(typeof post.id === 'string', true);
        assert.equal(post.title, 'hi');

        // console.log(post);

        const updateRouter = new Router('post.update');
        const updated: PostData = await updateRouter.run<PostData>({ id: post.id, title: 'yo' });
        assert.equal(typeof post.id === 'string', true);
        assert.equal(updated.title, 'yo');
        assert.equal(post.id, updated.id);
    });

    it('Get posts', async () => {
        const router = new Router('post.list');
        const re = await router.run();
        // console.log(re);
        assert.equal(re.length > 0, true);
    });


    it('search category with empty string', async () => {
        const router = new Router('post.list');
        const re = await router.run({ categories: '' });
        assert.equal(re.code, INVALID_INPUT);
        assert.equal(re.message, 'categories');
    });


    it('Get posts with a category', async () => {
        const router = new Router('post.list');
        const re = await router.run({ categories: [tempCategory.id, tempCategory.id + 'another'], limit: 10000 });
        // console.log(re);
        assert.equal(re.length === 2, true);
    });



    it('Delete a post', async () => {
        const router = new Router('post.list');
        const re = await router.run({ categories: [tempCategory.id, tempCategory.id + 'another'] });
        assert.equal(typeof re[0]['uid'] === 'string', true);

        const id = re[0]['id'];
        const routerDel = new Router('post.delete');
        const deleted: PostData = await routerDel.run(id);

        assert.equal(id, deleted.id);
        assert.equal(deleted.title, POST_TITLE_DELETED);
        assert.equal(deleted.content, POST_CONTENT_DELETED);
        assert.equal(deleted.deletedAt !== void 0, true);

    });


});
