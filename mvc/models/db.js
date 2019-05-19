'use strict';

require('dotenv').config();
const Mongoose = require('mongoose');

let result;
result = Mongoose.connect(process.env.DB, { useNewUrlParser: true });
const db = Mongoose.connection;
const seeder = require('mais-mongoose-seeder')(Mongoose);

async function seed_pois() {
  const data = require('./data/regions_pois.json');
  const regionDb = await seeder.seed(data, { dropDatabase: false, dropCollections: true });
  console.log(regionDb);
}


db.on('error', function(err) {
  console.log(`database connection error: ${err}`);
});


db.on('disconnected', function() {
  console.log('database disconnected');
});


db.once('open', function() {
  console.log(`database connected to ${this.name} on ${this.host}`);
  result = seed_pois();
  if (result) {
    console.log('Seeding Database ... please wait')
  }
});