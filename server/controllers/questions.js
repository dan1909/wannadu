var Question = require('../models/question')
var UserQuestion = require('../models/userQuestion')
var Answer = require('../models/answer')
const consts = require('../consts')
import mongoose from 'mongoose'

exports.getQuestionsList = async (req, res) => {
  try {

    // Existing user questions
    const userQuestionsIds = await UserQuestion.find({}).
      where('userId').equals(req.user._id).
      distinct('questionId').
      exec()

    const answersWithTraits = await Answer.find({}).
      where('traits').gt([]).
      distinct('_id').
      exec()

    // Get questions from DB

    // Get questions with traits (we want max MAX_QUESTIONS_WITH_TRAITS)
    const questionsWithTraits = await Question.find({}).
      where('answers').in(answersWithTraits).
      where('_id').nin(userQuestionsIds).
      limit(consts.MAX_QUESTIONS_WITH_TRAITS).
      populate('answers').
      exec()

    const questionsWithTraitsIds = questionsWithTraits.map(a => a._id)

    // Get all remaining questions excluding userExisting questions and
    // questions with traits from before.
    const remainingQuestions = await Question.find({}).
      where('_id').nin(userQuestionsIds.concat(questionsWithTraitsIds)).
      limit(consts.MAX_QUESTIONS_TOTAL - questionsWithTraits.length).
      populate('answers').
      exec()

    const questionsToClient = remainingQuestions.concat(questionsWithTraits)

    // If no questions, empty array
    if (questionsToClient.length == 0) {
      res.send(JSON.stringify([]))
    } else {
      res.send(JSON.stringify(questionsToClient))
    }
  } catch (e) {
    console.log ("Error in getting questions", e)
  }
}

exports.createQuestion = async (req, res) => {
  console.log(req.body)
  res.send({})
}
