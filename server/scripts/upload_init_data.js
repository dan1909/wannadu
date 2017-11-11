var User = require('../models/user')
var Answer = require('../models/answer')
var Question = require('../models/question')
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var mongoDB = 'mongodb://localhost/wannadu'
mongoose.connect(mongoDB, {useMongoClient: true})
var db = mongoose.connection;

// var user = new User ({
//   first_name: 'Dan',
//   last_name: 'Kowarsky',
//   age: 32,
//   sex: 'MALE',
//   email: 'Dan.kowarsky.gmail.com',
// })
// User.findOneOrCreate({'email': 'Dan.kowarsky.gmail.com'}, user, function (err, res) {
//   if (err)
//     console.log ('Error on save!', err)
//   if (res)
//     console.log ('res', res)
// })
const getUser = async () => {
  try {

    const user = await User.findOne({'email': 'dankovarski@gmail.com'})
    console.log("!!!!!!! user", user)
    const answer = new Answer({
            content: 'This is a test of mongoose ref',
            properties: {'Mongoose': 1},
            createdBy: user._id
    })
    answer.save()

  } catch (e) {
    console.log("!!!!!!! e", e)
  }
}

const getAnswer = async () => {
  try {

    const answer = await Answer.findOne({'content': 'This is a test of mongoose ref'}).
                  populate('createdBy', 'firstName')
    // console.log("!!! answer BEFORE", answer)
    // answer = answer.populate('createdBy')
    console.log("!!! answer AFTER ", answer)
    return

  } catch (e) {
    console.log ("!!!!!!!!! e", e)
  }

}

getAnswer()
// getUser()


// var answer_1 = new Answer ({
//   content: 'katie_perry',
//   properties: {'test': true},
//   created_by: 1,
// })
// var answer_2 = new Answer ({
//   content: 'rihana',
//   properties: {'test2': true},
//   created_by: 1,
// })
//
// Answer.insertMany([answer_1, answer_2]).then(function(res) {
//   console.log ('!!!! res', res)
// })

// var question = new Question ({
//   content: 'Rihana or Katie',
//   answers: ['ObjectId("59e90546b637a022a4d8a54c")', 'ObjectId("59e90546b637a022a4d8a54d")'],
//   created_by: 1,
//   exp_date: 14,
//   type: 'fun',
// })
// question.save().then(function(res) {
//   console.log ('!!!! res', res)
// })
