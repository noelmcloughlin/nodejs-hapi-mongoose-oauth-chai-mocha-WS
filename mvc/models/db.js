'use strict';

require('dotenv').config();

const Mongoose = require('mongoose');

Mongoose.connect(process.env.db);
const db = Mongoose.connection;

async function seed_users() {
  var seeder = require('mais-mongoose-seeder')(Mongoose);
  const User = require('./user');
  const data = require('./data/initdata.json');
  const dbData = await seeder.seed(data, { dropDatabase: false, dropCollections: true });
  console.log(dbData);
}

async function seed_pois() {
  var seeder = require('mais-mongoose-seeder')(Mongoose);
  const Poi = require('./poi');
  const Region = require('./region')
  const data = require('./data/data4.json');
  const dbData3 = await seeder.seed(data, { dropDatabase: false, dropCollections: true });
  console.log(dbData3);
}

db.on('error', function(err) {
  console.log(`database connection error: ${err}`);
});

db.on('disconnected', function() {
  console.log('database disconnected');
});

db.once('open', function() {
  console.log(`database connected to ${this.name} on ${this.host}`);
  seed_users();
  seed_pois();
})
