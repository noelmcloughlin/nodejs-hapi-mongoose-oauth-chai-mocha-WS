'use strict';

const PoiApi    = require('./api/pois');
const RegionApi = require('./api/regions');

module.exports = [
  { method: 'GET', path: '/api/region/{region_id}/poi', config: PoiApi.findAll },
  { method: 'GET', path: '/api/region/{region_id}/poi/{poi_id}', config: PoiApi.find },
  { method: 'POST', path: '/api/region/{region_id}/poi', config: PoiApi.create },
  { method: 'DELETE', path: '/api/region/{region_id}/poi/{poi_id}', config: PoiApi.delete },
  { method: 'DELETE', path: '/api/region/{region_id}/poi', config: PoiApi.deleteAll },

  { method: 'GET', path: '/api/region', config: RegionApi.findAll },
  { method: 'GET', path: '/api/region/{region_id}', config: RegionApi.find },
  { method: 'POST', path: '/api/region', config: RegionApi.create },
  { method: 'DELETE', path: '/api/region/{region_id}', config: RegionApi.delete },
  { method: 'DELETE', path: '/api/region', config: RegionApi.deleteAll },
];


