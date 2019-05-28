'use strict';

/* https://mongoosejs.com/docs/guide.html#definition */
const Mongoose = require('mongoose');
require('mongoose-long')(Mongoose);
const Schema = Mongoose.Schema;
const Long = Schema.Types.Long;

const RegionSchema = Schema({
    title: String,
    variable: String,
    identifier: String,
    geo: {
      lat: Long,
      long: Long
    },
    _v: Number
});

module.exports = Mongoose.model('Region', RegionSchema);
