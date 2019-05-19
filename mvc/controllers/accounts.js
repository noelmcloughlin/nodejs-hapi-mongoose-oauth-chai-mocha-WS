'use strict';

const Accounts = {
  login: {
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
  account: {
    auth: 'cookie-auth',
    handler: function (request, h) {
      try {
        if (request.auth.isAuthenticated) {
          return (request.auth.credentials.profile);
        }
        return ('Not logged in...');
      } catch (err) {
        return h.view('login', { errors: [{ message: err.message }] });
      }
    }
  },
  userInfo: {
    auth: 'cookie-auth',
    handler: function (request, h) {
      try {
        if (request.auth.isAuthenticated) {
          return ('<h2>From your OAuth profile</h2>'
            + '<b>User name:</b> ' + request.auth.credentials.profile.username
            + '<br><b>Display name:</b> ' + request.auth.credentials.profile.displayName
            + '<br><b>Email address:</b> ' + request.auth.credentials.profile.email
            + '<br><b>Affiliation:</b> ' + request.auth.credentials.profile.raw.company);
        }
        return ('Not logged in...');
      } catch (err) {
        return h.view('login', { errors: [{ message: err.message }] });
      }
    }
  },
  index: {
    auth: {
      mode: 'optional'
    },
    handler: function(request, h) {
      try {
        if (request.auth.isAuthenticated) {
          return h.view('main', { title: 'Welcome to Points Of Interest' + request.auth.credentials.profile.displayName });
        } else {
          return h.view('main', { title: 'Welcome to Points Of Interest' });
        }
      } catch (err) {
        return h.view('login', { errors: [{ message: err.message }] });
      }
    }
  },
  logout: {
    auth: false,
    handler: function(request, h) {
      try {
          request.cookieAuth.clear();
      } catch (err) {
      return h.view('login', { errors: [{ message: err.message }] });
      }
      return h.redirect('/');
    }
  },
  privacy: {
    auth: {
      mode: 'optional'
    },
    handler: function(request, h) {
      return h.view('privacy', { title: 'Privacy of your Data' });
    }
  }
};

module.exports = Accounts;
