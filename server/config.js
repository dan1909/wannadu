const ExtractJwt = require('passport-jwt').ExtractJwt

export const facebookConfig = {
  clientID: '175912356308263',
  clientSecret: '1d4241d0a05447cc72dae32471770faa',
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  // profileFields: ['id', 'name', 'displayName', 'picture', 'email'],
  profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'displayName', 'picture', 'timezone', 'updated_time', 'verified'],

};

export const jwtConfig = {
  // By default this looks for a "JWT " prefix
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  expiresIn: '1 day',
  // The secret that was used to sign the JWT
  secretOrKey: 'WaNnAdUJwTsecret!1',
  issuer: 'accounts.examplesoft.com',
  audience: 'yoursite.net',
}
