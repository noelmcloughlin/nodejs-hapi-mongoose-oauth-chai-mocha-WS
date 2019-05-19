'use strict';

const Region = require('../models/region');
const Poi  = require('../models/poi');
const Mongoose = require('mongoose');
const Boom = require('boom');

const Pois = {
  home: {
    handler: async function(request, h) {
      const poisList = await Pois.find();
      if (!poisList) {
        return Boom.notFound('No Pois found');
      }
      return h.view('home', { title: 'Points of Interest', Region: poisList });
    }
  },

  report: {
    handler: async function(request, h) {
      try {
        const region_id = Mongoose.Types.ObjectId(request.params.region_id);

        const region = await Region.findById(region_id);
        if (!region) {
          return Boom.notFound('No Region with this id');
        }
        const pois = await Poi.findByRegionId( region_id );
        if (!pois) {
          return Boom.notFound('No Point of Interest with this id');
        }
        return h.view('report', { title: 'Points of Interest', pois: pois, region: region });
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },

  editDesc: {
    handler: async function(request, h) {
      try {
        const region_id = Mongoose.Types.ObjectId(request.params.region_id);
        const poi_id   = Mongoose.Types.ObjectId(request.params.poi_id);
        const data = request.payload;

        const region = await Region.findById(region_id);
        if (!region) {
          return Boom.notFound('No Region with this id');
        }
        const pois = await Poi.findById(poi_id);
        if (!pois) {
          return Boom.notFound('No Point of Interest with this id');
        }

        await pois.update({ _id: poi_id, description: data.description });
        return h.redirect('/report/' + region_id);
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },

  delete: {
    handler: async function(request, h) {
      try {
        const region_id = Mongoose.Types.ObjectId(request.params.region_id);
        const poi_id   = Mongoose.Types.ObjectId(request.params.poi_id);

        const pois = await Poi.findOne({ _id: poi_id });
        if (!pois) {
          return Boom.notFound('No Point of Interest with this id');
        }
        await pois.delete(poi_id);
        return h.redirect('/report/' + region_id);
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },

  add: {
    handler: async function(request, h) {
      try {
        const region_id = Mongoose.Types.ObjectId(request.params.region_id);
        const data = request.payload;

        const newPois = new Poi({
          coordinates: {
             irishGrid: {},
             fullIrishGrid: {},
             tmcGrid: {},
             geo: { lat: data.latitude, long: data.longitude }
          },
          name: "**".concat(data.name).concat("**"),
          nameHtml: "&lt;p&gt;&lt;strong&gt;".concat(data.name).concat("&lt;/strong&gt;&lt;/p&gt;\n"),
          safeName: data.name.replace(' ', '-'),
          cursor: 0,
          description: data.description,
          costalZone: region_id
        });
        await newPois.save();
        return h.redirect('/report/' + region_id);
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  }
};

module.exports = Pois;