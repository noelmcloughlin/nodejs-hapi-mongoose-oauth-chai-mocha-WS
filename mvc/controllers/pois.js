'use strict';

const User   = require('../models/user');
const Poi    = require('../models/poi');
const Region = require('../models/region');

const Pois = {
  home: {
    handler: async function(request, h) {
      const regions = await Region.find();
      return h.view('home', { title: 'Points of Interest', regions: regions });
    }
  },
  report: {
    handler: async function(request, h) {
      try {
        const pois = await Pois.find().populate('name').populate('category').populate('description');
        return h.view('report', {
          title: 'Pois to Date',
          pois: pois
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

        const rawRegion = request.payload.region.split(',');
        const region = await Region.findOne({
          lastName: rawRegion[0],
          firstName: rawRegion[1]
        });

        const newPois = new Pois({
          name: data.amount,
          category: data.method,
          description: description
        });
        await newPois.save();
        return h.redirect('/report');
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  }
};

module.exports = Pois;
