require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('Missing Gemini API key in .env');
}

module.exports = {
  GEMINI_API_KEY
}; 