const Region = require('../mvc/models/region');

const Regions = {

  find: {
    auth: false,
    handler: async function(request, h) {
      const pois = await Region.find();
      return pois
    }
};
