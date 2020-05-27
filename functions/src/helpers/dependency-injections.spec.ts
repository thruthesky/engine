
import * as assert from 'assert';
import {
    loginAsAdmin, loginAsUser,
} from "./global-functions";
import { Router } from '../router/router';
import { CategoryDatas } from '../category/category.interfaces';
import { PostData } from '../post/post.interfaces';
import { CommentData } from '../comment/comment.interfaces';
import { PROPERTY_NOT_EXISTS, VALUE_NOT_EXISTS } from '../defines';



let categoryId: any;
let userId: any;
let postId: any;

describe('Dependency Injection Functions', function () {
    this.timeout(10000);

    it('Category.addUrl & Category.removeUrl', async () => {

        // ===========> Create a category & test
        await loginAsAdmin();
        const tempCategory = {
            id: 'temp-category-id-for-comment-' + (new Date).getTime(),
            title: 'Temp Category',
        };

        let added;

        const routerCategory = new Router('category.create');
        const re: CategoryDatas = await routerCategory.run({ id: tempCategory.id, title: tempCategory.title });
        categoryId = re.id;
        assert.equal(typeof categoryId === 'string', true);
        assert.equal(categoryId, tempCategory.id);


        const propertyNotExistsRouter = new Router('category.removeUrl');
        added = await propertyNotExistsRouter.run({ id: categoryId, url: '....property-not-exists' });
        // console.log(added);
        assert.equal(added.code, PROPERTY_NOT_EXISTS);


        const addUrlOnCategory = new Router('category.addUrl');
        added = await addUrlOnCategory.run({ id: categoryId, url: 'url1' });
        added = await addUrlOnCategory.run({ id: categoryId, url: 'url2' });
        added = await addUrlOnCategory.run({ id: categoryId, url: 'url3' });


        assert.equal(added.urls.length, 3);
        assert.equal(added.urls[0], 'url1');
        assert.equal(added.urls[1], 'url2');
        assert.equal(added.urls[2], 'url3');


        const deleteRouter = new Router('category.removeUrl');
        added = await deleteRouter.run({ id: categoryId, url: 'url-xxxx' });

        assert.equal(added.code, VALUE_NOT_EXISTS);


        added = await deleteRouter.run({ id: categoryId, url: 'url2' });
        assert.equal(added.urls.length, 2);
        assert.equal(added.urls[0], 'url1');
        assert.equal(added.urls[1], 'url3');

    });

    it('User.addUrl & User.removeUrl', async () => {

        // User register & test

        const router = new Router('user.register');

        const req = {
            email: (new Date).getTime() + '@email.com',
            password: '12345a',
            name: 'David'
        };

        const createdUser = await router.run(req);
        assert.equal(createdUser.error === void 0, true);
        assert.equal(createdUser.email, req.email);

        userId = createdUser.uid;

        const userFileRouter = new Router('user.addUrl');
        let addedOnUsers = await userFileRouter.run({ id: userId, url: 'url1' });
        addedOnUsers = await userFileRouter.run({ id: userId, url: 'url2' });

        assert.equal(addedOnUsers.urls.length, 2);
        assert.equal(addedOnUsers.urls[0], 'url1');
        assert.equal(addedOnUsers.urls[1], 'url2');



        let re;
        const deleteRouter = new Router('user.removeUrl');
        re = await deleteRouter.run({ id: userId, url: 'url-xxxx' });

        // console.log(re);
        assert.equal(re.code, VALUE_NOT_EXISTS);

        // console.log(re);
        re = await deleteRouter.run({ id: userId, url: 'url2' });
        assert.equal(re.urls.length, 1);
        assert.equal(re.urls[0], 'url1');

    });

    it('Post.addUrl & Post.removeUrl', async () => {

        await loginAsUser();
        // ==========> Create a post
        const route = new Router('post.create');
        const post: PostData = await route.run<PostData>({ categories: [categoryId], });
        assert.equal(typeof post.id === 'string', true);

        postId = post.id;

        const userFileRouter = new Router('post.addUrl');
        let added = await userFileRouter.run({ id: postId, url: 'url1' });
        added = await userFileRouter.run({ id: postId, url: 'url2' });

        assert.equal(added.urls.length, 2);
        assert.equal(added.urls[0], 'url1');
        assert.equal(added.urls[1], 'url2');



        let re;
        const deleteRouter = new Router('post.removeUrl');
        re = await deleteRouter.run({ id: postId, url: 'url-xxxx' });
        assert.equal(re.code, VALUE_NOT_EXISTS);
        re = await deleteRouter.run({ id: postId, url: 'url2' });
        assert.equal(re.urls.length, 1);
        assert.equal(re.urls[0], 'url1');


    });


    it('Comment.addUrl & Comment.removeUrl', async () => {


        await loginAsUser();

        // ==========> Create a comment

        const content = 'comment content!';
        const routerComent = new Router('comment.create');
        const comment: CommentData = await routerComent.run<CommentData>({
            postId: postId,
            content: content,
        });
        // console.log(comment);
        assert.equal(typeof comment.id === 'string', true);
        assert.equal(typeof comment.createdAt === 'number', true);
        // assert.equal(comment.uid, TestSettings.uids[0]);
        assert.equal(comment.content, content);



        const userFileRouter = new Router('comment.addUrl');
        let added = await userFileRouter.run({ id: comment.id, url: 'url1' });
        added = await userFileRouter.run({ id: comment.id, url: 'url2' });

        assert.equal(added.urls.length, 2);
        assert.equal(added.urls[0], 'url1');
        assert.equal(added.urls[1], 'url2');



        let re;
        const deleteRouter = new Router('comment.removeUrl');
        re = await deleteRouter.run({ id: comment.id, url: 'url-xxxx' });
        assert.equal(re.code, VALUE_NOT_EXISTS);
        re = await deleteRouter.run({ id: comment.id, url: 'url2' });
        assert.equal(re.urls.length, 1);
        assert.equal(re.urls[0], 'url1');


        re = await deleteRouter.run({ id: comment.id, url: 'url1' });
        assert.equal(re.urls.length, 0);
    });
});




