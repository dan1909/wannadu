const jwt = require('jsonwebtoken');
const jwtConfig = require('./config').jwtConfig

// Generate an Access Token for the given User ID
export const generateAccessToken = (userId) => {

  const token = jwt.sign({}, jwtConfig.secretOrKey, {
    expiresIn: jwtConfig.expiresIn,
    audience: jwtConfig.audience,
    issuer: jwtConfig.issuer,
    subject: userId.toString()
  });

  return token
}
