const Sequelize = require('sequelize');
const sequelize = require('./connection');
const Answer = require('./answers');
const Question = require('./questions');

const QuestionAnswer = sequelize.define('questionanswer', {
  'questionId': {
    type: Sequelize.NUMERIC
  },
  'answerId': {
    type: Sequelize.NUMERIC
  },
  'correct': {
    type: Sequelize.BOOLEAN,
    value: false
  }
})
QuestionAnswer.sync({force: true}).then(e => {
  Question.belongsToMany(Answer, {through: QuestionAnswer})
  Answer.belongsToMany(Question, {through: QuestionAnswer})
})