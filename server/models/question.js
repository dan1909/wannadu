var mongoose = require('mongoose')
var Schema = mongoose.Schema

var QuestionSchema = new Schema({
  content: { type: String, required: true },
  answers: [ { type: Schema.Types.ObjectId, ref: 'Answer', required: true }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: {type: Date, default: Date.now, required: true},
  expDate: {type: Number, default: 30, required: true}, // Days
  type: {type: String, enum: ['system', 'user', 'fun'], required: true},
  totalCount: {type: Number, default: 0, required: true},
  status: {type: String, enum: ['pending', 'live']},
  isActive: {type: Boolean, default: true, required: true}
})

//Export model
module.exports = mongoose.model('Question', QuestionSchema)
