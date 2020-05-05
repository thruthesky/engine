require('../src/init-firebase');
var assert = require('assert');

var user = require('../src/user');
var interface = require('../src/interface');

describe('Interface', () => {
    it('No user by that name', async () => {
        try {
            await user.get('wrong user');
            assert.fail('must fail');
        } catch(e) {
            assert.equal(e.message, 'no_user_by_that_name');
        }
    })

    it('add user', async () => {
        const newUser = { name: 'test user name', age: 24 };
        await user.add(newUser);
        added = await user.get(newUser.name);
        assert.equal(added.name, newUser.name);
    });
});