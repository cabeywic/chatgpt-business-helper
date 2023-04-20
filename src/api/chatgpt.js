/*
To ask follow-up questions, simply include the full conversation history (including prior questions and responses) in the messages list. 
This approach may use fewer tokens, as the knowledge base information is provided only once as a system message, and subsequent messages can focus on the conversation. 
However, it is important to ensure that the conversation history is concise to avoid exceeding token limits.
*/

async function generateResponse(client, knowledgeBase, messages) {
    // Construct the initial system message using the knowledge base data
    const systemMessage = `Business Name: ${knowledgeBase.businessInfo.name}
  Description: ${knowledgeBase.businessInfo.description}
  Industry: ${knowledgeBase.businessInfo.industry}
  Location: ${knowledgeBase.businessInfo.location}
  Opening Hours:
  ${Object.entries(knowledgeBase.businessInfo.openingHours)
      .map(([day, hours]) => `${day}: ${hours}`)
      .join('\n')}
  
  Products:
  ${knowledgeBase.products
      .map(
        (product) =>
          `ID ${product.id}: ${product.name} (${product.category}) - ${product.currency}${product.price} - ${product.description}`
      )
      .join('\n')}`;
  
    messages.unshift({ role: "system", content: systemMessage });
  
    // Combine the messages to create the prompt
    const prompt = messages
      .map((message) => `${message.role === 'business' ? 'Elite Clothing' : message.role}: ${message.content}`)
      .join('\n');
  
    try {
      const response = await client.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
      });
  
      const generatedText = response.data.choices[0].text;
      
      console.log('Generated text:', generatedText)
      return generatedText;
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
        console.log(error.message);
        }
    }
  }

module.exports = {
  generateResponse,
};
