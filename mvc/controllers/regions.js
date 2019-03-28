'use strict';

const Region = require('../models/region');
const Poi    = require('../models/poi');
const User   = require('../models/user');

const Regions = {
  home: {
    handler: async function(request, h) {
      const regions = await Region.find();
      return h.view('home', { title: 'Regions of Interest', regions: regions });
    }
  },
  delete: {
    handler: async function(request, h) {
      try {
        const region_id = request.params.region_id;
        const region = await Region.findById( region_id );

        await region.findByIdAndDelete(region_id);
        response.redirect('/report');
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },
  add: {
    handler: async function(request, h) {
      try {
        const user_id = request.auth.credentials.id;
        const user = await User.findById(user_id);
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
