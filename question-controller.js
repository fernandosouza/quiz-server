const Answer = require('./answers');
const QuestionAnswer = require('./questionAnswer');
const QuestionModel = require('./questions');

class Question {
  create(text, answers, correct) {
    if (!text) {
      return Promise.reject(new Error('You have to provide an text'));
    }

    if (!answers || !answers.length) {
      return Promise.reject(new Error('You have to provide answers'));
    }

    return QuestionModel
      .create({ text })
      .then(question => {
        return new Promise((resolve, reject) => {
          Answer.bulkCreate(answers)
          .then(savedAnswes => {
            resolve({ answers: savedAnswes, question })
            })
            .catch(error => reject(error));
        });
      })
      .then(({ answers, question }) => {
        return new Promise((resolve, reject) => {
          let questionAnswers = answers.map((answer, index) => {
            return {
              answerId: answer.dataValues.id,
              questionId: question.get('id'),
              correct: index == correct ? 1 : 0
            }
          });

          QuestionAnswer.bulkCreate(questionAnswers)
            .then(savedQuestionAnswers => {
              resolve({
                question,
                answers,
                savedQuestionAnswers
              })
            })
            .catch(error => reject(error));
        });
      })
  }
}

module.exports = Question;