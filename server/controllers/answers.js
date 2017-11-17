const Question = require('../models/question')
const Answer = require('../models/answer')
const UserQuestion = require('../models/userQuestion')
const User = require('../models/user')
const Suggestion = require('../models/suggestion')
const consts = require('../consts')

import mongoose from 'mongoose'

const getBestSuggestion = async (user) => {
  console.log("!!!!! getBestSuggestion", user)
  const suggestion = await Suggestion.find()[0]
  return suggestion
}

const updateUserProperties = async (user, answer) => {
  console.log("!!!!! updateUserProperties")
}

const updateAnswerProperties = async (user, answer) => {
  console.log("!!!!! updateAnswerProperties")
}

const postAnswer = async (req, res) => {
  try {
    console.log("postAnswer:: data", req.body)
    const questionId = req.body.question
    const answerId = req.body.answer
    const numQuestionAnswered = parseInt(req.body.numQuestionAnswered)

    // Update the UserQuestion
    const userQuestion = new UserQuestion({
      userId: req.user._id,
      questionId: questionId,
      answerId: answerId
    })
    userQuestion.save()

    // Update the user and answer properties
    const answer = await Answer.findOne(mongoose.Types.ObjectId(answerId)).exec()
    updateUserProperties(req.user, answer)
    updateAnswerProperties(req.user, answer)

    // If needed, get best suggestion for user
    if (numQuestionAnswered > consts.minQuestionsForSuggestion) {
      const suggestion = await getBestSuggestion(req.user)
      res.send(JSON.stringify(suggestion))
    } else {
      res.send(null)
    }
  } catch (e) {
    console.log('PostAnswer:: error posting answer', e)
    res.send({})
  }
}

exports.postAnswer = postAnswer
