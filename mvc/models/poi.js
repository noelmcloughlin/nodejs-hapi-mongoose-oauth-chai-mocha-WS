'use strict';

/* https://mongoosejs.com/docs/guide.html#definition */
var Mongoose = require('mongoose')
require('mongoose-long')(Mongoose);
const Schema = Mongoose.Schema;

/* https://mongoosejs.com/docs/schematypes.html */
const PoisSchema = new Schema({
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
        lat: Schema.Types.Long,
        long: Schema.Types.Long
      }
    },
    cursor: Number,
    description: String,
    costalZone: {
        type: Schema.Types.ObjectId,
        ref: 'Regions',
    },
  });

PoisSchema.statics.findByNameAndRegionId = function(name, region) {
  if (! Mongoose.Types.ObjectId.isValid(region) ) {
      throw "not a valid object id";
  }
  return this.find({ name : name, costalZone: region});
};

PoisSchema.statics.findByName = function(name) {
  return this.find({ name : name});
};

PoisSchema.statics.findByRegionId = function(region) {
  if (! Mongoose.Types.ObjectId.isValid(region) ) {
      throw "not a valid object id";
  }
  return this.find({ costalZone: region});
  
};

module.exports = Mongoose.model('Pois', PoisSchema);

