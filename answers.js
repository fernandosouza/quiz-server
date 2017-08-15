const Sequelize = require('sequelize');
const sequelize = require('./connection');

const Answer = sequelize.define('answer', {
    text: {
        type: Sequelize.STRING
    }
  });
  
Answer.sync({force: true}).then(() => {
    return Answer.create({
        text: 'My First Answer'
    });
});

module.exports = Answer;