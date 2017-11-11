var User = require('../models/user')
import mongoose from 'mongoose'

exports.getUser = (req, res) => {
    res.send(JSON.stringify(req.user))
}
