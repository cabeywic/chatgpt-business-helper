# ChatGPT Business Helper

A platform that allows businesses to connect their Instagram/Facebook accounts and provide their business details. The platform uses ChatGPT API to automatically answer customer inquiries based on the provided knowledge base.

## Getting Started

1. Clone the repository: git clone https://github.com/yourusername/chatgpt-business-helper.git

2. Navigate to the project directory:
```bash
cd chatgpt-business-helper
```

3. Install the required dependencies:
```bash
npm install
```

4. Create a `.env` file in the project root directory to store your API keys:
```bash
touch .env
```

5. Open the `.env` file in a text editor and add your ChatGPT API key:
```bash
CHATGPT_API_KEY=your_api_key_here
```
Replace `your_api_key_here` with your actual ChatGPT API key.

6. Run the server:
```bash
npm start
```

The server will start running on the default port 3000 or the port specified in the environment variable `PORT`.

## Usage

1. To interact with the platform, send a POST request to the `/ask` endpoint with a JSON object containing a `messages` property.

2. The `messages` property should be an array of message objects, each with a `role` ("system", "customer", or "business") and the `content` of the message.

3. The initial system message should set the context, and subsequent customer and business messages represent the conversation history.

4. Include the full message history when making a request to the `/ask` endpoint, so that the ChatGPT API can generate responses based on prior exchanges.

## License

This project is licensed under the MIT License 






