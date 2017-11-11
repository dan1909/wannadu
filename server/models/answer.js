var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AnswerSchema = new Schema({
  content: { type: String, required: true },
  styles: { type: Object, default: {}},
  type: {type: String, enum: ['IMAGE', 'TEXT']},
  properties: {type: Object, default: {}, required: true},
  createdAt: {type: Date, default: Date.now, required: true},
  totalCount: {type: Number, default: 0, required: true},
})

//Export model
module.exports = mongoose.model('Answer', AnswerSchema)
