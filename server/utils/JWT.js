require('dotenv').config();
const JWT = require('jsonwebtoken')
const myJWTSecret = process.env.myJWTSecret
const myAppPassJWTSecret = process.env.myAppPassJWTSecret
function makeToken(user){
    const payload = {
        sub: user.sub,
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
module.exports = {
    makeToken,
    verifyToken,
}