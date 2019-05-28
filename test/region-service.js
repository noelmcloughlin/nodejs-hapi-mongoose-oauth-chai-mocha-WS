'use strict';

const axios = require('axios');

class RegionService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getAllRegions() {
    try {
      const response = await axios.get(this.baseUrl + '/api/region');
      return response.data;
    } catch (e) {
      return null
    }
  }

  async getRegion(region_id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/region/' + region_id);
      return response.data;
    } catch (e) {
      return null
    }
  }

  async createRegion(newRegion) {
    try {
      const response = await axios.post(this.baseUrl + '/api/region', newRegion);
      return response.data;
    } catch (e) {
      return null
    }
  }

  async deleteAllRegions() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/region');
      return response.data;
    } catch (e) {
      return null
    }
  }

  async deleteRegion(region_id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/region/' + region_id);
      return response.data;
    } catch (e) {
      return null
    }
  }
}

module.exports = RegionService;