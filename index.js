'use strict';

const Bell         = require('@hapi/bell');
const Boom         = require('@hapi/boom');
const Bcrypt       = require('bcrypt');
const Cookies      = require('@hapi/cookie');
const Dotenv       = require('dotenv');
const Fs           = require('fs');
const Hapi         = require('@hapi/hapi');
const Inert        = require('@hapi/inert');
const Jwt          = require('hapi-auth-jwt2');
const { Nanoid }   = require('nanoid');
const Nunjucks     = require('nunjucks');
const NunjucksHapi = require('nunjucks-hapi');
const Routes       = require('./routes');
const RoutesApi    = require('./routesApi');
const Utils        = require('./api/utils.js');
const Vision       = require('@hapi/vision');

// Sanity check modules
const Checklist = [Bell, Boom, Bcrypt, Cookies, Dotenv, Fs, Hapi, Inert, Jwt, Nanoid, Nunjucks, NunjucksHapi,
  Routes, RoutesApi, Utils, Vision];

for (const o of Checklist) {
    if (o.error) {
        console.log(o.error.message);
        process.exit(1);
    }
}

// Setup environment
Dotenv.config();

//Use rookout
const rook = require('rookout');
rook.start({ token: '5a805c26b8ef89c391eb8b2f29117d93600321911dbf9cecee3fcf1ca67781d8' })

// Setup HTTPS
const server = Hapi.server({ port: process.env.BASE_PORT || 8000,
  routes: { cors: true } //,
  //tls: { key: Fs.readFileSync(process.env.TLS_KEY), cert: Fs.readFileSync(process.env.TLS_CERT) }
});
require('./mvc/models/db');

// Setup Rendering engine
Nunjucks.installJinjaCompat();
Nunjucks.configure('views', {
    autoescape: true,
    cache: false,
    web: { async: true }
});

// Authentication Options
let authCookieOptions = {
  password: Nanoid() + Nanoid(),   // Just generate some cookie password
  cookie: process.env.COOKIE_NAME,
  isSecure: false,                 // 'true' in production (requires HTTPS)
  ttl: 24 * 60 * 60 * 1000,
  redirectTo: '/'
};

let bellAuthOptions = {
  provider: process.env.OAUTH_PROVIDER,
  password: Nanoid() + Nanoid(),                  // String to encrypt temp cookie during authorization
  clientId: process.env.OAUTH_CLIENT_ID,          // *** Replace with your app Client Id ****
  clientSecret: process.env.OAUTH_CLIENT_SECRET,  // *** Replace with your app Client Secret ***
  isSecure: false                                 // 'true' in production (requires HTTPS)
};

let jwtAuthOptions = {
  key: process.env.JWT_SECRET_TOKEN,
  validate: Utils.validate,
  verifyOptions: { algorithms: ['HS256'] },
};

// View Options
let defaultView = {
  engines: {
    njk: NunjucksHapi     // https://github.com/seldo/nunjucks-hapi
  },
  relativeTo: __dirname,
  path: './mvc/views',
  layoutPath: './mvc/views/layouts',
  partialsPath: './mvc/views/partials',
  isCached: false,
  layout: false        // warning; true renders (unwanted) raw html - nunjunks needs false.
};

async function provision() {
  await server.register(Bell);
  await server.register(Cookies);
  await server.register(Inert);
  await server.register(Jwt);
  await server.register(Vision);

  server.views(defaultView);
  server.auth.strategy('cookie-auth', 'cookie', authCookieOptions);
  server.auth.strategy('github-oauth', 'bell', bellAuthOptions);
  server.auth.strategy('jwt', 'jwt', jwtAuthOptions);
  server.auth.default({
    mode: 'required',
    strategy: 'cookie-auth'
  });

  server.route(Routes);
  server.route(RoutesApi);
  await server.start();
  console.log(`server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

const result = provision();
console.log(result);