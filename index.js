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
  return next()
})

server.get('/question/:id', (req, res, next) => {
  return next()
})