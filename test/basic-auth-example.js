const Bcrypt = require('bcrypt');
const Hapi = require('hapi');
const BasicAuth = require('hapi-auth-basic');

const users = {
  john: {
    username: 'john',
    password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
    name: 'John Doe',
    id: '2133d32a'
  }
};

const validate = async (request, username, password, h) => {

  if (username === 'help') {
    return { response: h.redirect('https://hapijs.com/help') };     // custom response
  }
  const user = users[username];
  if (!user) {
    return { credentials: null, isValid: false };
  }
  const isValid = await Bcrypt.compare(password, user.password);
  const credentials = { id: user.id, name: user.name };
  return { isValid, credentials };
};

const main = async () => {

  const server = Hapi.server({ port: 4000 });
  await server.register(BasicAuth);
  server.auth.strategy('simple', 'basic', { validate });
  server.auth.default('simple');

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
      return 'welcome';
    }
  });

  await server.start();
  return server;
};

main()
    .then((server) => console.log(`Server listening on ${server.info.uri}`))
    .catch((err) => {

      console.error(err);
      process.exit(1);
    });
