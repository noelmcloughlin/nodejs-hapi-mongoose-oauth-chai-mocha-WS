'use strict';

/* https://mongoosejs.com/docs/guide.html#definition */
const Mongoose = require('mongoose');
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
        ref: 'Region',
    },
  });

PoisSchema.statics.findByNameAndRegionId = function(name, regionid) {
  if (! Mongoose.Types.ObjectId.isValid(regionid) ) {
    throw "not a valid object id" + regionid;
  }
  return this.find({ name : name, costalZone: regionid});
};

PoisSchema.statics.findByName = function(name) {
  return this.findMany({ name : name});
};

PoisSchema.statics.findByRegionId = function(regionid) {
  if (! Mongoose.Types.ObjectId.isValid(regionid) ) {
    throw "not a valid object id" + regionid;
  }
  return this.find({ costalZone: regionid});

};

module.exports = Mongoose.model('Poi', PoisSchema);