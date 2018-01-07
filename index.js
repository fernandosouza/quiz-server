const server = require('./server')
const sequelize = require('./connection')

const Question = require('./questions')
const Answer = require('./answers')
const QuestionAnswer = require('./questionAnswer')

const errors = require('restify-errors');
 
server.post('/addQuestion', (req, res, next) => {
  let { text } = req.body;
  if (!text) {
    return next(new Error('You have to provide an text'))
  }

  Question.create({ text })
    .then(query => res.send(query)
  )
  return next()
})

server.del('/question', (req, res, next) => {
  let { id } = req.body
  if (!id) {
    const error = new errors.BadDigestError('id is missing');
    res.send(error);
    return next();
  };
  Question.destroy({
    where: {
      id: id
    }
  }).then(question => {
    QuestionAnswer.destroy({
      where: {
        questionId: id
      }
    }).then(data => {
      res.send({
        status: `${question + 1} row(s) removed`
      })
    })
  })
  return next()
})

server.del('/questionAnswer', (req, res, next) => {
  let { id } = req.body
  if (!id) {
    const error = new errors.BadDigestError('id is missing');
    res.send(error);
    return next();
  };
  QuestionAnswer.destroy({
    where: {
      questionId: id
    }
  }).then(questionsAnsweres => {
    res.send({
      status: `${questionsAnsweres} row(s) removed`
    })
  })
  return next()
})

server.del('/option', (req, res, next) => {
  let { id } = req.body
  if (!id) {
    const error = new errors.BadDigestError('id is missing');
    res.send(error);
    return next();
  };
  Answer.destroy({
    where: {
      id: id
    }
  }).then(questionsAnsweres => {
    QuestionAnswer.destroy({
      where: {
        questionId: id
      }
    }).then(data => {
      res.send({
        status: `${questionsAnsweres} row(s) removed`
      })
    })
  })
  return next()
})

server.post('/addOption', (req, res, next) => {
  let { options } = req.body;
  let { questionId } = req.body;
  let { correct } = req.body;
  Answer.bulkCreate(options)
    .then(queryAllOptions => {
      let answers = queryAllOptions.map((answer, index) => {
        return {
          answerId: answer.dataValues.id,
          questionId: questionId,
          correct: index == correct ? 1 : 0
        }
      })
      QuestionAnswer.bulkCreate(answers).then(queryAll => {
        res.send(queryAllOptions)
      })
    }
  )
  return next()
})

server.get('/questions', (req, res, next) => {
  Question.findAll({
    order: [['id', 'DESC']],
    include: [{
      model: Answer
    }]
  }).then(questions => {
    res.send(questions)
  })
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

server.get('/questionAnswers/:questionId', (req, res, next) => {
  let { questionId } = req.params;
  Question.findById(questionId)
    .then(question => question.getAnswers())
    .then(answers => res.send(answers))
  return next()
})