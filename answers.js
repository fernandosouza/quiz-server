const Sequelize = require('sequelize');
const sequelize = require('./connection');
const options = require('./options');

const Answer = sequelize.define('answer', {
  text: {
    type: Sequelize.STRING
  }
})
  
Answer.sync({ force: options.drop }).then(() => {
  if (options.drop) {
    return Answer.create({
      text: 'My First Answer'
    });
  }
})

module.exports = Answer;