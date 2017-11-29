var mongoose = require('mongoose')
var Schema = mongoose.Schema
var GeneralUtils = require('../utils/GeneralUtils')

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
  traits: [{}],
  source: {type: String, enum: ['FB', 'GOOGLE']},
})

UserSchema.methods.updateTraits = function (answerPositiveTraits, answerNegativeTraits) {
  const _updateUserTraits = (answerTraits, positive) => {
    for (let trait of answerTraits) {
      const traitIndex = GeneralUtils.indexOfTrait(trait, this.traits)

      // Trait exists in answer, add to positive /negative
      if (traitIndex != -1) {
        const value = this.traits[traitIndex]
        this.traits.splice(traitIndex, 1)

        if (positive) {
          this.traits.push({name: value['name'],
                            positive: value['positive'] + 1,
                            negative: value['negative'],
                            updatedAt: new Date(),
                            lastUpdate: 'positive'})
        } else {
          this.traits.push({name: value['name'],
                            positive: value['positive'],
                            negative: value['negative'] + 1,
                            updatedAt: new Date(),
                            lastUpdate: 'negative'})
        }
      // New trait
      } else {
        if (positive)
          this.traits.push({name: trait, positive: 1, negative: 0, udpatedAt: new Date(), lastUpdate: 'positive'})
        else {
          this.traits.push({name: trait, positive: 0, negative: 1, udpatedAt: new Date(), lastUpdate: 'negative'})
        }
      }
    }
  }

  _updateUserTraits(answerPositiveTraits, true)
  _updateUserTraits(answerNegativeTraits, false)
  this.save()
}

UserSchema.methods.getActiveUserTraits = function () {
  let userActiveTraits = {'positive': [], 'negative': []}
  for (let traitObj of this.traits) {
    const now = new Date()
    const secondsFromLastUpdate = (now - traitObj['updatedAt']) / 1000

    // Check if the trait was updated in the last hour, if so take the lastUpdated
    // ignoring the total positive and negative count
    if (secondsFromLastUpdate < 3600) {
      if (traitObj['lastUpdate'] == 'positive')
        userActiveTraits['positive'].push(traitObj['name'])
      else
        userActiveTraits['negative'].push(traitObj['name'])
    // Check the positive and negative of the total count for this trait
    } else {
      const positive = traitObj['positive']
      const negative = traitObj['negative']
      if (positive > negative) {
        userActiveTraits['positive'].push(traitObj['name'])
      } else {
        userActiveTraits['negative'].push(traitObj['name'])
      }
    }
  }
  return userActiveTraits
}

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
      console.log("updateOrCreateFbUser: Creating New user", userObj.email, userObj)
      let user = {}
      user.firstName = userObj.first_name
      user.lastName = userObj.last_name
      user.photo = userObj.picture.data.url
      user.source = 'FB'
      user.email = userObj.email
      user.gender = userObj.gender
      user = await mongoose.model('User').create(user)
      updatedUser = await user.save()
    }
    return updatedUser
}

//Export model
module.exports = mongoose.model('User', UserSchema)
