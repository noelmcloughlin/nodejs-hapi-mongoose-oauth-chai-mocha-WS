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
  { method: 'POST', path: '/dashboard/addregion', config: Dashboard.addregion },
  { method: 'GET', path: '/dashboard/:regionid/delregion/:regionid', config: Dashboard.delregion },
  { method: 'GET', path: '/dashboard/delregion/:regionid', config: Dashboard.delregion },
  { method: 'GET', path: '/region/:regionid', config: Dashboard.region },
  { method: 'POST', path: '/editdesc/:regionid', config: Dashboard.editdesc },

  //Points of Interest
  { method: 'POST', path: '/dashboard/addpoi', config: Dashboard.addpoi },
  { method: 'GET', path: '/dashboard/:poiid/delpoi/:poiid', config: Dashboard.delpoi },
  { method: 'GET', path: '/dashboard/delpoi/:poiid', config: Dashboard.delpoi },
  { method: 'GET', path: '/poi/:poiid', config: Dashboard.poi },
  { method: 'POST', path: '/editdesc/:poiid', config: Dashboard.editdesc },

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
