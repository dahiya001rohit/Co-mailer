require('dotenv').config();
const express = require('express')
const cors = require('cors')
const { connectToMongoDb } = require('./connection')
const app = express()
const postRouter = require('./routers/post')
const { auth } = require('./middlewares/auth');
const { getTokens, generateOauthUrl } = require('./utils/google');
const { googleLogin } = require('./controllers/getFun');
const PORT = process.env.PORT || 7152;

// Connecting Database
if (!process.env.MONGO_URI) {
  console.error("Missing MONGO_URI");
  process.exit(1);
}

connectToMongoDb(process.env.MONGO_URI)
    .then(() => {
        console.log(`Mongo Connected`)
    })
    .catch((err) => {
        console.error(`Error connecting to MongoDB: ${err}`);
    });


app.use(cors({ origin: true, credentials: true }));

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.get('/me', auth, (req, res) => {
    return res.json({ user: req.user })
})
// console.log(generateOauthUrl())
app.use('/', postRouter)
app.get('/login', (req, res) => {
    try {
        console.log(generateOauthUrl())
        return res.json({ url: generateOauthUrl() })
    } catch (error) {
        return res.json({ error: error })
    }
})
app.get('/google/auth', googleLogin)


app.listen(PORT, () => {
  console.log("started on port:", PORT);
});
