const bcrypt = require('bcrypt')
const Users = require('../models/users')

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
        const token = makeToken(user)
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
        if(!isValidPass) res.json({ error: `Invalid Password` })
        const token = makeToken(user)
        return res.json({token: token})
    } catch (error) {
        return res.json({ error: `An error occured: ${error.message}` })
    }
}

module.exports = {
    signUpUser,
    logInUser,
}