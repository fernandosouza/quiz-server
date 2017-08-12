const restify = require('restify');
const model = require('./database');
const corsMiddleware = require('restify-cors-middleware');
 
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
  // res.send(req.params);
  model.addQuestion(req.params.text, resp => {
    res.send(resp);
  });
  return next();
});

server.get('/addOption/:text/:question', (req, res, next) => {
  let {text, question} = req.params;
  model.addOption(text, resp => {
    if (!question) {
      res.send(resp);
    }
    else {
      model.associateOptionToQuestion(resp.insertId, question, resp => {
        res.send(resp);
      });
    }
  });
  return next();
});

server.get('/questions', (req, res, next) => {
  model.getQuestions(resp => {
    res.send(resp);
  });
  return next();
});

server.get('/question/:id', (req, res, next) => {
  model.getQuestion(req.params.id, resp => {
    res.send(resp);
  });
  return next();
});
 
server.listen(8080, () => {
  console.log('%s listening at %s', server.name, server.url);
});