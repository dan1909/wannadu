var mongoose = require('mongoose')
var Schema = mongoose.Schema

var SuggestionSchema = new Schema({
  content: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: {type: Date, default: Date.now, required: true},
})

//Export model
module.exports = mongoose.model('Suggestion', SuggestionSchema)
