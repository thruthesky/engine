import { testCreateCategory, testCreatePost, testCreateComment, forceUserLoginByEmail } from "../helpers/global-functions";
import { Router } from "../router/router";
import { EngineSettings, TestSettings } from "../settings";
import { LikeRequest, LikeResponse } from "../defines";

import * as assert from 'assert';


describe('Like test', function () {
    this.timeout(20000);

    it('Create a post and do like/dislike test', async () => {

        const category = await testCreateCategory(); /// create category as admin
        const post = await testCreatePost(EngineSettings.adminEmails[0], [category.id]); // create a post as admin
        // const comment = await testCreateComment(post.id as string, 'commnet like test');

        // like router
        const likeRouter = new Router('post.like');

        /// expect like 1
        let re: LikeResponse = await likeRouter.run<LikeRequest>({ id: post.id!, vote: 'like' });
        assert.equal(re.likes, 1);
        assert.equal(re.dislikes, 0);


        /// expect likes to 0. cancellation
        re = await likeRouter.run<LikeRequest>({ id: post.id!, vote: 'like' });
        assert.equal(re.likes, 0);
        assert.equal(re.dislikes, 0);


        /// expect dislike 1
        re = await likeRouter.run<LikeRequest>({ id: post.id!, vote: 'dislike' });
        assert.equal(re.likes, 0);
        assert.equal(re.dislikes, 1);


        /// expect dislike 0. cancel dislike.
        re = await likeRouter.run<LikeRequest>({ id: post.id!, vote: 'dislike' });
        assert.equal(re.likes, 0);
        assert.equal(re.dislikes, 0);



        /// expect like 1. like again
        re = await likeRouter.run<LikeRequest>({ id: post.id!, vote: 'like' });
        // console.log(re);
        assert.equal(re.likes, 1);
        assert.equal(re.dislikes, 0);


        /// expect like 0, dislike 1. change vote.
        re = await likeRouter.run<LikeRequest>({ id: post.id!, vote: 'dislike' });
        // console.log(re);
        assert.equal(re.likes, 0);
        assert.equal(re.dislikes, 1);

        /// login as user
        await forceUserLoginByEmail(TestSettings.emails[0]);



        /// expect likes 1. dislikes 1.
        re = await likeRouter.run<LikeRequest>({ id: post.id!, vote: 'like' });
        // console.log(re);
        assert.equal(re.likes, 1);
        assert.equal(re.dislikes, 1);



        /// expect likes 0. dislikes 2. change vote from like to dislike
        re = await likeRouter.run<LikeRequest>({ id: post.id!, vote: 'dislike' });
        // console.log(re);
        assert.equal(re.likes, 0);
        assert.equal(re.dislikes, 2);

    });

    it('Create a comment and do like/dislike test', async () => {

        const category = await testCreateCategory(); /// create category as admin
        const post = await testCreatePost(EngineSettings.adminEmails[0], [category.id]); // create a post as admin
        const comment = await testCreateComment(post.id as string, 'commnet like test');
        assert.notEqual(comment, null);

        // like router
        const commentRouter = new Router('comment.like');

        /// expect like 1
        let re: LikeResponse = await commentRouter.run<LikeRequest>({ id: comment.id!, vote: 'like' });
        // console.log(re);
        assert.equal(re.likes, 1);
        assert.equal(re.dislikes, 0);

        await forceUserLoginByEmail(TestSettings.emails[0]);

        /// expect like 2
        re = await commentRouter.run<LikeRequest>({ id: comment.id!, vote: 'like' });
        // console.log(re);
        assert.equal(re.likes, 2);
        assert.equal(re.dislikes, 0);


        await forceUserLoginByEmail(TestSettings.emails[1]);

        /// expect like 3
        re = await commentRouter.run<LikeRequest>({ id: comment.id!, vote: 'like' });
        // console.log(re);
        assert.equal(re.likes, 3);
        assert.equal(re.dislikes, 0);


        /// expect like 2, dislikes 1.
        re = await commentRouter.run<LikeRequest>({ id: comment.id!, vote: 'dislike' });
        // console.log(re);
        assert.equal(re.likes, 2);
        assert.equal(re.dislikes, 1);


    });
});
