const server = require('./server');
const sequelize = require('./connection');

const Question = require('./questions');
const Answer = require('./answers');
require('./questionAnswer');
 
server.get('/addQuestion/:text', (req, res, next) => {
  Question.create({
    text: 'abc'
  }).then(query => {
    res.send(query);
  });
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