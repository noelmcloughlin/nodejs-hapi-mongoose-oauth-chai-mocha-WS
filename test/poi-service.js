'use strict';

const axios = require('axios').default ;

class PoiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getAll(region_id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/region/' + region_id + '/poi');
      return response.data;
    } catch (e) {
      return null
    }
  }

  async get(region_id, id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/region/' + region_id + '/poi/' + id);
      return response.data;
    } catch (e) {
      return null
    }
  }

  async create(region_id, newPoi) {
    try {
      const response = await axios.post(this.baseUrl + '/api/region/' + region_id + '/poi', newPoi);
      return response.data;
    } catch (e) {
      return null
    }
  }

  async deleteAll(region_id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/region/' + region_id + '/poi');
      return response.data;
    } catch (e) {
      return null
    }
  }

  async delete(region_id, id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/region/' + region_id + '/poi/' + id);
      return response.data;
    } catch (e) {
      return null
    }
  }

}

module.exports = PoiService;