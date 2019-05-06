const Region = require('../mvc/models/region');

const Regions = {

  find: {
    auth: false,
    handler: async function(request, h) {
      const regions = await Region.find();
      return regions
    }
  },

    findOne: {
      auth: false,
      handler: async function(request, h) {
        try {
          const region = await Region.findOne({ _region_id: request.params.region_id });
          if (!region) {
            return Boom.notFound('No region with this id');
          }
          return region;
        } catch (err) {
          return Boom.notFound('No region with that id');
        }
      }
    }
  };
