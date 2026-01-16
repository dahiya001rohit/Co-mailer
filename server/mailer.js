const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rohit830770@gmail.com",
    pass: 'swpi jroa bway gibl', // The 16-character App Password
  },
});

module.exports = transporter