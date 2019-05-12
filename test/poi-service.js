'use strict';

const axios = require('axios');
const baseUrl = 'http://localhost:3000';

class PoiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getAllRegions() {
    try {
      const response = await axios.get(this.baseUrl + '/api/regions');
      return response.data;
    } catch (e) {
      return null
    }
  }

  async getRegion(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/regions/' + id);
      return response.data;
    } catch (e) {
      return null
    }
  }

  async createRegion(newRegion) {
    try {
      const response = await axios.post(this.baseUrl + '/api/regions/' + newRegion);
      return response.data;
    } catch (e) {
      return null
    }
  }

  async deleteRegion(id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/regions/' + id);
      return response.data;
    } catch (e) {
      return null
    }
  }

  async deleteAllRegions() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/regions');
      return response.data;
    } catch (e) {
      return null
    }
  }

  async getAll() {
    try {
      const response = await axios.get(this.baseUrl + '/api/regions/' + region_id + 'pois');
      return response.data;
    } catch (e) {
      return null
    }
  }

  async get(region_id, id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/regions/' + region_id + 'pois/' + id);
      return response.data;
    } catch (e) {
      return null
    }
  }

  async create(region_id, newPoi) {
    try {
      const response = await axios.post(this.baseUrl + '/api/regions/' + region_id + 'pois/' + newPoi);
      return response.data;
    } catch (e) {
      return null
    }
  }

  async deleteAll(region_id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/regions/' + region_id + '/pois');
      return response.data;
    } catch (e) {
      return null
    }
  }

  async delete(region_id, id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/regions/' + region_id + '/pois/' + id);
      return response.data;
    } catch (e) {
      return null
    }
  }

}

module.exports = PoiService;
