'use strict';

const Bell         = require('bell');
const Boom         = require('boom');
const Cookie       = require('hapi-auth-cookie');
const Dotenv       = require('dotenv');
const Hapi         = require('hapi');
const Inert        = require('inert');
const Nanoid       = require('nanoid');
const Nunjucks     = require('nunjucks');
const NunjucksHapi = require('nunjucks-hapi');
const Routes       = require('./routes');
const RoutesApi    = require('./routesApi');
const Vision       = require('vision');

// Sanity check modules
const Checklist = [Bell, Boom, Cookie, Hapi, Vision, Inert, Nanoid, Nunjucks, NunjucksHapi, Routes, RoutesApi];
for (const o of Checklist) {
    if (o.error) {
        console.log(o.error.message);
        process.exit(1);
    }
}

// Setup environment
Dotenv.config();
const server = Hapi.server({ port: process.env.BASE_URL_PORT || 3000, });
require('./mvc/models/db');

// Setup Rendering engine
Nunjucks.installJinjaCompat();
Nunjucks.configure('views', {
    autoescape: true,
    cache: false,
    web: { async: true }
});

async function provision() {
  await server.register(Bell);
  await server.register(Cookie);
  await server.register(Inert);
  await server.register(Vision);

  server.views({
    engines: {
         njk: NunjucksHapi     // https://github.com/seldo/nunjucks-hapi
    },
    relativeTo: __dirname,
    path: './mvc/views',
    layoutPath: './mvc/views/layouts',
    partialsPath: './mvc/views/partials',
    isCached: false,
    layout: false        // warning; true renders (unwanted) raw html - nunjunks needs false.
  });

  let authCookieOptions = {
    password: Nanoid() + Nanoid(),  // String to encrypt auth cookie during authorization(min 32 chars)
    isSecure: false                 // 'true' in production (requires HTTPS)
  };

  server.auth.strategy('cookie-auth', 'cookie', authCookieOptions);

  let bellAuthOptions = {
    provider: process.env.OAUTH_PROVIDER,
    password: Nanoid() + Nanoid(),                  // String to encrypt temp cookie during authorization
    clientId: process.env.OAUTH_CLIENT_ID,          // *** Replace with your app Client Id ****
    clientSecret: process.env.OAUTH_CLIENT_SECRET,  // *** Replace with your app Client Secret ***
    isSecure: false                                 // 'true' in production (requires HTTPS)
  };

  server.auth.strategy('github-oauth', 'bell', bellAuthOptions);
  server.auth.default('cookie-auth');

  server.route(Routes);
  server.route(RoutesApi);
  await server.start();
  console.log(`server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

provision();
