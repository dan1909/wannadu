var mongoose = require('mongoose')
var Schema = mongoose.Schema

var SuggestionSchema = new Schema({
  content: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: {type: Date, default: Date.now, required: true},
  location: {type: String, default: '', required: true},
  properties: {type: Object, default: {}, required: true},
  minAge: {type: Number, default: 0, required: true},
  maxAge: {type: Number, default: 100, required: true},
  addTraits: [{ type: String }],
  removeTraits: [{ type: String }],
  aggregatedTraits: [{ type: String }],
  isActive: {type: Boolean, default: true, required: true},
  isPending: {type: Boolean, default: false, required: true},
})

//Export model
module.exports = mongoose.model('Suggestion', SuggestionSchema)
