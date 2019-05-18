const Region = require('../mvc/models/region');
const Boom = require('Boom');

const Regions = {

  findAll: {
    auth: false,
    handler: async function(request, h) {
      const regions = await Region.findAll();
      return regions
    }
  },

  find: {
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
  },

  create: {
    auth: false,
    handler: async function(request, h) {
      const newRegion = new Region(request.payload);
      const region = await newRegion.save();
      if (region) {
        // successful post
        return h.response(region).code(201);
      }
      // failed post
      return Boom.badImplementation('error creating Region')
    }
  },

  delete: {
    auth: false,
    handler: async function(request, h) {
      const region = await Region.delete({ _region_id: request.params.id });
      if (region) {
        // delete success
        return { success: true };
      }
      // delete failed
      return Boom.notFound('Region id not found')
    }
  },

  deleteAll: {
    auth: false,
    handler: async function(request, h) {
      const region = await Region.delete({});
      if (region) {
        // delete success
        return { success: true };
      }
      // delete failed
      return Boom.notFound('Region deleteAll failed')
    }
  }
};

module.exports = Regions;