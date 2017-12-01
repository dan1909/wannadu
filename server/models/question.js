var mongoose = require('mongoose')
var Schema = mongoose.Schema
var random = require('mongoose-simple-random')


var QuestionSchema = new Schema({
  // content: { type: String },
  answers: [ { type: Schema.Types.ObjectId, ref: 'Answer', required: true }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: {type: Date, default: Date.now, required: true},
  // expDate: {type: Number, default: 30, required: true}, // Days
  // type: {type: String, enum: ['SYSTEM', 'FUN'], default: 'SYSTEM', required: true},
  totalExposures: {type: Number, default: 0, required: true},
  minAge: {type: Number, default: 0, required: true},
  maxAge: {type: Number, default: 100, required: true},
  isActive: {type: Boolean, default: true, required: true},
  isPending: {type: Boolean, default: false, required: true},
})

// Set random plugin to schema
QuestionSchema.plugin(random)

//Export model
module.exports = mongoose.model('Question', QuestionSchema)
