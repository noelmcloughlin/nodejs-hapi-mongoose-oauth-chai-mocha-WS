'use strict';

const Dotenv       = require('dotenv');
const Result       = Dotenv.config();
const Hapi         = require('hapi');
const HapiCookie   = require('hapi-auth-cookie');
const Vision       = require('vision');
const Inert        = require('inert');
const Nunjucks     = require('nunjucks');
const NunjucksHapi = require('nunjucks-hapi');
const Routes       = require('./mvc/routes');
const server       = Hapi.server({ port: process.env.PORT || 3000, });
let Path           = require('path');

require('./mvc/models/db');

const Checklist = [Result, Hapi, HapiCookie, Vision, Inert, Nunjucks, NunjucksHapi, Routes, server, Path]
for (const o of Checklist) {
    if (o.error) {
        console.log(o.error.message);
        process.exit(1);
    }
}

Nunjucks.installJinjaCompat();
Nunjucks.configure('views', {
    autoescape: true,
    cache: false,
    web: { async: true }
});

async function provision() {
  await server.register(Inert);
  await server.register(Vision);
  await server.register(HapiCookie);

  server.views({
    engines: {
         njk: NunjucksHapi     // https://github.com/seldo/nunjucks-hapi
    },
    relativeTo: __dirname,
    path: './mvc/views',
    layoutPath: './mvc/views/layouts',
    partialsPath: './mvc/views/partials',
    isCached: false,
    layout: false            // warning; true renders (unwanted) raw html! Need false.
  });

  server.auth.strategy('standard', 'cookie', {
    password: process.env.cookie_password,
    cookie: process.env.cookie_name,
    isSecure: false,
    ttl: 24 * 60 * 60 * 1000,
    redirectTo: '/'
  });

  server.auth.default({
    mode: 'required',
    strategy: 'standard'
 });

  server.route(Routes);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

provision();
