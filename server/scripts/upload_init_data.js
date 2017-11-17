var User = require('../models/user')
var Answer = require('../models/answer')
var Question = require('../models/question')
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var mongoDB = 'mongodb://localhost/wannadu'
mongoose.connect(mongoDB, {useMongoClient: true})
var db = mongoose.connection;

const createQuestions = async (questions) => {
  for (let questionObj of questions) {
    createQuestion(questionObj)
  }
}

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
      return
    }

    const answersInDB = await Answer.insertMany(answers)

    for (let answerInDb of answersInDB) {
      question.answers.push(answerInDb._id)
    }

    question = new Question(question)
    const response = await question.save()

    console.log("Success!!")

  } catch (error) {
    console.log("createQuestion:: error", error)
  }
}

const questionObj = {
  question: {type: 'SYSTEM'},
  answers: [{content: 'Beer', type: 'TEXT', properties: {'alcohol': 1}},
            {content: 'Coca Cola', type: 'TEXT', properties: {'sweet tooth': 1}}]
}

const questions = [
	{question: {type: 'SYSTEM'},
	answers: [
      {content: 'Go out', addTraits: ['night life', 'outdoor'], removeTraits: ['stay home', 'indoor', 'by myself']},
      {content: 'Stay home', addTraits: ['stay home', 'indoor', 'by myself'], removeTraits: ['night life', 'outdoor']},
  ]},
  {question: {type: 'SYSTEM'},
	answers: [
      {content: 'Have a bath'},
      {content: 'Take a shower'},
  ]},
  {question: {type: 'SYSTEM'},
	answers: [
      {content: 'Panda'},
      {content: 'Qoala'}
  ]},
  {question: {type: 'SYSTEM'},
  answers: [
      {content: 'Hugs'},
      {content: 'Kisses'}
  ]},
  {question: {type: 'SYSTEM'},
  answers: [
      {content: 'katie_perry', type: 'IMAGE'},
      {content: 'rihana', type: 'IMAGE'}
  ]},
  {question: {type: 'SYSTEM'},
	answers: [
      {content: 'Drink', addTraits: ['night life', 'alcohol'], removeTraits: ['eat']},
      {content: 'Eat', addTraits: ['eat'], removeTraits: ['night life', 'alcohol']},
  ]},
  {question: {type: 'SYSTEM'},
	answers: [
      {content: 'Thrill', addTraits: [ 'physical activity'], removeTraits: ['stay home']},
      {content: 'Chill', addTraits: ['stay home'], removeTraits: ['physical activity']},
  ]},
  {question: {type: 'SYSTEM'},
	answers: [
      {content: 'Leave me alone', addTraits: ['by myself'], removeTraits: ['with friends']},
      {content: 'Where is everybody?', addTraits: ['with friends', 'night life'], removeTraits: ['by myself']},
  ]},
  {question: {type: 'SYSTEM'},
	answers: [
      {content: 'Step on a fresh dog-shit'},
      {content: 'Sit on chocolate ice-cream'},
  ]},
  {question: {type: 'SYSTEM'},
	answers: [
      {content: 'A good series', addTraits: ['tv']},
      {content: 'A good movie', addTraits: ['movie']},
  ]},
]

// const questionObj = {
//   question: {type: 'FUN'},
//   answers: [{content: 'rihana', type: 'IMAGE', properties: {'cool': 1}},
//             {content: 'katie_perry', type: 'IMAGE', properties: {'home': 1}}]
// }
createQuestions(questions)

// createQuestion(questionObj)
