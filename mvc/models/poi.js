'use strict';

/* https://mongoosejs.com/docs/guide.html#definition */
const Mongoose = require('mongoose');
require('mongoose-long')(Mongoose);
const Schema = Mongoose.Schema;
const Long = Schema.Types.Long;

/* https://mongoosejs.com/docs/schematypes.html */
const PoiSchema = Schema({
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

module.exports = Mongoose.model('Poi', PoiSchema);