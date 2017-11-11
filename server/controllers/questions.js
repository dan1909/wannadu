var Question = require('../models/question')
var Answer = require('../models/answer')
import mockData from '../MOCK_DATA'
import mongoose from 'mongoose'

exports.getQuestionsList = async (req, res) => {
  try {
    
    // Get questions from DB
    const questions = await Question.find().exec()
    let answerArr = []
    let dataForClient = []
    for (const [index, question] of questions.entries()) {

      // Get all answers for this question
      for (let answerId of question.answers) {

        // TODO: can findById()
        let answerObj = await Answer.findOne(mongoose.Types.ObjectId(answerId)).exec()
        answerArr.push(answerObj)
      }
      dataForClient[index] = {'question': question,
                              'answers': answerArr}
    }

    // If no questions, return mockData for now....
    if (questions.length == 0) {
      res.send(JSON.stringify(mockData))
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
