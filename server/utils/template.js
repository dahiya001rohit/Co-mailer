const path = require('path')
const fs = require('fs').promises

const filePath = path.join(__dirname, '../htmlTemplate.html')

const readAndUpdate = async (template) => {
    try {
        await fs.writeFile(filePath, template, 'utf-8');
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

const loadTemplate = async () => { 
    try {
        let data = await fs.readFile(filePath, 'utf-8');
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}
module.exports = {
    loadTemplate,
    readAndUpdate,
}
