const express = require('express')
const { signUpUser, logInUser, sendemail } = require('../controllers/postFun')
const { auth } = require('../middlewares/auth')
const router = express()

router.route('/signup')
    .post(signUpUser)
router.route('/login')
    .post(logInUser)
router.route('/send-email')
    .post(auth, sendemail)

module.exports = router