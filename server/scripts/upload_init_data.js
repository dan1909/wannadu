var User = require('../models/user')
var Answer = require('../models/answer')
var Question = require('../models/question')
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var mongoDB = 'mongodb://localhost/wannadu'
mongoose.connect(mongoDB, {useMongoClient: true})
var db = mongoose.connection;

const createQuestion = async (questionObj) => {

  try {
    console.log("!!!!!!! questionObj", questionObj)
    const user = await User.findOne({'email': 'dankovarski@gmail.com'})
    let answers = questionObj.answers
    let question = questionObj.question

    if (question.answers == null) {
        question.answers = []
    }
    question.createdBy = user._id
    if (answers == null || answers.length < 2) {
      console.log("illegal answer fortmat ", answers)
    }

    const answersInDB = await Answer.insertMany(answers)

    for (let answerInDb of answersInDB) {
      question.answers.push(answerInDb._id)
    }

    question = new Question(question)
    const response = await question.save()

    console.log("Success!!")
    process.exit()

  } catch (error) {
    console.log("createQuestion:: error", error)
    process.exit()
  }
}

const questionObj = {
  question: {type: 'SYSTEM'},
  answers: [{content: 'Beer', type: 'TEXT', properties: {'alcohol': 1}},
            {content: 'Coca Cola', type: 'TEXT', properties: {'sweet tooth': 1}}]
}
// const questionObj = {
//   question: {type: 'FUN'},
//   answers: [{content: 'rihana', type: 'IMAGE', properties: {'cool': 1}},
//             {content: 'katie_perry', type: 'IMAGE', properties: {'home': 1}}]
// }

createQuestion(questionObj)
