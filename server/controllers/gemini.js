require('dotenv').config()
const { GoogleGenAI } = require("@google/genai");
const Templates = require('../models/templates')
const genAI = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

async function generateHtml(req, res) {
    console.log(1)
    const getTemplate = async ( userId ) => {
        try {
            return await Templates.findOne({ userId })
        } catch (error) {
            return null
        }
    }
    const templateDoc = await getTemplate( req.user._id )
    const template = templateDoc?templateDoc.template : null
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt required" });

    try {
        const response = await genAI.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `You are an HTML Designer Agent. You are tasked with making HTML responses with proper use of colors, NOT flashy, and a responsive HTML page.
            here is the company template ypu need to fill content in it, template: ${template}
            (if template is null ignore template)
            fill the template and return filled template as html
            Generate the following two things based on this prompt: "${prompt}"
            1. A professional email subject line.
            2. The full HTML code for the email body.
            Return the result strictly as valid JSON in this format:
            {
            "subject": "Your subject here",
            "html": "<html>Your HTML here</html>"
            }
            STRICTLY Do NOT use Markdown formatting (like \`\`\`json). Do NOT wrap the response in code blocks. Return ONLY the raw JSON string starting with { and ending with }.`,
        });
        
        console.log(2)
        const raw = response.candidates[0].content.parts[0].text;
        console.log('Gemini raw response:', raw);
        let data;
        try {
            data = JSON.parse(raw);
        } catch (err) {
            // Try to fix bad escapes (replace single backslash with double)
            try {
                const safe = raw.replace(/\\(?!["\\/bfnrtu])/g, '\\\\');
                data = JSON.parse(safe);
            } catch (err2) {
                console.error('Gemini JSON parse error:', err2);
                return res.status(500).json({ error: 'Gemini returned invalid JSON. See server logs.' });
            }
        }
        return res.json(data);
    } catch (error) {
        console.error("Gemini Error:", error);
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    generateHtml,
}
