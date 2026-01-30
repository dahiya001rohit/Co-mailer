const express = require('express')
const { sendemail, saveTemplate } = require('../controllers/postFun')
const { auth } = require('../middlewares/auth')
const upload = require('../utils/multer')
const { generateHtml } = require('../utils/gemini')
const router = express.Router()



router.route('/save-template')
    .post(auth, upload.single('template'), saveTemplate)
router.route('/gemini')
    .post(auth ,generateHtml)
router.route('/send-email')
    .post(auth, upload.array('attachments'), sendemail)

module.exports = router