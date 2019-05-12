'use strict';

const PoiApi    = require('./api/pois');
const RegionApi = require('./api/regions');

module.exports = [

  //Points of Interest API
  { method: 'GET',    path: '/api/regions/{region_id}/pois',          config: PoiApi.findAll },
  { method: 'GET',    path: '/api/regions/{region_id}/pois/{poi_id}', config: PoiApi.findOne },
  { method: 'POST',   path: '/api/regions/{region_id}/pois',          config: PoiApi.createOne },
  { method: 'DELETE', path: '/api/regions/{region_id}/pois/{poi_id}', config: PoiApi.deleteOne },
  { method: 'DELETE', path: '/api/regions/{region_id}/pois',          config: PoiApi.deleteAll },
  //{ method: 'POST', path: '/api/regions/{region_id}/pois/{poi_id}', config: PoiApi.update },

  //Regions API
  { method: 'GET',    path: '/api/regions',             config: RegionApi.findAll },
  { method: 'GET',    path: '/api/regions/{region_id}', config: RegionApi.findOne },
  { method: 'POST',   path: '/api/regions',             config: RegionApi.createOne },
  { method: 'DELETE', path: '/api/regions/{region_id}', config: RegionApi.deleteOne },
  { method: 'DELETE', path: '/api/regions',             config: RegionApi.deleteAll }
  //{ method: 'POST', path: '/api/regions/{region_id}', config: RegionApi.update }
];
