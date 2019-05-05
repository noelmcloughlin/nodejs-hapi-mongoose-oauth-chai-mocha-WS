'use strict';

const PoiApi    = require('./api/pois');
const RegionApi = require('./api/regions');

module.exports = [

  //Points of Interest API
  { method: 'GET',    path: '/api/regions/{region_id}/pois',                  config: PoiApi.find },
  //{ method: 'PUT',    path: '/api/regions/{region_id}/pois/{pois_id}/add',    config: PoiApi.add },
  //{ method: 'DELETE', path: '/api/regions/{region_id}/pois/{pois_id}/delete', config: PoiApi.delete },
  //{ method: 'POST',   path: '/api/regions/{region_id}/pois/{pois_id}/update', config: PoiApi.update },

  //Regions API
  { method: 'GET',    path: '/api/regions',                    config: RegionApi.home }
  //{ method: 'PUT',    path: '/api/regions/{region_id}/add',    config: RegionApi.add },
  //{ method: 'DELETE', path: '/api/regions/{region_id}/delete', config: RegionApi.delete },
  //{ method: 'POST',   path: '/api/regions/{region_id}/update', config: RegionApi.update }
];
