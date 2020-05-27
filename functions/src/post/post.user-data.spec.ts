import { testCreateCategory, testCreatePost, testUpdateUser, getRandomInt, testCreateComment } from "../helpers/global-functions";

import * as assert from 'assert';
import { admin } from "../init/init.firebase";
import { EngineSettings, TestSettings } from "../settings";


describe('Adding user data to post & comment', function () {
    this.timeout(20000);
    it('Create a post and a comment. And test user data.', async () => {
        const category = await testCreateCategory(); /// This loggs in as admin
        const post = await testCreatePost(TestSettings.emails[0], [category.id]); /// Create post as user
        const testUser = await admin().auth().getUserByEmail(TestSettings.emails[0]); // Get user data
        const adminUser = await admin().auth().getUserByEmail(EngineSettings.adminEmails[0]);
        assert.equal(post.displayName, testUser.displayName);
        assert.notDeepEqual(post.displayName, adminUser.displayName);

        const url: string = 'https://photourl.com/test' + getRandomInt(1, 9900000) + '.jpg';
        await testUpdateUser({ uid: testUser.uid, photoURL: url });
        const post2 = await testCreatePost(TestSettings.emails[0], [category.id]);
        assert.notEqual(post.photoUrl, post2.photoUrl);

        const updatedUser = await admin().auth().getUserByEmail(TestSettings.emails[0]); // Get updated user data
        assert.equal(post2.photoUrl, updatedUser.photoURL);

        const comment = await testCreateComment(post.id!, '...');
        assert.equal(comment.displayName, updatedUser.displayName);
        assert.equal(comment.photoUrl, updatedUser.photoURL);
    });
});
