import passport from 'passport'
var express = require('express')
var router = express.Router()
var questionsController = require('../controllers/questions')

router.get('/', passport.authenticate(['jwt'], { session: false }), questionsController.getQuestionsList)
router.post('/', passport.authenticate(['jwt'], { session: false }), questionsController.createQuestion)

module.exports = router
