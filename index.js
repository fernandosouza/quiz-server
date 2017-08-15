const server = require('./server')
const sequelize = require('./connection')

const Question = require('./questions')
const Answer = require('./answers')
require('./questionAnswer')
 
server.post('/addQuestion', (req, res, next) => {
  let { text } = req.params;
  Question.create({ text })
    .then(query => res.send(query)
  )
  return next()
})

server.post('/addOption', (req, res, next) => {
  let { text } = req.params;
  Answer.create({ text })
    .then(query => res.send(query)
  )
  return next()
})

server.get('/questions', (req, res, next) => {
  Question.findAll().then(query => res.send(query))
  return next()
})

server.get('/answeres', (req, res, next) => {
  Answer.findAll().then(query => res.send(query))
  return next()
})

server.get('/question/:id', (req, res, next) => {
  let { id } = req.params;
  Question.findById(id).then(query => res.send(query))
  return next()
})

server.get('/answere/:id', (req, res, next) => {
  let { id } = req.params;
  Answer.findById(id).then(query => res.send(query))
  return next()
})