'use strict';

/* https://mongoosejs.com/docs/guide.html#definition */
const Mongoose = require('mongoose');
require('mongoose-long')(Mongoose);
const Schema = Mongoose.Schema;
const Long = Schema.Types.Long;

const RegionSchema = new Schema({
    title: String,
    variable: String,
    identifier: String,
    geo: {
      lat: Long,
      long: Long
    },
    _v: Number
});

RegionSchema.statics.findById = function(id) {
  if (! Mongoose.Types.ObjectId.isValid(id) ) {
    throw "not a valid object id" + id;
  }
  return this.findOne({ _id: id});
};

RegionSchema.statics.findAll = function() {
  return this.find({});
};

RegionSchema.statics.findByTitle = function(title) {
  return this.findOne({ title : title});
};

module.exports = Mongoose.model('Region', RegionSchema);