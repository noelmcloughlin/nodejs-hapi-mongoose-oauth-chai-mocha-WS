'use strict';

const User = require('../models/user');
const Poi  = require('../models/poi');

const Pois = {
  home: {
    handler: async function(request, h) {
      const pois = await Poi.find();
      return h.view('home', { title: 'Points of Interest', pois: pois });
    }
  },
  report: {
    handler: async function(request, h) {
      try {
        const pois = await Pois.find().populate('name').populate('category').populate('description');
        return h.view('report', {
          title: 'Points of Interest',
          pois: pois
        });
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  },
  add: {
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = request.payload;

        const newPois = new Pois({
          name: "**".concat(data.name).concat("**"),
          nameHtml: "&lt;p&gt;&lt;strong&gt;".concat(data.name).concat("&lt;/strong&gt;&lt;/p&gt;\n"),
          safeName: data.name.replace(' ', '-'),
          cursor: 0,
          description: data.description
        });
        await newPois.save();
        return h.redirect('/poi/report');
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  }
};

module.exports = Pois;
