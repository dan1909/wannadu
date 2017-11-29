var mongoose = require('mongoose')
var Schema = mongoose.Schema
var consts = require('../consts')
var GeneralUtils = require('../utils/GeneralUtils')

const AnswerSchema = new Schema({
  content: { type: String, required: true },
  styles: { type: Object, default: {}},
  type: {type: String, enum: ['IMAGE', 'TEXT'], default: 'TEXT', required: true},
  traits: [{}],
  totalClicked: {type: Number, default: 0, required: true},
})

AnswerSchema.methods.getActiveAnswerTraits = function () {
  let answerTraits = {'positive': [], 'negative': []}
  for (let traitObj of this.traits) {
    const positive = traitObj['positive']
    const negative = traitObj['negative']
    if (positive > negative) {
      answerTraits['positive'].push(traitObj['name'])
    } else {
      answerTraits['negative'].push(traitObj['name'])
    }
  }
  return answerTraits
}

// Cannot use arrow function because it does not bind "this".
AnswerSchema.methods.udpateTraits = function(userPositiveTraits, userNegativeTraits, cb) {
  // console.log("!!!!!!!!!!! userPositiveTraits, userNegativeTraits", userPositiveTraits, userNegativeTraits)
  const _updateAnswerTraits = (userTraits, positive) => {
    for (const trait of userTraits) {
      const traitIndex = GeneralUtils.checkTraitInListOfTraits(trait, this.traits)

      // Trait exists in answer, add to positive /negative
      if (traitIndex != -1) {
        if (positive) {
          // this.traits[traitIndex]['positive']++
          const value = this.traits[traitIndex]
          this.traits.splice(traitIndex, 1)
          this.traits.push({name: value['name'],
                            positive: value['positive'] + 1,
                            negative: value['negative']})
        } else {
          // this.traits[traitIndex]['negative']++
          const value = this.traits[traitIndex]
          this.traits.splice(traitIndex, 1)
          this.traits.push({name: value['name'],
                            positive: value['positive'],
                            negative: value['negative'] + 1})
        }
      // New trait
      } else {
        if (positive)
          this.traits.push({name: trait, positive: 1, negative: 0})
        else {
          this.traits.push({name: trait, positive: 0, negative: 1})
        }
      }
    }
  }

  _updateAnswerTraits(userPositiveTraits, true)
  _updateAnswerTraits(userNegativeTraits, false)
  this.save()
  // for (const trait of userPositiveTraits) {
  //   traitIndex = GeneralUtils.checkTraitInListOfTraits(trait, this.traits)
  //   if (traitIndex != -1) {
  //     this.traits[traitIndex]++
  //   } else {
  //     this.traits.push({name: trait, positive: 1, negative: 0})
  //   }
  // }

  // for (let traitObj of this.aggregatedTraits) {
  //   console.log("!!!!!! trait after update is ", traitObj)
  //   for (let [traitName, value] of entries(traitObj)) {
  //     if (value > consts.UPDATE_TRAIT_THRESHOLD) {
  //       this.addTraits.push(traitName)
  //     }
  //   }
  // }
}

// assign a function to the "statics"
// AnswerSchema.statics.findByName = function(name, cb) {
//   return this.find({ name: new RegExp(name, 'i') }, cb);
// }

//Export model
module.exports = mongoose.model('Answer', AnswerSchema)
