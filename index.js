'use strict';

const Dotenv       = require('dotenv')
const Result       = Dotenv.config();
const Hapi         = require('hapi');
const HapiCookie   = require('hapi-auth-cookie');
const Vision       = require('vision');
const Inert        = require('inert');
const Nunjucks     = require('nunjucks');
const NunjucksHapi = require('nunjucks-hapi')

const Routes     = require('./mvc/routes');
const server     = Hapi.server({ port: process.env.PORT || 3000, });
require('./models/db');

const Checklist = [Result, Hapi, HapiCookie, Vision, Inert, Nunjucks, NunjucksHapi, Routes, server]
for (const o of Checklist) {
    if (o.error) {
        console.log(o.error.message);
        process.exit(1);
    }
}

Nunjucks.installJinjaCompat()
Nunjucks.configure('views', {
    autoescape: true,
    cache: false,
    web: { async: true }
});

async function provision() {
  await server.register(Inert);
  await server.register(Vision);
  await server.register(HapiCookie);

  // Different ways to use hapi and nunjucks ..
  // Vision Templates rendering support for Hapi: https://github.com/hapijs/vision#nunjucks
  // https://github.com/seldo/nunjucks-hapi
  server.views({
    engines: {
         njk: NunjucksHapi
    },
    relativeTo: __dirname,
    path: './mvc/views',
    layoutPath: './mvc/views/layouts',
    partialsPath: './mvc/views/partials',
    layout: false,                       // true renders (unwanted) raw html! Need false.
    isCached: false
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
