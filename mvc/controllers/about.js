'use strict';


const About = {
  index: {
    auth: false,
    handler: function(request, h) {
      return h.view('about', { title: 'About Points Of Interest' });
    }
  },
  privacy: {
    handler: function(request, h) {
      return h.view('privacy', { title: 'Privacy of your Data' });
    }
  }
};

module.exports = About;
