const { verifyToken } = require("../controllers/JWT")

function auth(req, res, next) {
    const authHeader = req.headers.authorization
    if(!authHeader) return res.status(401).json({error: `No token provided`})
    const token = authHeader.split(' ')[1]
    try {
        const user = verifyToken(token)
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

module.exports = {
    auth,
}