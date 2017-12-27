var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSuggestionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  suggestionId: { type: Schema.Types.ObjectId, ref: 'Suggestion', required: true },
  createdAt: {type: Date, default: Date.now},
  isActive: {type: Boolean, default: true, required: true},
})

//Export model
module.exports = mongoose.model('UserSuggestion', UserSuggestionSchema)
