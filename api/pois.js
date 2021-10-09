'use strict';

const Poi = require('../mvc/models/poi');
const Boom = require('@hapi/boom');
const Utils = require('./utils.js');

const Pois = {

  find: {
    auth: { strategy: 'jwt' },
    handler: async function() {
      return Poi.find();
    }
  },

  findOne: {
    auth: { strategy: 'jwt' },
    handler: async function(request) {
      try {
        const poi = await Poi.findOne({ _poi_id: request.params._id });
        if (!poi) {
          return Boom.notFound('No point-of-interest with this id');
        }
        return poi;
      } catch (err) {
        return Boom.notFound('No point-of-interest with that id');
      }
    }
  },

  create: {
    auth: { strategy: 'jwt' },
    handler: async function(request, h) {
      const userId = Utils.getUserIdFromRequest(request);
      const newPoi = new Poi(request.payload);
      const poi = await newPoi.save();
      if (poi) {
        // successful post
        return h.response(poi).code(201);
      }
      // failed post
      return Boom.badImplementation('error creating Point of Interest')
    }
  },

  delete: {
    auth: { strategy: 'jwt' },
    handler: async function(request) {
      const poi = await Poi.deleteOne({ _poi_id: request.params.id });
      if (poi) {
        // delete success
        return { success: true };
      }
      // delete failed
      return Boom.notFound('POI id not found')
    }
  },

  deleteAll: {
    auth: { strategy: 'jwt' },
    handler: async function() {
      const poi = await Poi.deleteMany({});
      if (poi) {
        // delete success
        return { success: true };
      }
      // delete failed
      return Boom.notFound('Pois deleteAll failed')
    }
  }
};

module.exports = Pois;