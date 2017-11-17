var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TraitsSchema = new Schema({
  content: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: {type: Date, default: Date.now, required: true},
})

//Export model
module.exports = mongoose.model('Traits', TraitsSchema)
