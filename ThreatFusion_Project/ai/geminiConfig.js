// geminiClient.js
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Validate that the API key is loaded
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is missing in environment variables.");
}

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

module.exports = genAI;
