const Users = require('../models/users')
const { decrypt, encrypt} = require('../utils/crypto')
const transporter = require('../utils/mailer')
const Template = require('../models/templates');
const { oauth2Client } = require('../utils/google');


const refreshUserToken = async (u) => {
    try {
        oauth2Client.setCredentials({ refresh_token: decrypt(u.encryptedRefreshToken) });
        const { credentials } = await oauth2Client.refreshAccessToken();
        u.encryptedAccessToken = encrypt(credentials.access_token);
        u.accessTokenExpiry = credentials.expiry_date;
        await u.save();
        return credentials.access_token;
    } catch (error) {
        console.error("Error refreshing token:", error);
        throw error;
    }
};

async function sendMailWithRetry(mailOptions, u, retries = 1) {
    try {
        return await transporter.sendMail(mailOptions);
    } catch (error) {
        // Check for 535 Authentication credentials invalid
        if (error.responseCode === 535 && retries > 0) {
            console.log("Token expired or invalid. Attempting to refresh...");
            try {
                const newAccessToken = await refreshUserToken(u);
                mailOptions.auth.accessToken = newAccessToken; // Update access token in mailOptions
                console.log("Token refreshed. Retrying email...");
                return await sendMailWithRetry(mailOptions, u, retries - 1);
            } catch (refreshError) {
                console.error("Failed to refresh token during retry:", refreshError);
                throw error; // Throw original error if refresh fails
            }
        }
        throw error;
    }
}

async function sendemail(req, res) {
    console.log(`reached`)
    const { to, subject, html, toSeperate} = req.body
    const files = req.files
    const user = req.user
    const u = await Users.findOne({ sub: user.sub})
    console.log(u)
    
    // Initial pre-check (optional but good for performance)
    if (Date.now() > user.accessTokenExpiry) {
        if (Date.now() < user.refreshTokenExpiry) {
           await refreshUserToken(u);
        } else {
            return res.status(401).json({ error: `Invalid token, login again`})
        }
    }
    
    console.log({ to, subject, html, files, toSeperate})
    if(String(toSeperate) === 'false'){
        try{
            const sentEmail = await sendMailWithRetry({
                from: u.name + ' <' + u.email + '>',
                to: to,
                subject: subject,
                html: html,
                attachments: files.map(file => ({
                    filename: file.originalname,
                    content: file.buffer,
                })),
                auth: {
                    user: u.email,
                    refreshToken: decrypt(u.encryptedRefreshToken),
                    accessToken: decrypt(u.encryptedAccessToken),
                }
            }, u);
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
                const sentEmail = await sendMailWithRetry({
                    from: u.name + ' <' + u.email + '>',
                    to: email,
                    subject: subject,
                    html: html,
                    attachments: matchFile.map(file => ({
                        filename: file.originalname,
                        content: file.buffer,
                    })),
                    auth: {
                        user: u.email,
                        refreshToken: decrypt(u.encryptedRefreshToken),
                        accessToken:decrypt(u.encryptedAccessToken),
                    }
                }, u);
                console.log(sentEmail)
            } catch(error){
                console.log(error)
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
    } catch (error) {
        return res.json({ error: 'An error occurred' });
    }
}

module.exports = {
    sendemail,
    saveTemplate
}