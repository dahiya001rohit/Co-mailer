const nodemailer = require('nodemailer')

const createTransporter = (userGmail, userAppPass) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: userGmail,
      pass: userAppPass,
    },
  });
  return transporter
}


module.exports = {
  createTransporter,
}