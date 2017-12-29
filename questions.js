const Sequelize = require('sequelize');
const sequelize = require('./connection');
const Answer = require('./answers');
const options = require('./options');

const Question = sequelize.define('question', {
  text: {
    type: Sequelize.STRING
  }
})

Question
  .sync({ force: options.drop })
  .then((args) => {
    if (options.drop) {
      return Question.create({
        text: 'My First Question'
      });
    }
  })

module.exports = Question;