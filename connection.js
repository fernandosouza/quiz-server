Sequelize = require('sequelize');

const sequelize = new Sequelize('quiz', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  })

sequelize.authenticate()
  .then(() => {
    console.log('DB Connected');
  })
  .catch(() => {
    console.log('DB Connection Error');
  })

module.exports = sequelize;