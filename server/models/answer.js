var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AnswerSchema = new Schema({
  content: { type: String, required: true },
  styles: { type: Object, default: {}},
  type: {type: String, enum: ['IMAGE', 'TEXT'], default: 'TEXT', required: true},
  addTraits: [{ type: String }],
  removeTraits: [{ type: String }],
  aggregatedTraits: [{ type: String }],
  // createdAt: {type: Date, default: Date.now, required: true},
  totalClicked: {type: Number, default: 0, required: true},
})

//Export model
module.exports = mongoose.model('Answer', AnswerSchema)
