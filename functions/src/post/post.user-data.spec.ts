import { testCreateCategory, testCreatePost } from "../helpers/global-functions";

import * as assert from 'assert';
import { admin } from "../init/init.firebase";
import { EngineSettings, TestSettings } from "../settings";


describe('Adding user data to post & comment', () => {
    it('Create a post and add user data.', async () => {
        const category = await testCreateCategory(); /// This loggs in as admin
        const post = await testCreatePost(TestSettings.emails[0], [category.id]);
        // console.log(post);
        const adminUser = await admin().auth().getUserByEmail(EngineSettings.adminEmails[0]);
        assert.equal(post.displayName, adminUser.displayName);
    });
});
