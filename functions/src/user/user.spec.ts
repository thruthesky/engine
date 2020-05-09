
import { Router } from '../router/router';
import * as assert from 'assert';
import { AUTH_EMAIL_ALREADY_EXISTS, EMAIL_NOT_PROVIDED, PASSWORD_NOT_PROVIDED, AUTH_USER_NOT_FOUND } from '../defines';
// import { User } from './user';
import { admin } from '../init/init.firebase';
import { getRandomInt } from '../helpers/global-functions';
// import { WRONG_CLASS_NAME, WRONG_METHOD_NAME } from '../defines';
// import { User } from './user';


const id = (new Date).getTime();
const email = `abc${id}@test.com`;
const password = `12345ax,*~A`;
let uid: string;

describe('User', function () {
    this.timeout(10000);
    it('Register input test', async () => {
        let router = new Router('user.register');
        try {
            const req = {
                name: 'David'
            };
            await router.run(req);
            assert.fail('must be thrown');
        } catch (e) {
            assert.equal(e.message, EMAIL_NOT_PROVIDED);
        }

        router = new Router('user.register');
        try {
            const req = {
                email: 'this@email.com',
                name: 'David'
            };
            await router.run(req);
            assert.fail();
        } catch (e) {
            assert.equal(e.message, PASSWORD_NOT_PROVIDED);
        }
    });
    it('Register', async () => {
        const router = new Router('user.register');
        try {
            const req = {
                email: email,
                password: password,
                name: 'David'
            };
            const createdUser = await router.run(req);
            assert.equal(createdUser.email, req.email);
            uid = createdUser.uid;
            // trace('register: uid', uid);
        } catch (e) {
            assert.fail(e.message);
        }
    });


    it('Email exists.', async () => {
        const router = new Router('user.register');
        try {
            const req = {
                email: email,
                password: password,
            };
            const createdUser = await router.run(req);
            // console.log(`User create success. UID: ${createdUser.uid}`);
            assert.equal(createdUser.email, req.email);
        } catch (e) {
            assert.equal(e.message, AUTH_EMAIL_ALREADY_EXISTS);
        }
    });


    it('User update.', async () => {
        const router = new Router('user.update');
        try {
            const req = {
                uid: uid,
                name: 'Updated name',
                birthday: '1973-10-16'
            };
            // console.log(req);
            const updatedUser = await router.run(req);
            // console.log(`User create success. UID: ${updatedUser.uid}`);
            assert.equal(updatedUser.uid, req.uid);
            assert.equal(updatedUser.name, req.name);
        } catch (e) {
            assert.fail('Must success');
        }
    });

    /**
     * Deletes the user which registered above.
     */
    it('User delete', async () => {
        const router = new Router('user.delete');
        try {
            const deletedUid = await router.run(uid);
            assert.equal(deletedUid, deletedUid);
            const routerData = new Router('user.data');
            const deletedUser = await routerData.run(uid);
            assert.fail('Code should not come here: ', deletedUser);
        } catch (e) {
            assert.equal(e.message, AUTH_USER_NOT_FOUND);
        }
    });

    it('User displayName & phoneNumber update', async () => {
        const newEmail = `new${email}`;
        const router = new Router('user.register');
        try {
            const req = {
                email: newEmail,
                password: password,
                displayName: 'displayName',
                photoURL: 'https://this.ismy.com/photo.jpg',
                phoneNumber: '+82-10-' + getRandomInt(1000, 9999) + '-' + getRandomInt(1000, 9999),
                name: 'David'
            };
            const back = Object.assign({}, req); /// backup since it will be deleted by call-by-reference
            const createdUser = await router.run(req);
            assert.equal(createdUser.email, req.email);
            uid = createdUser.uid;

            const gotUser = await admin().auth().getUser(uid);
            assert.equal(gotUser.email, req.email);
            assert.equal(gotUser.displayName, back.displayName);
            assert.equal(gotUser.phoneNumber, back.phoneNumber.split('-').join(''));
            assert.equal(gotUser.photoURL, back.photoURL);

            const updateReq = {
                uid: uid,
                displayName: 'newDisplayName',
                phoneNumber: '+82-10-' + getRandomInt(1000, 9999) + '-' + getRandomInt(1000, 9999),
                photoURL: 'https://thisis.newphoto.com/url.jpg',
                name: 'newName',
            };


            const updateReqBack = Object.assign({}, updateReq); /// backup since it will be deleted by call-by-reference
            const newRouter = new Router('user.update');
            const updatedUser = await newRouter.run(updateReq);

            assert.equal(updatedUser.email, req.email);
            assert.equal(updatedUser.displayName, updateReqBack.displayName);
            assert.equal(updatedUser.phoneNumber, updateReqBack.phoneNumber.split('-').join(''));
            assert.equal(updatedUser.photoURL, updateReqBack.photoURL);


            // console.log(gotUser);

            // const user = new User();
            // const data = await user.data(uid);
            // console.log(data);

        } catch (e) {
            assert.fail(e.message);
        }
    });
});



