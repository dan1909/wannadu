var mongoose = require('mongoose')
var Schema = mongoose.Schema

var AnswerSchema = new Schema({
  content: { type: String, required: true },
  styles: { type: Object, default: {}},
  properties: {type: Object, default: {}, required: true},
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: {type: Date, default: Date.now, required: true},
  totalCount: {type: Number, default: 0, required: true},
})

//Export model
module.exports = mongoose.model('Answer', AnswerSchema)
