const restify = require('restify');
const sequelize = require('./connection');
const corsMiddleware = require('restify-cors-middleware');

const Question = require('./questions');
const Answer = require('./answers');
require('./questionAnswer');
 
const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: ['http://localhost:4200'],
  allowHeaders: ['API-Token'],
  exposeHeaders: ['API-Token-Expiry']
})

server.pre(cors.preflight)
server.use(cors.actual)

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
 
server.get('/addQuestion/:text', (req, res, next) => {
  return next();
});

server.get('/addOption/:text/:question', (req, res, next) => {
  let {text, question} = req.params;
  return next();
});

server.get('/questions', (req, res, next) => {
  return next();
});

server.get('/question/:id', (req, res, next) => {
  return next();
});
 
server.listen(8080, () => {
  sequelize.authenticate()
  .then(() => {
    console.log('DB Connected');
  })
  .catch(() => {
    console.log('DB Connection Error');
  });
  console.log('%s listening at %s', server.name, server.url);
});