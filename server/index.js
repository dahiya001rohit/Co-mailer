const express = require('express')
const cors = require('cors')
const { connectToMongoDb } = require('./connection')
const app = express()
const postRouter = require('./routers/post')
const { auth } = require('./middlewares/auth')
const { generateHtml } = require('./controllers/gemini')

// Connecting Database
connectToMongoDb('mongodb://127.0.0.1:27017/co-mailer')
    .then(() => {
        console.log(`Mongo Connected`)
    })
    .catch((err) => {
        console.error(`Error connecting to MongoDB: ${err}`);
    });


app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.get('/me', auth, (req, res) => {
    return res.json({ user: req.user })
})
app.post('/gemini',auth ,generateHtml)
app.use('/', postRouter)


app.listen(7152, ()=>{
    console.log('started on port 7152')
})