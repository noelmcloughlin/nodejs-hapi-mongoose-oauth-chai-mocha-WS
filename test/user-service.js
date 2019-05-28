'use strict';

const axios = require('axios');

class UserService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async authenticate(user) {
    try {
      const response = await axios.post(this.baseUrl + '/api/user/authenticate', user);
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async clearAuth() {
    axios.defaults.headers.common['Authorization'] = '';
  }

  async getAll() {
    try {
      const response = await axios.get(this.baseUrl + '/api/user');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async get(id) {
    try {
      const response = await axios.get(this.baseUrl + '/api/user/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async create(newUser) {
    try {
      const response = await axios.post(this.baseUrl + '/api/user', newUser);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAll() {
    try {
      const response = await axios.delete(this.baseUrl + '/api/user');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteOne(id) {
    try {
      const response = await axios.delete(this.baseUrl + '/api/user/' + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }
}

module.exports = UserService;