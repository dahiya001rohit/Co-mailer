const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    // user: "krushndayshmookh@gmail.com",
    clientId: process.env.YOUR_CLIENT_ID,
    clientSecret: process.env.YOUR_CLIENT_SECRET,
    // refreshToken: '<PUT REFRESH TOKEN HERE FOR CREATING A TRANSPORTER FOR A SINGLE USER>', // IF YOU USE THIS, TRANSPORTER IS FOR SINGLE USER ONLY, IF YOU USE THE AUTH IN MESSAGE, YOU CAN SEND EMAILS FOR DIFFERENT USERS
  },
});



module.exports = transporter
