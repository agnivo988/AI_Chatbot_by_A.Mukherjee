// chatbot.js
require('dotenv').config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const chatHistory = [];

async function getBotReply(userMessage) {
    chatHistory.push({
        role: "user",
        parts: [{ text: userMessage, type: "text" }]
    });

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: chatHistory
    });

    const responseText = response.candidates[0].content.parts[0].text;

    chatHistory.push({
        role: "model",
        parts: [{ text: responseText, type: "text" }]
    });

    return responseText;
}

module.exports = getBotReply;
