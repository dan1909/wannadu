var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserQuestionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  answerId: { type: Schema.Types.ObjectId, ref: 'Answer', required: true },
  createdAt: {type: Date, default: Date.now},
  isActive: {type: Boolean, default: true, required: true},
})

//Export model
module.exports = mongoose.model('UserQuestion', UserQuestionSchema)
