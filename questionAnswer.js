const Sequelize = require('sequelize');
const sequelize = require('./connection');
const Answer = require('./answers');
const QuestionModel = require('./questions');
const options = require('./options');

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

QuestionAnswer.sync({ force: options.drop }).then(e => {
  QuestionModel.belongsToMany(Answer, {through: QuestionAnswer, constraints: false})
  Answer.belongsToMany(QuestionModel, {through: QuestionAnswer, constraints: false})
})

module.exports = QuestionAnswer;