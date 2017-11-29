var User = require('../models/user')
var Answer = require('../models/answer')
var Question = require('../models/question')
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
var mongoDB = 'mongodb://localhost/wannadu'
mongoose.connect(mongoDB, {useMongoClient: true})
var db = mongoose.connection;

// const createSuggestions = (suggestions) => {
//   for (let suggestion of suggestions) {
//     createSuggestion(suggestion)
//   }
// }
//
// const createSuggestion = async (suggestion) => {
//   try {
//     const user = await User.findOne({'email': 'dankovarski@gmail.com'})
//     suggestion.createdBy = user._id
//     let s = new Suggestion(suggestion)
//     await s.save()
//     console.log("Success!!")
//
//   } catch (e) {
//     console.log("createSuggestion:: Error", e )
//   }
// }

const createQuestions = (questions) => {
  for (let questionObj of questions) {
    createQuestion(questionObj)
  }
}

const createQuestion = async (questionObj) => {

  try {
    const user = await User.findOne({'email': 'dankovarski@gmail.com'})
    let answers = questionObj.answers
    let question = questionObj.question

    if (question.answers == null) {
        question.answers = []
    }
    question.createdBy = user._id
    if (answers == null || answers.length < 2) {
      console.log("illegal answer fortmat ", answers)
      return
    }

    for (let answer of answers) {
      answer['traits'] = []
      if (answer['addTraits'] != null) {
        for (let addTrait of answer['addTraits']) {
          answer['traits'].push({'name': addTrait, 'positive': 100, 'negative': 0})
        }
      }
        delete answer['addTraits']
      if (answer['removeTraits']) {
        for (let removeTrait of answer['removeTraits']) {
          answer['traits'].push({'name': removeTrait, 'positive': 0, 'negative': 100})
        }
        delete answer['removeTraits']
      }
    }
    console.log("!!!!!!!! answer", answers)

    const answersInDB = await Answer.insertMany(answers)

    for (let answerInDb of answersInDB) {
      question.answers.push(answerInDb._id)
    }

    question = new Question(question)
    const response = await question.save()

    console.log("Success!!")

  } catch (error) {
    console.log("createQuestion:: error", error)
  }
}

const questions = [
	{question: {type: 'SYSTEM'},
	answers: [
      {content: 'Go out', addTraits: ['night life', 'outdoor'], removeTraits: ['stay home', 'indoor', 'by myself']},
      {content: 'Stay home', addTraits: ['stay home', 'indoor', 'by myself'], removeTraits: ['night life', 'outdoor']},
  ]},
  {question: {type: 'SYSTEM'},
	answers: [
      {content: 'Have a bath'},
      {content: 'Take a shower'},
  ]},
  {question: {type: 'SYSTEM'},
	answers: [
      {content: 'Panda'},
      {content: 'Qoala'}
  ]},
  {question: {type: 'SYSTEM'},
  answers: [
      {content: 'Hugs'},
      {content: 'Kisses'}
  ]},
  {question: {type: 'SYSTEM'},
  answers: [
      {content: 'katie_perry', type: 'IMAGE'},
      {content: 'rihana', type: 'IMAGE'}
  ]},
  {question: {type: 'SYSTEM'},
	answers: [
      {content: 'Drink', addTraits: ['night life', 'alcohol'], removeTraits: ['eat']},
      {content: 'Eat', addTraits: ['eat'], removeTraits: ['night life', 'alcohol']},
  ]},
  {question: {type: 'SYSTEM'},
	answers: [
      {content: 'Thrill', addTraits: [ 'physical activity'], removeTraits: ['stay home']},
      {content: 'Chill', addTraits: ['stay home'], removeTraits: ['physical activity']},
  ]},
  {question: {type: 'SYSTEM'},
	answers: [
      {content: 'Leave me alone', addTraits: ['by myself'], removeTraits: ['with friends']},
      {content: 'Where is everybody?', addTraits: ['with friends', 'night life'], removeTraits: ['by myself']},
  ]},
  {question: {type: 'SYSTEM'},
	answers: [
      {content: 'Step on a fresh dog-shit'},
      {content: 'Sit on chocolate ice-cream'},
  ]},
  {question: {type: 'SYSTEM'},
	answers: [
      {content: 'A good series', addTraits: ['tv']},
      {content: 'A good movie', addTraits: ['movie']},
  ]},
]

