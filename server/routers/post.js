const express = require('express')
const { signUpUser, logInUser } = require('../controllers/postFun')
const router = express()

router.route('/signup')
    .post(signUpUser)
router.route('/login')
    .post(logInUser)

module.exports = router