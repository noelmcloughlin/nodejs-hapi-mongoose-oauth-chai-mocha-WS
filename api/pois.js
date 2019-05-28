const Poi = require('../mvc/models/poi');
const Boom = require('Boom');

const Pois = {

  findAll: {
    auth: { strategy: 'jwt' },
    handler: async function(request, h) {
      const pois = await Poi.findAll();
      return pois;
    }
  },

  find: {
    auth: { strategy: 'jwt' },
    handler: async function(request, h) {
      try {
        const poi = await Poi.find({ _poi_id: request.params._id });
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
    handler: async function(request, h) {
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
    handler: async function(request, h) {
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
