var Question = require('../models/question')
var UserQuestion = require('../models/userQuestion')
var Answer = require('../models/answer')
const consts = require('../consts')
import mongoose from 'mongoose'

exports.getQuestionsList = async (req, res) => {
  try {

    // Existing user questions
    const userQuestionsIds = await UserQuestion.find({'userId': req.user._id}).distinct('questionId').exec()
    const answersWithTraits = await Answer.find({traits: {$gt: []}}).distinct('_id').exec()
    const answersWithNoTraits = await Answer.find({traits: {$eq: []}}).distinct('_id').exec()

    // Get questions from DB
    const questionsWithTraits = await Question.find({
      'answers': {$in: answersWithTraits },
      '_id': {$nin: userQuestionsIds}
    }).limit(consts.MAX_QUESTIONS_WITH_TRAITS).exec()

    const questionsWithNoTraits = await Question.find({
      'answers': {$in: answersWithNoTraits},
      '_id': {$nin: userQuestionsIds},
    }).limit(consts.MAX_QUESTIONS_WITHOUT_TRAITS).exec()

    const questions = questionsWithTraits.concat(questionsWithNoTraits)
    console.log("!!!!!!!!! questions", questions)

    let dataForClient = []
    for (const [questionId, question] of questions.entries()) {
      let answerArr = []

      // Get all answers for this question
      for (let answerId of question.answers) {

        // TODO: can findById()
        let answerObj = await Answer.findOne(mongoose.Types.ObjectId(answerId)).exec()
        answerArr.push(answerObj)
      }
      dataForClient[questionId] = {'question': question,
                              'answers': answerArr}
    }

    // If no questions, return mockData for now....
    if (questions.length == 0) {
      res.send(JSON.stringify([]))
    } else {
      res.send(JSON.stringify(dataForClient))
    }
  } catch (e) {
    console.log ("Error in getting questions", e)
  }
}

exports.createQuestion = async (req, res) => {
  console.log(req.body)
  res.send({})
}
