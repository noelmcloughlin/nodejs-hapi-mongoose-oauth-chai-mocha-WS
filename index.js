'use strict';

async function check(objects) {
    for (const o of objects) {
        if (o.error) {
            console.log(o.error.message);
            process.exit(1);
        }
    }
}

const Dotenv     = require('dotenv')
const Result     = Dotenv.config();
const Hapi       = require('hapi');
const HapiCookie = require('hapi-auth-cookie');
const Vision     = require('vision');
const Inert      = require('inert');
const Nunjucks   = require('nunjucks');
const Routes     = require('./routes');
const server     = Hapi.server({ port: process.env.PORT || 3000, });
require('./app/models/db');

// Check we are okay
check([Result, Hapi, HapiCookie, Vision, Inert, Nunjucks, Routes, server])


async function provision() {
  //#await server.register(Inert);
  //#await server.register(Vision);
  //#await server.register(HapiCookie);
  await server.register(require('inert'));
  await server.register(require('vision'));
  await server.register(require('hapi-auth-cookie'));

  server.views({
    engines: { // Vision Templates rendering support for Hapi: https://github.com/hapijs/vision#nunjucks
      njk: {
                compile: (src, options) => {
                    const template = Nunjucks.compile(src, options.environment);
                    return (context) => {
                        return template.render(context);
                    };
                },

                prepare: (options, next) => {
                    options.compileOptions.environment = Nunjucks.configure(options.path, { watch : false });
                    return next();
                }
           },
    },
    relativeTo: __dirname,
    path: './app/views',
    layoutPath: './app/views/layouts',
    partialsPath: './app/views/partials',
    layout: true,
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
