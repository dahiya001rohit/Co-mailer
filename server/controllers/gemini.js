const { GoogleGenAI } = require("@google/genai");
const Templates = require('../models/templates')
const genAI = new GoogleGenAI({apiKey: "AIzaSyCZSGFVQX-LFt-0D79CJEqVna9A5yobtL0"});

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
            model: "gemini-2.5-flash-lite",
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
        const data = JSON.parse(response.candidates[0].content.parts[0].text)
        return res.json(data);
    } catch (error) {
        console.error("Gemini Error:", error);
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    generateHtml,
}
