const Poi = require('../mvc/models/poi');

const Pois = {

  find: {
    auth: false,
    handler: async function(request, h) {
      const pois = await Poi.find();
      return pois;
    }
  },

  findOne: {
    auth: false,
    handler: async function(request, h) {
      try {
        const poi = await Poi.findOne({ _poi_id: request.params.poi_id });
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
    auth: false,
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

  deleteOne: {
    auth: false,
    handler: async function(request, h) {
      const poi = await Poi.remove({ _poi_id: request.params.id });
      if (poi) {
        // delete success
        return { success: true };
      }
      // delete failed
      return Boom.notFound('POI id not found')
    }
  },

  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      const poi = await Poi.remove({});
      if (poi) {
        // delete success
        return { success: true };
      }
      // delete failed
      return Boom.notFound('Pois deleteAll failed')
    }
  }
};
