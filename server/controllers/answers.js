const Question = require('../models/question')
const Answer = require('../models/answer')
const UserQuestion = require('../models/userQuestion')
const User = require('../models/user')
const Suggestion = require('../models/suggestion')
const consts = require('../consts')

import mongoose from 'mongoose'

const getBestSuggestion = async (user) => {
  // return a random suggestion for now
  const suggestion = await Suggestion.findOne({})
  return suggestion
}

const postAnswer = async (req, res) => {
  try {
    console.log("postAnswer:: data", req.body)
    const questionId = req.body.question
    const answerId = req.body.answer
    const numQuestionAnswered = parseInt(req.body.numQuestionAnswered)

    // udpate total clicked
    Answer.update({'_id': answerId}, {$inc: {totalClicked: 1}}).exec()
    Question.update({'_id': questionId}, {$inc: {totalExposures: 1}}).exec()

    // Update the UserQuestion
    const userQuestion = new UserQuestion({
      userId: req.user._id,
      questionId: questionId,
      answerId: answerId
    })
    userQuestion.save()

    // Update the user traits
    const answer = await Answer.findOne(mongoose.Types.ObjectId(answerId)).exec()
    const answerTraits = answer.getActiveAnswerTraits()
    req.user.updateTraits(answerTraits['positive'], answerTraits['negative'])

    // Update the answer traits
    const userTraits = req.user.getActiveUserTraits()
    answer.udpateTraits(userTraits['positive'], userTraits['negative'])

    // If needed, get best suggestion for user
    if (numQuestionAnswered >= consts.MIN_QUESTIONS_FOR_SUGGESTION) {
      const suggestion = await getBestSuggestion(req.user)
      res.send(JSON.stringify(suggestion))
    } else {
      // Not enough questions answered...
      res.send(JSON.stringify({}))
    }

  } catch (e) {
    console.log('PostAnswer:: error posting answer', e)
    res.send({})
  }
}

exports.postAnswer = postAnswer
