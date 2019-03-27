'use strict';

const Accounts = require('./controllers/accounts');
const About = require('./controllers/about');
const Pois = require('./controllers/pois');

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
  { method: 'POST', path: '/region/add', config: Region.add },
  { method: 'GET', path: '/region/delete/:regionid', config: Region.delete },

  //Points of Interest
  { method: 'POST', path: '/region/poi/add', config: Pois.add },
  { method: 'GET', path: '/region/:poi/delete', config: Pois.delete },

  { method: 'GET', path: '/home', config: Pois.home },
  { method: 'GET', path: '/report', config: Pois.report },
  { method: 'POST', path: '/create', config: Pois.create },
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
