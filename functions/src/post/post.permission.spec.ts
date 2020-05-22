import { loginAsAdmin, loginAsUser, forceUserLogout } from "../helpers/global-functions";
import { Router } from "../router/router";
import { CategoryDatas } from "../category/category.interfaces";
import * as assert from 'assert';
import { PostData } from "../post/post.interfaces";
import { LOGIN_FIRST, PERMISSION_DEFINED } from "../defines";

let categoryId = '';
describe('Post permission test', function () {
    this.timeout(10000);

    it('Create category', async () => {


        // ===========> Create a category
        await loginAsAdmin();
        const tempCategory = {
            id: 'temp-category-id-for-comment-' + (new Date).getTime(),
            title: 'Temp Category',
        };
        const routerCategory = new Router('category.create');
        const re: CategoryDatas = await routerCategory.run({ id: tempCategory.id, title: tempCategory.title });
        assert.equal(re.id, tempCategory.id);
        categoryId = tempCategory.id;

    });

    it('Create a post without login', async () => {

        // ==========> Create a post
        forceUserLogout();
        const route = new Router('post.create');
        const re = await route.run<PostData>({ categories: [categoryId], });
        assert.equal(re.code, LOGIN_FIRST);

    })

    it('Create a post as test user 1 and update as user 2', async () => {

        // ==========> Create a post
        await loginAsUser();
        const route = new Router('post.create');
        const post: PostData = await route.run<PostData>({ categories: [categoryId], });
        assert.equal(typeof post.id === 'string', true);
        await loginAsUser(1);
        const routeUpdate = new Router('post.update');
        const re = await routeUpdate.run<PostData>({ id: post.id, });
        assert.equal(re.code, PERMISSION_DEFINED);


    })

});