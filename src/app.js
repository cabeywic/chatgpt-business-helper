const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config');
const { OpenAIApi } = require("openai");
const fs = require('fs');
const { generateResponse } = require('./api/chatgpt');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const chatGPTClient = new OpenAIApi(config.chatGPT);

app.post('/api/ask', async (req, res) => {
  const { messages } = req.body;

  // Load the knowledge base from the JSON file
  const rawData = fs.readFileSync('knowledge_base.json');
  const knowledgeBase = JSON.parse(rawData);

  try {
    const generatedText = await generateResponse(chatGPTClient, knowledgeBase, messages);
    res.json({ response: generatedText });
  } catch (error) {
    console.error('Error generating response from ChatGPT:', error);
    res.status(500).send('Error generating response from ChatGPT');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
