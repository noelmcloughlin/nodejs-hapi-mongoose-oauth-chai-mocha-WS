'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const regionSchema = new Schema({
    title: String,
    variable: String,
    identifier: String,
    geo: {
      lat: Number,
      long: Number
    }
});

regionSchema.statics.findByTitle = function(name) {
  return this.pois.findOne({ title : name});
};

regionSchema.statics.findByRegion = function(name) {
  return this.pois.findOne({ identifier : name});
};

module.exports = Mongoose.model('Regions', regionSchema);