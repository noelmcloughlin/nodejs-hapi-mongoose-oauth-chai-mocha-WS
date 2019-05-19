'use strict';

const axios = require('axios');

class RegionService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getAll() {
    try {
      const response = await axios.get(this.baseUrl + '/api/region');
      return response.data;
    } catch (e) {
      return null
    }
  }

  async get(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/region/' + id);
      return response.data;
    } catch (e) {
      return null
    }
  }

  async create(newRegion) {
    try {
      const response = await axios.post(this.baseUrl + '/api/region', newRegion);
      return response.data;
    } catch (e) {
      return null
    }
  }

  async delete(id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/region/' + id);
      return response.data;
    } catch (e) {
      return null
    }
  }

  async deleteAll() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/region');
      return response.data;
    } catch (e) {
      return null
    }
  }
}

module.exports = RegionService;