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

server.put('/quiz', (req, res, next) => {
  let { questionId, answerId } = req.params;
  Question.findById(questionId).then(question => {
    if (!question) {
      res.send('Question not found');
    }
    Answer.findById(answerId).then(answer => {
      question.addAnswer(answer)
        .then(query => res.send(query))
    }).catch(e => {
      res.send('Answer not found')
    })
  })
  return next()
})