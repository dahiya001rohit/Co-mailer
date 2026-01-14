const JWT = require('jsonwebtoken')
const myJWTSecret = 'co-mailer-jwt-secert'
function makeToken(user){
    payload = {
        name: user.name,
        email: user.email
    }
    return JWT.sign(payload, myJWTSecret, {
        expiresIn: '24h'
    })
}

function verifyToken(token){
    return JWT.verify(token)
}

module.exports = {
    makeToken,
    verifyToken
}