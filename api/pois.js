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
  }
};
