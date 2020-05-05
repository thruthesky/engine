
import { Router } from '../router/router';
import * as assert from 'assert';
import { AUTH_EMAIL_ALREADY_EXISTS, USER_NOT_EXIST } from '../defines';
// import { WRONG_CLASS_NAME, WRONG_METHOD_NAME } from '../defines';
// import { User } from './user';


const id = (new Date).getTime();
const email = `abc${id}@test.com`;
const password = `12345ax,*~A`;
let uid: string;

describe('User', () => {
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
            const updatedUser = await router.run(req);
            // console.log(`User create success. UID: ${updatedUser.uid}`);
            assert.equal(updatedUser.uid, req.uid);
            assert.equal(updatedUser.name, req.name);
        } catch (e) {
            assert.equal(e.message, AUTH_EMAIL_ALREADY_EXISTS);
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
            assert.equal(e.message, USER_NOT_EXIST);
        }
    })
});



