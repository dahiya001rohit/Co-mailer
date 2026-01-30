require('dotenv').config()
const {google} = require('googleapis');
const oauth2Client = new google.auth.OAuth2(
  process.env.YOUR_CLIENT_ID,
  process.env.YOUR_CLIENT_SECRET,
  process.env.YOUR_REDIRECT_URL
);


const generateOauthUrl = () => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: [
            'https://mail.google.com/',
            'openid',
            'email',
            'profile'
        ]
    })
    return url
}

const getTokens = async (code) => {
    const { tokens } = await oauth2Client.getToken(code)
    return tokens
}

module.exports = {
    oauth2Client,
    generateOauthUrl,
    getTokens
}