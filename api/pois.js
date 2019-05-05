const Poi = require('../mvc/models/poi');

const Pois = {

  find: {
    auth: false,
    handler: async function(request, h) {
      const pois = await Poi.find();
      return pois
    }
};
