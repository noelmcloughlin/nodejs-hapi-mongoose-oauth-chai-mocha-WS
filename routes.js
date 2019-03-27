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

  //Regions
  { method: 'GET', path: '/region/home', config: Regions.home },
  { method: 'GET', path: '/region/report', config: Regions.report },
  { method: 'POST', path: '/region/add', config: Regions.add },
//{ method: 'GET', path: '/region/delete/:regionid', config: Regions.delete },

  //Points of Interest
  { method: 'GET', path: '/poi/home', config: Pois.home },
  { method: 'GET', path: '/poi/report', config: Pois.report },
  { method: 'POST', path: '/region/poi/add', config: Pois.add },
//{ method: 'GET', path: '/region/:poi/delete', config: Pois.delete },

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
