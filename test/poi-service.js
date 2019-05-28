'use strict';

const axios = require('axios');

class PoiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getAllPois(region_id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/region/' + region_id + '/poi');
      return response.data;
    } catch (e) {
      return null
    }
  }

  async getPoi(region_id, id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/region/' + region_id + '/poi/' + id);
      return response.data;
    } catch (e) {
      return null
    }
  }

  async createPoi(region_id, newPoi) {
    try {
      const response = await axios.post(this.baseUrl + '/api/region/' + region_id + '/poi', newPoi);
      return response.data;
    } catch (e) {
      return null
    }
  }

  async deleteAllPois(region_id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/region/' + region_id + '/poi');
      return response.data;
    } catch (e) {
      return null
    }
  }

  async deletePoi(region_id, id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/region/' + region_id + '/poi/' + id);
      return response.data;
    } catch (e) {
      return null
    }
  }
}

module.exports = PoiService;