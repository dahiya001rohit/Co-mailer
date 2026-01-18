const { verifyAppToken } = require("../controllers/JWT")

function appPassAuth(req, res, next){
    const appToken = req.headers['x-app-token']
    if(!appToken) return res.status(403).json({error: `No appToken provided`})
    try {
        const encryptedAppPass = verifyAppToken(appToken)
        req.encryptedAppPass = encryptedAppPass.appPass
        next()
    } catch (error) {
        return res.status(403).json({ error: "Invalid or expired appToken" });
    }
}

module.exports = {
    appPassAuth,
}