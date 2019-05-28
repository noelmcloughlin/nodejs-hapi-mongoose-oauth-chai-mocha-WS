'use strict';

let Mongoose = require('mongoose');
require('mongoose-long')(Mongoose);
const Schema = Mongoose.Schema;
const { Long } = Schema.Types;

const RegionSchema = new Schema({
    title: String,
    variable: String,
    identifier: String,
    geo: {
      lat: Schema.Types.Long,
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