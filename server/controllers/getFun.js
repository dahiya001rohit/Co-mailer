const Users = require('../models/users')
const { encrypt } = require('../utils/crypto')
const { getTokens } = require('../utils/google')
const { makeToken } = require('../utils/JWT')

async function googleLogin(req, res) {
    const code = req.query.code
    try{
        const data = await getTokens(code)
        console.log(data)
        const userPayload = JSON.parse(atob((data.id_token).split('.')[1]))
        console.log(userPayload)
        const user = {
            sub: userPayload.sub,
            name: userPayload.name,
            email: userPayload.email,
            encryptedAccessToken: encrypt(data.access_token),
            accessTokenExpiry: data.expiry_date,
            encryptedRefreshToken: encrypt(data.refresh_token),
            refreshTokenExpiry: Date.now() + data.refresh_token_expires_in * 1000,
        }
        const isAlreadyUser = await Users.findOne({ sub: user.sub })
        if(!isAlreadyUser){
            const newUser = await Users.create({
                sub: user.sub,
                name: user.name,
                email: user.email,
                encryptedAccessToken: user.encryptedAccessToken,
                accessTokenExpiry: user.accessTokenExpiry,
                encryptedRefreshToken: user.encryptedRefreshToken,
                refreshTokenExpiry: user.refreshTokenExpiry
            })
            const token = makeToken(newUser)
            const frontendUrl = `https://co-mailer-1.onrender.com/login?token=${token}`;
            return res.redirect(frontendUrl);
        } else {
            const updatedUser = await Users.findOneAndUpdate(
                {sub: user.sub}, 
                {
                    name: user.name,
                    email: user.email,
                    encryptedAccessToken: user.encryptedAccessToken,
                    accessTokenExpiry: user.accessTokenExpiry,
                    encryptedRefreshToken: user.encryptedRefreshToken,
                    refreshTokenExpiry: user.refreshTokenExpiry
                },
                { new: true }
            )
            const token = makeToken(updatedUser)
            const frontendUrl = `https://co-mailer-1.onrender.com//login?token=${token}`;
            return res.redirect(frontendUrl);
        
    } catch (error){
        return res.json({error: error})
    }
}

module.exports = {
    googleLogin,
}
