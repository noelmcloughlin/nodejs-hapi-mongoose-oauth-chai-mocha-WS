'use strict';

const assert = require('chai').assert
   , foo = 'bar'
   , beverages = { tea: [ 'chai', 'matcha', 'oolong']};

assert.typeOf(foo, 'string');
assert.typeOf(foo, 'string', 'foo is a string');
assert.equal(foo, 'bar', 'foo equal "bar"');
assert.lengthOf(foo, 3, 'foo`s value is three long');
assert.lengthOf(beverages.tea, 3, 'there are three beverages');

suite('Candidate API tests', function () {
  test('get candidates', function() {
    assert.equal(1, 1);
  })
});

const axios = require('axios');

// Make a request for a user with given ID
axios.get('/user?ID=12345').then(function (response) {
  // handle success
  console.log(response)
}).catch(function (error) {
  // catch error
  console.log(error)
}).then(function () {
  // always executed
});

// Optionally we could do this
axios.get('/user', {
  params: { ID: 12345 }
}).then(function (response) {
  console.log(response)
}).catch(function (response) {
  console.log(error);
}).then(function () {
  // always executed
});

// OR use async/wait as RESTful style.

async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

// First API Test
suite('Candidate API tests', function () {


  test('get candidates', async function() {
    const response = await axios.get('http://localhost:3000/api/users');
    console.log(response.data);
    const users = response.data;
    assert.equal(2, users.length);
    assert.equal(users[0].firstname, 'Lisa');
    assert.equal(users[0].lastname, 'Simpson');
    assert.equal(users[0].office, 'President');
    assert.equal(users[1].firstname, 'Donald');
    assert.equal(users[1].lastname, 'Simpson');
    assert.equal(users[1].office, 'Vice President');
  }),

  test('get one candidate', async function() {
    let response = await axios.get('http://localhost:3000/api/users');
    const users = response.data;
    assert.equal(2, users.length);

    const oneUserUrl = 'http://localhost:3000/api/users' + users[0]._id;
    response = await axios.get(oneUserUrl);
    const oneUser = response.data;

    assert.equal(oneUser[0].firstname, 'Lisa');
    assert.equal(oneUser[0].lastname, 'Simpson');
    assert.equal(oneUser[0].office, 'President');
  })
})

