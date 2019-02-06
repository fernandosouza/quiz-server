const Sequelize = require('sequelize');
const sequelize = require('./connection');
const options = require('./options');

const QuestionModel = sequelize.define('question', {
  text: {
    type: Sequelize.STRING
  }
})

QuestionModel
  .sync({ force: options.drop })
  .then((args) => {
    if (options.drop) {
      return Question.create({
        text: 'My First Question'
      });
    }
  })


module.exports = QuestionModel;