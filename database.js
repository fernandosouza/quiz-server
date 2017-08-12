const mysql      = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'quiz'
});

const {
  objectToArray,
  generateORQuery,
  mapOptionsByQuestionId } = require('./utils.js');

connection.connect();

function getQuestions(fn) {
  connection.query('SELECT * FROM questions', (error, results, fields) => {
    if (error) throw error;
    if (results.length) {
      const questionsId = results.map(question => question.id);
      if (questionsId) {
        getOption(questionsId, data => {
          results.forEach(line => {
            let options = data[line.id];
            if (options) {
              line.ops = objectToArray(options, 'id', 'text');
            }
          });
          fn(results);
        });
      }
      else {
        fn(results);
      }
    }
    else {
      console.log('aasdfa');
      fn(results);
    }
  });
}

function getOption(optionId, fn) {
  if (Array.isArray(optionId)) {
    optionId = generateORQuery(optionId, 'question_options.id_question');
  }
  const query = `
    SELECT options.*, question_options.id_question FROM options inner 
      join question_options on question_options.id_question = ${optionId}
  `;
  connection.query(query, (error, results, fields) => {
    if (error) throw error;
    fn(mapOptionsByQuestionId(results));
  });
}

function getQuestion(questionId, fn) {
  connection.query('SELECT * FROM questions WHERE id = ' + questionId, (error, results, fields) => {
    if (error) throw error;
    let question = results[0];
    getOptionsByQuestion(results[0].id, function(res) {
      question.ops = res;
      fn(question);
    });
  });
}

function getOptionsIDByQuestion(questionId, fn = function(){}) {
  if (Array.isArray(questionId)) {
    questionId = generateORQuery(questionId, 'id_question');
  }
  connection.query('SELECT * FROM question_options WHERE id_question = ' + questionId, (error, results, fields) => {
    if (error) throw error;
    fn(results);
  });
}

function getOptionsByQuestion(questionId, fn = function(){}) {
  if (Array.isArray(questionId)) {
    questionId = generateORQuery(questionId, 'id_question');
  }
  connection.query('SELECT id_option FROM question_options WHERE id_question = ' + questionId, (error, results, fields) => {
    if (error) throw error;
    let idOptions = results.map(option => option.id_option);
    getOption(idOptions, (results) => {
      fn(results);
    });
  });
}

function addQuestion(text, fn) {
  connection.query('INSERT INTO questions SET ?', {text: text}, (error, results, fields) => {
    if (error) throw error;
    fn(results);
  });
}

function addOption(text, fn) {
  connection.query('INSERT INTO options SET ?', {text: text}, (error, results, fields) => {
    if (error) throw error;
    fn(results);
  });
}

function associateOptionToQuestion(option, question, fn) {
  let cols = {'id_question': question, 'id_option': option};
  connection.query('INSERT INTO question_options SET ?', cols, (error, results, fields) => {
    if (error) throw error;
    fn(results);
  });
}


// connection.end();

module.exports = {
  getQuestions,
  getQuestion,
  getOption,
  getOptionsByQuestion,
  addQuestion,
  addOption,
  associateOptionToQuestion
};