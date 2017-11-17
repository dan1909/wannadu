var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: {type: Number},
  gender: {type: String, enum: ['male', 'female']},
  birthday: {type: Date},
  address: {type: String},
  email: {type: String},
  phone: {type: String},
  score: {type: Number, default: 0},
  photo: {type: String},
  aggregatedTraits: [{ type: String }],
  source: {type: String, enum: ['FB', 'GOOGLE']},
})

// UserSchema.pre("save", function (next) {
//   console.log("!!! Pre Save", this)
//   this.gender = this.gender.toLowerCase();
//   this.email = this.email.toLowerCase();
//   next();
// });

UserSchema.statics.updateOrCreateFbUser = async (userObj) => {
    const user = await mongoose.model('User').findOne({email: userObj.email})

    // A user exists, update fields
    let updatedUser = null
    if (user != null) {

      console.log("updateOrCreateFbUser: Update existing user", userObj.email)
      user.firstName = userObj.first_name
      user.lastName = userObj.last_name
      user.photo = userObj.picture.data.url
      user.source = 'FB'
      user.gender = userObj.gender
      updatedUser = await user.save()
    // No user, create new
    } else {
      console.log("updateOrCreateFbUser: Creating New user", userObj.email)
      const user = await mongoose.model('User').create(userObj)
      updatedUser = await user.save()
    }
    return updatedUser
}

//Export model
module.exports = mongoose.model('User', UserSchema)
