'use strict';

const _ = require('lodash');
const { assert: assert1 } = require('chai');
const assert = assert1;
const fixtures = require('./fixtures.json');
const suite = require('mocha').suite;
const UserService = require('./user-service');

suite('User API tests', function () {

  let users = fixtures.users;
  let newUser = fixtures.newUser;

  const userService = new UserService(process.env.BASE_URL + ':' + process.env.BASE_PORT );

  setup(async function () {
    await userService.deleteAll();
  });

  teardown(async function () {
    await userService.deleteAll();
  });

  test('authenticate', async function () {
    const response = await userService.authenticate(await userService.create(newUser));
    assert(response.success);
    assert.isDefined(response.token);
  });

  test('verify Token', async function () {
    const returnedUser = await userService.create(newUser);
    const response = await userService.authenticate(newUser);
    assert(response.success);
    const userInfo = utils.decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });

  test('create a user', async function () {
    const returnedUser = await userService.create(newUser);
    assert(_.some([returnedUser], newUser), 'returnedUser must be a superset of newUser');
    assert.isDefined(returnedUser._id);
  });

  test('get user', async function () {
    const u1 = await userService.create(newUser);
    const u2 = await userService.get(u1._id);
    assert.deepEqual(u1, u2);
  });

  test('get invalid user', async function () {
    const u1 = await userService.get('1234');
    assert.isNull(u1);
    const u2 = await userService.get('012345678901234567890123');
    assert.isNull(u2);
  });


  test('delete a user', async function () {
    let u = await userService.create(newUser);
    assert(u._id != null);
    await userService.deleteOne(u._id);
    u = await userService.get(u._id);
    assert(u == null);
  });

  test('get all users', async function () {
    for (let u of users) {
      await userService.create(u);
    }

    const allUsers = await userService.getAll();
    assert.equal(allUsers.length, users.length);
  });

  test('get users detail', async function () {
    for (let u of users) {
      await userService.create(u);
    }

    const allUsers = await userService.getAll();
    for (let i = 0; i < users.length; i++) {
      assert(_.some([allUsers[i]], users[i]), 'returnedUser must be a superset of newUser');
    }
  });

  test('get all users empty', async function () {
    const allUsers = await userService.getAll();
    assert.equal(allUsers.length, 0);
  });

});
