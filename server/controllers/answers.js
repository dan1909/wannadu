const Question = require('../models/question')
const Answer = require('../models/answer')
const UserQuestion = require('../models/userQuestion')
const User = require('../models/user')

import mongoose from 'mongoose'

exports.postAnswer = async (req, res) => {
  try {
    console.log(req.body)
    const questionId = req.body.question
    const answerId = req.body.answer

    console.log(req.user)
    const userQuestion = new UserQuestion({
      userId: req.user._id,
      questionId: questionId,
      answerId: answerId
    })

    await userQuestion.save()
    res.send(userQuestion._id)
  } catch (e) {
    console.log('PostAnswer:: error posting answer', e)
    res.send({})
  }
}
