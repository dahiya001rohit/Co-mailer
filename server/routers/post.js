const express = require('express')
const { signUpUser, logInUser, sendemail } = require('../controllers/postFun')
const { auth } = require('../middlewares/auth')
const upload = require('../multer')
const router = express()

router.route('/signup')
    .post(signUpUser)
router.route('/login')
    .post(logInUser)
router.route('/send-email')
    .post(auth, upload.array('attachments'), sendemail)

module.exports = router