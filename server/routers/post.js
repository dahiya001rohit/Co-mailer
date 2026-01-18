const express = require('express')
const { signUpUser, logInUser, sendemail, saveAppPass } = require('../controllers/postFun')
const { auth } = require('../middlewares/auth')
const upload = require('../controllers/multer')
const { appPassAuth } = require('../middlewares/appPassAuth')
const router = express()

router.route('/signup')
    .post(signUpUser)
router.route('/login')
    .post(logInUser)
router.route('/save-app-password')
    .post(saveAppPass)
router.route('/send-email')
    .post(auth, appPassAuth, upload.array('attachments'), sendemail)

module.exports = router