'use strict';

const Accounts = require('./mvc/controllers/accounts');
const About   = require('./mvc/controllers/about');
const Regions = require('./mvc/controllers/regions');
const Pois    = require('./mvc/controllers/pois');

module.exports = [
  { method: 'GET', path: '/', config: Accounts.index },
  { method: 'GET', path: '/privacy/ok', config: Accounts.index },
  { method: 'GET', path: '/privacy', config: About.privacy },
  { method: 'GET', path: '/login', config: Accounts.showLogin },
  { method: 'GET', path: '/logout', config: Accounts.logout },
  { method: 'GET', path: '/signup/show', config: Accounts.showSignup },
  { method: 'POST', path: '/signup/submit', config: Accounts.submitSignup },
  { method: 'POST', path: '/login', config: Accounts.login },
  { method: 'GET', path: '/settings', config: Accounts.showSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },

  //Points of Interest
  { method: 'GET',  path: '/report', config: Pois.report },
  { method: 'GET',  path: '/report/:region_id', config: Pois.report },
  { method: 'POST', path: '/report/:region_id/poi/add', config: Pois.add },
  { method: 'GET',  path: '/report/:region_id/poi/:pois_id/delete', config: Pois.delete },
  { method: 'POST', path: '/report/:region_id/poi/:pois_id/edit/desc', config: Pois.editDesc },

  //Regions
  { method: 'GET',  path: '/home', config: Regions.home },
  { method: 'POST', path: '/home/region/add', config: Regions.add },
  { method: 'GET',  path: '/home/region/:region_id/delete', config: Regions.delete },

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
