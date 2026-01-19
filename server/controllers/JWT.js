const JWT = require('jsonwebtoken')
const myJWTSecret = 'co-mailer-jwt-secert'
const myAppPassJWTSecret = 'co-mailer-App-Pass-jwt-secert'
function makeToken(user){
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email
    }
    return JWT.sign(payload, myJWTSecret, {
        expiresIn: '24h'
    })
}

function verifyToken(token){
    return JWT.verify(token, myJWTSecret)
}

function makeAppPassToken(appPass){
    return JWT.sign({ appPass }, myAppPassJWTSecret, {
        expiresIn: '4h'
    })
}
function verifyAppToken(appToken){
    return JWT.verify(appToken, myAppPassJWTSecret)
}
module.exports = {
    makeToken,
    verifyToken,
    makeAppPassToken,
    verifyAppToken
}