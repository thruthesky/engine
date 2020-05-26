import { loginAsAdmin, loginAsUser, testCreateComment } from "../helpers/global-functions";
import { Router } from "../router/router";
import { CategoryDatas } from "../category/category.interfaces";
import * as assert from 'assert';
import { PostData } from "./post.interfaces";

describe('Get comments by listing posts', function () {
    this.timeout(20000);
    it('Create a post & some comments, then get them by listing posts', async () => {


        // ===========> Create a category
        await loginAsAdmin();
        const tempCategory = {
            id: 'temp-category-id-for-comment-' + (new Date).getTime(),
            title: 'Temp Category',
        };

        const routerCategory = new Router('category.create');
        const re: CategoryDatas = await routerCategory.run({ id: tempCategory.id, title: tempCategory.title });
        assert.equal(typeof re.id === 'string', true);
        assert.equal(re.id, tempCategory.id);

        // ==========> Create a post
        await loginAsUser();
        const route = new Router('post.create');
        const post: PostData = await route.run<PostData>({ categories: [tempCategory.id] });
        assert.equal(typeof post.id === 'string', true);

        // 
        const a = await testCreateComment(post.id!, 'A');
        const b = await testCreateComment(post.id!, 'B');
        const c = await testCreateComment(post.id!, 'C');
        const aa = await testCreateComment(post.id!, 'AA', a.id);
        const ba = await testCreateComment(post.id!, 'BA', b.id);
        const ca = await testCreateComment(post.id!, 'CA', c.id);
        const baa = await testCreateComment(post.id!, 'BAA', ba.id);
        const bb = await testCreateComment(post.id!, 'BB', b.id);
        const bab = await testCreateComment(post.id!, 'BAB', ba.id);

        aa; ba; ca; baa; bb; bab;

        const expectedArr = [
            'A',
            'AA',
            'B',
            'BA',
            'BAA',
            'BAB',
            'BB',
            'C',
            'CA'
        ];
        
        /// Read comments by getting posts of the category
        const postListRouter = new Router('post.list');
        const posts: PostData[] = await postListRouter.run({
            categories: [tempCategory.id],
            includeComments: true,
        });

        if ((posts as any).error === true && (posts as any).code.indexOf('FAILED_PRECONDITION') > 0 ) {
            console.log(posts);
        }
        assert.equal(posts.length, 1);
        const comments = posts[0].comments;
        assert.equal(comments?.length, expectedArr.length);

    });
});
