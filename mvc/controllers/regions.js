'use strict';

const User   = require('../models/user');
const Region = require('../models/region');

const Region = {
  home: {
    handler: async function(request, h) {
      const regions = await Region.find();
      return h.view('home', { title: 'Points of Interest', regions: regions });
    }
  },
  report: {
    handler: async function(request, h) {
      try {
        const region = await Region.find().populate('title');
        return h.view('report', {
          title: 'Regions of Interest',
          region: region
        });
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },
  create: {
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;

        const newRegion = new Region({
          title: data.title,
          variable: data.title.toLowerCase().trim(),
          identifier: '**The '.concat(data.title).concat('**')
        });
        await newRegion.save();
        return h.redirect('/report');
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  }
};

module.exports = Region;
