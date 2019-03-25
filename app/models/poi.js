'use strict';

/* https://mongoosejs.com/docs/guide.html#definition */
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

/* https://mongoosejs.com/docs/schematypes.html */
const PoisSchema = new Schema(
  {
    name: String,
    nameHtml: String,
    safeName: String,
    coordinates: {
      irishGrid: {
        sheet: String,
        eastings: String,
        northings: String
      },
      fullIrishGrid: {
        sheet: String,
        eastings: String,
        northings: String,
      },
      tmcGrid: {
        sheet: String,
        eastings: String,
        northings: String,
      },
      geo: {
        lat: Number,
        long: Number
      }
    },
    cursor: Number,
    description: String,
    costalZone: String
  });

PoisSchema.statics.findByName = function(name) {
  return this.pois.findOne({ name : name});
};

PoisSchema.statics.findByCategory = function(name) {
  return this.pois.findOne({ category : name});
};

module.exports = Mongoose.model('Pois', PoisSchema);

