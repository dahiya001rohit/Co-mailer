const Users = require('../models/users')
const { encrypt } = require('../utils/crypto')
const { getTokens } = require('../utils/google')
const { makeToken } = require('../utils/JWT')

async function googleLogin(req, res) {
    const code = req.query.code

    try {
        const data = await getTokens(code)

        const payload = JSON.parse(
            Buffer.from(data.id_token.split('.')[1], 'base64').toString()
        )

        const userData = {
            sub: payload.sub,
            name: payload.name,
            email: payload.email,
            encryptedAccessToken: encrypt(data.access_token),
            accessTokenExpiry: data.expiry_date,
            encryptedRefreshToken: encrypt(data.refresh_token),
            rrefreshTokenExpiry: (typeof data.refresh_token_expires_in === 'number' && !isNaN(data.refresh_token_expires_in))? 
                Date.now() + data.refresh_token_expires_in * 1000
                :
                (Date.now() + 7 * 24 * 60 * 60 * 1000)
        }

        let user = await Users.findOne({ sub: userData.sub })

        if (!user) {
            user = await Users.create(userData)
        } else {
            user = await Users.findOneAndUpdate(
                { sub: userData.sub },
                userData,
                { new: true }
            )
        }

        const token = makeToken(user)
        return res.redirect(
            `https://co-mailer-1.onrender.com/login?token=${token}`
        )

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    googleLogin,
}
