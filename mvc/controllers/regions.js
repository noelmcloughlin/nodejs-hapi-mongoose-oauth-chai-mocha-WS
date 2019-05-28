'use strict';

const Region = require('../models/region');
const Mongoose = require('mongoose');

const Regions = {
  home: {
    handler: async function(request, h) {
      try {
        const regions = await Region.find();
        return h.view('home', { title: 'Regions of Interest', regions: regions });
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },
  delete: {
    handler: async function(request, h) {
      try {
        const region_id = Mongoose.Types.ObjectId(request.params.id);
        await Region.findByIdAndDelete(region_id);
        return h.redirect('/home');
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },
  add: {
    handler: async function(request, h) {
      try {
        const data = request.payload;

        const newRegion = new Region({
          title: data.title,
          identifier: "**".concat(data.title).concat("**"),
          variable: data.title.trim(),
          latitude: data.latitude,
          longitude: data.longitude,
          geo: {},
          _v: 0
        });
        await newRegion.save();
        return h.redirect('/home');
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  }
};

module.exports = Regions;