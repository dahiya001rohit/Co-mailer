require('dotenv').config()
const crypto = require('crypto')
let ENCRYPTION_KEY = process.env.ENCRYPTION_KEY ? process.env.ENCRYPTION_KEY.trim() : '';
if (ENCRYPTION_KEY.length !== 32) {
    throw new Error(`ENCRYPTION_KEY must be exactly 32 characters. Current length: ${ENCRYPTION_KEY.length}`);
}
const IV_LENGTH = 16

function encrypt(text){
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY, 'utf-8'), iv)
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    const parts = text.split(':');
    const iv = Buffer.from(parts[0], 'hex');
    const encryptedText = Buffer.from(parts[1], 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports = {
    encrypt,
    decrypt
}