var express = require('express')
var router = express.Router()
var userController = require('../controllers/user')
import passport from 'passport'

router.get('/', passport.authenticate(['jwt'], { session: false }), userController.getUser)

module.exports = router
