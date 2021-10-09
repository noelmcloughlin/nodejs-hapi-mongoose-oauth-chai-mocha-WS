'use strict';

const Boom = require('@hapi/boom');
const Dotenv = require('dotenv');
const User = require('../models/user');
const Joi = require('joi');

// Setup environment
Dotenv.config();

const Accounts = {
  privacy: {
    auth: {
      mode: 'optional'
    },
    handler: function(request, h) {
      if (request.auth.isAuthenticated) {
        return h.view('privacy', { title: 'Points Of Interest', user: true});
      } else {
        return h.view('privacy', { title: 'Points Of Interest', user: false });
      }
    }
  },
  index: {
    auth: {
      mode: 'optional'
    },
    handler: function(request, h) {
      try {
        if (request.auth.isAuthenticated && request.auth.credentials.profile){
          return h.view('main', { title: 'Welcome to Points Of Interest ', user: true });
        } else {
          return h.view('main', { title: 'Welcome to Points Of Interest', user: false });
        }
      } catch (err) {
        return h.view('login', { errors: [{ message: err.message }]});
      }
    }
  },
  oauth: {
    // Secure implementation
    auth: 'github-oauth',
    handler: function (request, h) {
      try {
        if (request.auth.isAuthenticated) {
          request.cookieAuth.set(request.auth.credentials);
          return h.redirect('/home');
        }
        return h.redirect('/');
      } catch (err) {
        return h.view('login', { errors: [{ message: err.message }] });
      }
    }
  },
  getSignup: {
    auth: false,
    handler: function(request, h) {
      return h.view('signup', { title: 'Sign up for Points of Interest' });
    }
  },
  signup: {
    // Insecure type of implementation
    auth: false,
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string().required()
      },
      options: {
        abortEarly: false
      },
      failAction: function(request, h, error) {
        return h
          .view('signup', {
            title: 'Sign up error',
            errors: error.details
          })
          .takeover()
          .code(400);
      }
    },
    handler: async function(request, h) {
      try {
        const payload = request.payload;
        let user = await User.findByEmail(payload.email);
        if (user) {
          const message = 'Email address is already registered';
          throw new Boom(message);
        }
        // Store hash in DB instead of password.
        const newUser = new User({
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          password: 'dummy'
        });
        user = await newUser.save();
        user.password = await user.hashPassword(payload.password);
        user = await user.save();

        request.cookieAuth.set({ id: user.id });
        return h.redirect('/');
      } catch (err) {
        return h.view('signup', { errors: [{ message: err.message }] });
      }
    }
  },
  getLogin: {
    auth: false,
    handler: function(request, h) {
      return h.view('login', { title: 'Login to Points Of Interest' });
    }
  },
  login: {
    // Insecure type of implementation
    auth: false,
    validate: {
      payload: {
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string().required()
      },
      options: {
        abortEarly: false
      },
      failAction: function(request, h, error) {
        return h
          .view('login', {
            title: 'Sign in error',
            errors: error.details
          })
          .takeover()
          .code(400);
      }
    },
    handler: async function(request, h) {
      const { email, password } = request.payload;
      try {
        let user = await User.findByEmail(email);

        if (user) {
          // check password entered against stored value
          if (user.compareHashedPassword(password)) {
            request.cookieAuth.set({ id: user.id });
            return h.redirect('/home');
          }
        } else {
          const message = 'Email address is not registered';
          throw new Boom(message);
        }
      } catch (err) {
          return h.view('login', { errors: [{ message: err.message }] });
        }
    }
  },
  getSettings: {
    // Insecure type of implementation
    auth: 'cookie-auth',
    handler: async function(request, h) {
      let user;
      try {
        const id = request.auth.credentials.id;
        user = await User.findById(id);
        if (!user && request.auth.credentials.profile) {
          user = {
            firstName: request.auth.credentials.profile.username,
            lastName: request.auth.credentials.profile.displayName,
            email: request.auth.credentials.profile.email,
            password: null
          }
        }
        return h.view('settings', { title: 'Points Of Interest Settings', user: user });
      } catch (err) {
        return h.view('login', { errors: [{ message: err.message }] });
      }
    }
  },
  settings: {
    // Insecure type of implementation
    auth: 'cookie-auth',
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string().required()
      },
      options: {
        abortEarly: false
      },
      failAction: function(request, h, error) {
        return h
          .view('settings', {
            title: 'Update settings error',
            errors: error.details
          })
          .takeover()
          .code(400);
      }
    },
    handler: async function(request, h) {
      try {
        const userEdit = request.payload;
        const id = request.auth.credentials.id;
        let user = await User.findById(id);
        if (!user) {
          const message = 'Could not retrieve user';
          throw new Boom(message);
        }
        user.firstName = userEdit.firstName;
        user.lastName = userEdit.lastName;
        user.email = userEdit.email;
        // Store hash in DB instead of password.
        user.password = await user.hashPassword(userEdit.password);
        // Save user
        await user.save();
        return h.redirect('/home');
    } catch (err) {
      return h.view('login', { errors: [{ message: err.message }] });
    }
  }
  },
  logout: {
    // Secure implementation
    auth: false,
    handler: function(request, h) {
      try {
        request.cookieAuth.clear();
      } catch (err) {
        return h.view('login', { errors: [{ message: err.message }] });
      }
      return h.redirect('/');
    }
  }
};

module.exports = Accounts;