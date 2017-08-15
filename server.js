const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
})

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['http://localhost:4200'],
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry']
})

server.pre(cors.preflight)
server.use(cors.actual)

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())

server.listen(8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});

module.exports = server;