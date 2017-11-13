import express from 'express';
import passport from 'passport'
import FacebookStrategy from 'passport-facebook'
import { facebookConfig, jwtConfig } from './config'
var JwtStrategy = require('passport-jwt').Strategy
var bodyParser = require('body-parser')
var User = require('./models/user')
var token = require('./token')

// Initialize http server
const app = express();

// Define body parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//Set up mongoose connection
var mongoose = require('mongoose')
var mongoDB = 'mongodb://localhost/wannadu'
mongoose.Promise = global.Promise
mongoose.connect(mongoDB, {useMongoClient: true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Initialize Passport
app.use(passport.initialize())
app.use(passport.session())

// Register Facebook Passport strategy
passport.use(new FacebookStrategy(facebookConfig,
  // Gets called when user authorizes access to their profile
  async (accessToken, refreshToken, profile, done) => {
    const user = await User.updateOrCreateFbUser(profile._json)
    done(null, user)
  }
))

passport.use(new JwtStrategy(jwtConfig,
  async (payload, done) => {

    // Check if user exists, if so return status ok (done(null, user))
    const user = await User.findOne(mongoose.Types.ObjectId(payload.sub)).exec()
    if (user) {

        return done(null, user, payload);
    }
    // No user found, return 401 (unauthorized)
    return done();
}))

// Serialize user into the sessions
passport.serializeUser((user, done) => done(null, user))

// Deserialize user from the sessions
passport.deserializeUser((user, done) => done(null, user))

// Set up Facebook auth routes
app.get('/auth/facebook', passport.authenticate('facebook', {scope : ['email']}));

// Redirect user back to the mobile app using Linking with a custom protocol OAuthLogin
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: '/auth/facebook' }), async (req, res) => {
    const genToken = await token.generateAccessToken(req.user._id)
    console.log("User logged in with FB, Generated Access Token for user_id", req.user._id)
    res.redirect('OAuthLogin://login?user=' + JSON.stringify({user: req.user._id, token: genToken}))
  })

app.use('/questions', require('./routes/questions'))
app.use('/user', require('./routes/user'))
app.use('/answers', require('./routes/answers'))

// Launch the server on port 3000
const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
