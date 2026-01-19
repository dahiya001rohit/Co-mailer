require('dotenv').config();
const express = require('express')
const cors = require('cors')
const { connectToMongoDb } = require('./connection')
const app = express()
const postRouter = require('./routers/post')
const { auth } = require('./middlewares/auth')
const { generateHtml } = require('./controllers/gemini')

// Connecting Database
connectToMongoDb(process.env.MONGO_URI)
    .then(() => {
        console.log(`Mongo Connected`)
    })
    .catch((err) => {
        console.error(`Error connecting to MongoDB: ${err}`);
    });


app.use(cors({origin: 'https://co-mailer-1.onrender.com'}))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.get('/me', auth, (req, res) => {
    return res.json({ user: req.user })
})
app.post('/gemini',auth ,generateHtml)
app.use('/', postRouter)


app.listen(process.env.PORT, ()=>{
    console.log(`started on port: ${process.env.PORT}`)
})