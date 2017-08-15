const Sequelize = require('sequelize');
const sequelize = require('./connection');
const Answer = require('./answers');

const Question = sequelize.define('question', {
    text: {
        type: Sequelize.STRING
    }
  });
  
Question
    .sync({force: true})
    .then(() => {
        return Question.create({
            text: 'My First Question'
        });
    })
    .then(() => {
        Question.findById(1).then(question => {
            Answer.findById(1).then(answer => {
                // question.addAnswer(answer, {through: 'QuestionAnswer'});
            });
        });
    });

module.exports = Question;