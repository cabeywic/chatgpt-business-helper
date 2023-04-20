const { Configuration } = require("openai");
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const config = {
  chatGPT: new Configuration({
    apiKey: process.env.CHATGPT_API_KEY,
  }),
};

module.exports = config;
