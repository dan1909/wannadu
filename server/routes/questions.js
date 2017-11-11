var express = require('express')
var router = express.Router()
var questionsController = require('../controllers/questions')

router.get('/', questionsController.getQuestionsList)
router.post('/', questionsController.createQuestion)

module.exports = router
