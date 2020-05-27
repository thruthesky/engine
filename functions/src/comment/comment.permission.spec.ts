import { loginAsAdmin, loginAsUser, forceUserLogout } from "../helpers/global-functions";
import { Router } from "../router/router";
import { CategoryDatas } from "../category/category.interfaces";
import * as assert from 'assert';
import { PostData } from "../post/post.interfaces";
import { CommentData } from "./comment.interfaces";
import { LOGIN_FIRST, PERMISSION_DEFINED } from "../defines";


let postId = '';
describe('Comment permission test', function () {
    this.timeout(10000);

    it('Create category and post', async () => {


        // ===========> Create a category
        await loginAsAdmin();
        const tempCategory = {
            id: 'temp-category-id-for-comment-' + (new Date).getTime(),
            title: 'Temp Category',
        };
        const routerCategory = new Router('category.create');
        const re: CategoryDatas = await routerCategory.run({ id: tempCategory.id, title: tempCategory.title });
        // console.log(re);
        assert.equal(re.id, tempCategory.id);

        // ==========> Create a post
        await loginAsUser(0, true);
        const route = new Router('post.create');
        const post: PostData = await route.run<PostData>({ categories: [tempCategory.id], });
        // console.log(post);
        assert.equal(typeof post.id === 'string', true);

        postId = post.id!;

    });

    it('Create comment without login', async () => {
        forceUserLogout();
        const content = 'comment content!';
        const routerComent = new Router('comment.create');
        const re = await routerComent.run<CommentData>({
            postId: postId,
            content: content,
        });
        assert.equal(re.code, LOGIN_FIRST);
    });


    it('Create a comment as test user 1 and try to update as test user 2', async () => {
        await loginAsUser(0);
        const content = 'comment content!';
        const routerComent = new Router('comment.create');
        let re = await routerComent.run<CommentData>({
            postId: postId,
            content: content,
        });
        // console.log(re);
        assert.equal(re.postId, postId);

        await loginAsUser(1, true);

        const routerComentUpdate = new Router('comment.update');
        re = await routerComentUpdate.run<CommentData>({
            id: re.id,
            content: content,
        });
        // console.log('re: ---')
        // console.log(re);
        assert.equal(re.code, PERMISSION_DEFINED);
    });

});