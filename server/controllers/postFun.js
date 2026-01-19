const bcrypt = require('bcrypt')
const Users = require('../models/users')
const { makeToken, makeAppPassToken } = require('./JWT')
const { encrypt, decrypt} = require('./crypto')
const { createTransporter } = require('./mailer')
const Template = require('../models/templates');

async function signUpUser(req, res) {
    const { name, email, password } = req.body
    const isAlreadyUser = await Users.findOne({ email })
    if (isAlreadyUser) return res.json({error: `User already exist, login`})
    const hashPass = await bcrypt.hash(password, 10)
    try {
        const user = await Users.create({
            name: name,
            email: email,
            password: hashPass 
        })
        console.log(user)
        const token = makeToken(user)
        console.log(token)
        return res.json({token: token})
    } catch (error) {
        return res.json({ error: `An error occured` })
    }
}

async function logInUser(req, res) {
    const { email, password } = req.body
    try {
        const user = await Users.findOne({ email })
        console.log(user)
        if(!user) return res.json({ error: `No user, signup` })
        const isValidPass = await bcrypt.compare(password, user.password)
        if(!isValidPass) return res.json({ error: `Invalid Password` })
        const token = makeToken(user)
        console.log(token)
        return res.json({token: token})
    } catch (error) {
        return res.json({ error: `An error occured: ${error.message}` })
    }
}

async function saveAppPass(req, res) {
    console.log(`reached`)
    const { appPass } = req.body
    encryptedAppPass = encrypt(appPass)
    console.log(encryptedAppPass)
    const appToken = makeAppPassToken(encryptedAppPass)
    console.log(appToken)
    return res.json({appToken})
}

async function sendemail(req, res) {
    console.log(`reached`)
    const { to, subject, html, toSeperate} = req.body
    const files = req.files
    const user = req.user
    const encryptedAppPass = req.encryptedAppPass
    const appPass = decrypt(encryptedAppPass)
    const transporter = createTransporter(user.email, appPass)
    console.log({ to, subject, html, files, toSeperate})

    if(toSeperate === 'false'){
        try{
            console.log(`hi`)
            const sentEmail = await transporter.sendMail({
                from: user.name + ' <' + user.email + '>',
                to: to,
                subject: subject,
                html: html,
                attachments: files.map(file => ({
                    filename: file.originalname,
                    content: file.buffer,
                }))
            })
            console.log(sentEmail)
            return res.json({data: `Success`})
        } catch(err){
            console.log(err)
            return res.json({error: `An error occured`})
        }
    } else {
        const recipients = to.split(',').map(email => email.trim())
        for(let email of recipients){
            const sanitizedEmail = email
                .replace('@', '_')
                .replace(/\./g, '_')
                .toLowerCase()

            const matchFile = files.filter(file => file.originalname.toLowerCase().includes(sanitizedEmail))

            try{
                console.log(`hi`)
                const sentEmail = await transporter.sendMail({
                    from: user.name + ' <' + user.email + '>',
                    to: email,
                    subject: subject,
                    html: html,
                    attachments: matchFile.map(file => ({
                        filename: file.originalname,
                        content: file.buffer,
                    }))
                })
            } catch(err){
                console.log(err)
                return res.json({error: `An error occured`})
            }
        };
    }
    console.log(`hi`)
    return res.json({data: `Success`})
}

async function saveTemplate(req, res) {
    if (!req.file) return res.json({ error: 'No file uploaded' });
    const templateString = req.file.buffer.toString('utf-8');
    try {
        await Template.findOneAndUpdate(
            { userId: req.user._id },
            { template: templateString },
            { upsert: true, new: true }
        );
        console.log(`updated`)
        return res.json({ data: 'success' });
    } catch (err) {
        return res.json({ error: 'An error occurred' });
    }
}

module.exports = {
    signUpUser,
    logInUser,
    saveAppPass,
    sendemail,
    saveTemplate
}