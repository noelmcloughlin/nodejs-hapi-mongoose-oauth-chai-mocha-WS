'use strict';

var Mongoose = require('mongoose')
require('mongoose-long')(Mongoose);
const Schema = Mongoose.Schema;

const regionSchema = new Schema({
    title: String,
    variable: String,
    identifier: String,
    geo: {
      lat: Schema.Types.Long,
      long: Schema.Types.Long
    },
    _v: Number
});

regionSchema.statics.findByTitle = function(title) {
  return this.findOne({ title : title});
};

module.exports = Mongoose.model('Regions', regionSchema);
