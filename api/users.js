'use strict';

const Boom = require('@hapi/boom');
const User = require('../mvc/models/user');
const Utils = require('./utils.js');

const Users = {
  authenticate: {
    auth: false,
    handler: async function(request, h) {
      try {
        const user = await User.findOne({ email: request.payload.email });
        if (!user) {
          return Boom.notFound('Authentication failed. User not found');
        }
        const token = Utils.createToken(user);
        return h.response({ success: true, token: token }).code(201);
      } catch (err) {
        return Boom.notFound('internal db failure');
      }
    }
  },

  find: {
    auth: false,
    handler: async function() {
      return User.find();
    }
  },

  findOne: {
    auth: false,
    handler: async function(request) {
      try {
        const user = await User.findOne({ _id: request.params.id });
        if (!user) {
          return Boom.notFound('No User with this id');
        }
        return user;
      } catch (err) {
        return Boom.notFound('No User with this id');
      }
    }
  },

  create: {
    auth: false,
    handler: async function(request, h) {
      const newUser = new User(request.payload);
      const user = await newUser.save();
      if (user) {
        return h.response(user).code(201);
      }
      return Boom.badImplementation('error creating user');
    }
  },

  deleteAll: {
    auth: false,
    handler: async function() {
      await User.deleteMany({});
      return { success: true };
    }
  },

  delete: {
    auth: false,
    handler: async function(request) {
      const user = await User.deleteOne({ _id: request.params.id });
      if (user) {
        return { success: true };
      }
      return Boom.notFound('id not found');
    }
  }
};

module.exports = Users;