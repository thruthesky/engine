import { loginAsAdmin, loginAsUser, testCreateCategory, testCreatePost, testCreateComment } from "../helpers/global-functions";
import { Router } from "../router/router";
import { EngineSettings } from "../settings";


describe('Like test', () => {


    it('Create post and commnet and do like/dislike test', async () => {

        const category = await testCreateCategory();
        const post = await testCreatePost(EngineSettings.adminEmails[0], [category.id]);
        const comment = await testCreateComment(post.id as string, 'commnet like test');

        // like
        const like = new Router('post.')

        loginAsAdmin();

    });
});
