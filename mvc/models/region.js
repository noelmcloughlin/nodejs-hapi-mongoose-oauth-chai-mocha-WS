'use strict';

let Mongoose = require('mongoose');
require('mongoose-long')(Mongoose);
const Schema = Mongoose.Schema;
const { Long } = Schema.Types;

const regionSchema = new Schema({
    title: String,
    variable: String,
    identifier: String,
    geo: {
      lat: Schema.Types.Long,
      long: Long
    },
    _v: Number
});

regionSchema.statics.findByTitle = function(title) {
  return this.findOne({ title : title});
};

module.exports = Mongoose.model('Regions', regionSchema);
