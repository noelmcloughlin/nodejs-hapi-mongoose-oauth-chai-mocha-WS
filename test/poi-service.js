'use strict';

const axios = require('axios');

class PoiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getAllRegions() {
    try {
      const response = await axios.get(this.baseUrl + '/api/region');
      return response.data;
    } catch (e) {
      console.log('arraggghhh');
      return null
    }
  }

  async getRegion(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/region/' + id);
      return response.data;
    } catch (e) {
      console.log('arraggghhh');
      return null
    }
  }

  async createRegion(newRegion) {
    try {
      const response = await axios.post(this.baseUrl + '/api/region', newRegion);
      return response.data;
    } catch (e) {
      console.log('arraggghhh');
      return null
    }
  }

  async deleteRegion(id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/region/' + id);
      return response.data;
    } catch (e) {
      console.log('arraggghhh');
      return null
    }
  }

  async deleteAllRegions() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/region');
      return response.data;
    } catch (e) {
      console.log('arraggghhh');
      return null
    }
  }

  async getAll(region_id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/region/' + region_id + '/poi');
      return response.data;
    } catch (e) {
      console.log('arraggghhh');
      return null
    }
  }

  async get(region_id, id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/region/' + region_id + '/poi/' + id);
      return response.data;
    } catch (e) {
      console.log('arraggghhh');
      return null
    }
  }

  async create(region_id, newPoi) {
    try {
      const response = await axios.post(this.baseUrl + '/api/region/' + region_id + '/poi', newPoi);
      return response.data;
    } catch (e) {
      console.log('arraggghhh');
      return null
    }
  }

  async deleteAll(region_id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/region/' + region_id + '/poi');
      return response.data;
    } catch (e) {
      console.log('arraggghhh');
      return null
    }
  }

  async delete(region_id, id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/region/' + region_id + '/poi/' + id);
      return response.data;
    } catch (e) {
      console.log('arraggghhh');
      return null
    }
  }

}

module.exports = PoiService;