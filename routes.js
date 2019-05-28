'use strict';

const Accounts = require('./mvc/controllers/accounts');
const Regions = require('./mvc/controllers/regions');
const Pois    = require('./mvc/controllers/pois');

module.exports = [
  { method: 'GET', path: '/', config: Accounts.index },
  { method: 'GET', path: '/privacy', config: Accounts.privacy },

  { method: 'GET', path: '/secure/oauth', config: Accounts.oauth },
  { method: 'GET', path: '/logout', config: Accounts.logout },

  { method: 'GET', path: '/jwt/login', config: Accounts.getLogin },
  { method: 'POST', path: '/jwt/login', config: Accounts.login },
  { method: 'GET', path: '/jwt/signup', config: Accounts.getSignup },
  { method: 'POST', path: '/jwt/signup', config: Accounts.signup },
  { method: 'GET', path: '/settings', config: Accounts.getSettings },
  { method: 'POST', path: '/settings', config: Accounts.settings },

  //Points of Interest
  { method: 'GET',  path: '/report/{region_id}', config: Pois.report },
  { method: 'POST', path: '/report/{region_id}/poi/add', config: Pois.add },
  { method: 'GET',  path: '/report/{region_id}/poi/{poi_id}/delete', config: Pois.delete },
  { method: 'POST', path: '/report/{region_id}/poi/{poi_id}/edit/desc', config: Pois.editDesc },

  //Regions
  { method: 'GET',  path: '/home', config: Regions.home },
  { method: 'POST', path: '/home/region/add', config: Regions.add },
  { method: 'GET',  path: '/home/region/{region_id}/delete', config: Regions.delete },

  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: './public'
      }
    },
    options: { auth: false }
  }
];