// const suggestions = [
//   {content: 'Go see a movie at Cinema City Glilot',
//    properties: {location: '32.1464214,34.8047489', link: 'wwww.cinmacity.co.il'},
// 	 relevantTraits: ['movies', 'night life'],
// 	 vetoTraits: ['stay home'],
// },
// {content: 'cook your girl a nice dinner',
//  properties: {link: 'wwww.10minutesmeal.com'},
//  minAge: 16,
//  relevantTraits: ['movies', 'night life'],
//  vetoTraits: ['stay home'],
// },
// {content: 'Go see a movie at Cinema City Glilot',
//  properties: {location: '32.1464214,34.8047489', link: 'wwww.cinmacity.co.il'},
//  relevantTraits: ['movies', 'night life'],
//  vetoTraits: ['stay home'],
// }
// {
// 	'suggestionId': 's100002',
// 	'authorUserId': 'u1'
// 	'created': '2017-11-11 09:26:21'
// 	'totalExposures': 0,
// 	'text': 'Cook your girl a nice dinner',
// 	'textColor': 'white',
// 	'backgroundColor': 'pink',
// 	'link': 'wwww.10minutesmeal.com',
// 	'location': ()
// 	'minAge': 16,
// 	'maxAge': null,
// 	'avergeAgeLiked': null,
// 	'stddevAgeLiked': null,
// 	'avergeAgeDisliked': null,
// 	'stddevAgeDisliked': null,
// 	'likedBy': [],
// 	'dislikedBy': [],
// 	'relevantTraits': [
// 		'in a relationship',
// 		'stay home',
// 		'cooking',
// 		'eat',
// 		'with a partner'
// 	],
// 	'vetoTraits': [
// 		'junk food',
// 		'night life',
// 		'sport',
// 		'family',
// 		'with friends',
// 		'by myself'
// 	],
// 	'aggregatedTraits': {}  },
// {
// 	'suggestionId': 's100003',
// 	'authorUserId': 'u1'
// 	'created': '2017-11-11 09:35:21'
// 	'totalExposures': 0,
// 	'text': 'Order pizza and watch "Making a murderer" on Netflix',
// 	'textColor': 'white',
// 	'backgroundColor': 'red',
// 	'link': 'wwww.netflix.com',
// 	'location': ()
// 	'minAge': 17,
// 	'maxAge': null,
// 	'avergeAgeLiked': null,
// 	'stddevAgeLiked': null,
// 	'avergeAgeDisliked': null,
// 	'stddevAgeDisliked': null,
// 	'likedBy': [],
// 	'dislikedBy': [],
// 	'relevantTraits': [
// 		'junk food',
// 		'stay home',
// 		'tv',
// 		'netflix'
// 		'documentry'
// 		'eat',
// 		'pizza'
// 	],
// 	'vetoTraits': [
// 		'cooking',
// 		'night life',
// 		'sport',
// 	],
// 	'aggregatedTraits': {}  },
// {
// 	'suggestionId': 's100004',
// 	'authorUserId': 'u1'
// 	'created': '2017-11-11 10:11:11'
// 	'totalExposures': 0,
// 	'text': 'Go for a bicycle ride in the park',
// 	'textColor': 'white',
// 	'backgroundColor': 'green',
// 	'link': null,
// 	'location': (32.1007717,34.8118973)
// 	'minAge': 14,
// 	'maxAge': null,
// 	'avergeAgeLiked': null,
// 	'stddevAgeLiked': null,
// 	'avergeAgeDisliked': null,
// 	'stddevAgeDisliked': null,
// 	'likedBy': [],
// 	'dislikedBy': [],
// 	'relevantTraits': [
// 		'sport',
// 		'bicycle',
// 		'physical activity',
// 		'outdoor',
// 	],
// 	'vetoTraits': [
// 		'stay home',
// 		'night life',
// 		'eat',
// 		'alcohol',
// 		'rain',
// 		'indoor',
// 	],
// 	'aggregatedTraits': {}  },
// {
// 	'suggestionId': 's100005',
// 	'authorUserId': 'u1'
// 	'created': '2017-11-11 11:11:11'
// 	'totalExposures': 0,
// 	'text': 'Play some tunes and clean your house',
// 	'textColor': 'white',
// 	'backgroundColor': 'green',
// 	'link': null,
// 	'location': (32.1007717,34.8118973)
// 	'minAge': 15,
// 	'maxAge': null,
// 	'avergeAgeLiked': null,
// 	'stddevAgeLiked': null,
// 	'avergeAgeDisliked': null,
// 	'stddevAgeDisliked': null,
// 	'likedBy': [],
// 	'dislikedBy': [],
// 	'relevantTraits': [
// 		'indoor',
// 		'stay home',
// 		'productive',
// 		'physical activity',
// 		'chores',
// 		'cleaning',
// 	],
// 	'vetoTraits': [
// 		'night life',
// 		'eat',
// 		'alcohol',
// 		'outdoor',
// 		'with friends'
// 	],
// 	'aggregatedTraits': {}  }
// ]

createQuestions(questions)
