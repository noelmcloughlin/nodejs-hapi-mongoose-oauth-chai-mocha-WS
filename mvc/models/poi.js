'use strict';

/* https://mongoosejs.com/docs/guide.html#definition */
const Mongoose = require('mongoose');
require('mongoose-long')(Mongoose);
const Schema = Mongoose.Schema;
const Long = Schema.Types.Long;

/* https://mongoosejs.com/docs/schematypes.html */
const PoiSchema = new Schema({
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
        lat: Long,
        long: Long
      }
    },
    cursor: Number,
    description: String,
    costalZone: {
        type: Schema.Types.ObjectId,
        ref: 'Region',
    },
  });

PoiSchema.statics.findByNameAndRegionId = function(name, region_id) {
  if (! Mongoose.Types.ObjectId.isValid(region_id) ) {
    throw "not a valid object id" + region_id;
  }
  return this.find({ name : name, costalZone: region_id});
};

PoiSchema.statics.findByName = function(name) {
  return this.find({ name : name});
};

PoiSchema.statics.findByRegionId = function(region_id) {
  if (! Mongoose.Types.ObjectId.isValid(region_id) ) {
    throw "not a valid object id" + region_id;
  }
  return this.find({ costalZone: region_id});

};

module.exports = Mongoose.model('Poi', PoiSchema);