import passport from 'passport'
var express = require('express')
var router = express.Router()
var answerController = require('../controllers/answers')

router.post('/', passport.authenticate(['jwt'], { session: false }), answerController.postAnswer)

module.exports = router
