import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const ai = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const systemInstruction = `You are a product searcher and an sql query generator. 
                                Rules: 
                                1. You have to respond to what the user input in natural language and save the value in message property of a JSON.
                                2. Answer in no more than 2 paragraph.
                                3. Don't mention anything sql related in the message property as it is intended to serve on the user's end
                                4. If the input was not related to product, response with something in the line of 'I can only discuss topic related to searching product'
                                5. If the user gives detail about the product, generate an sql query to filter the product and save the value in sql property of the JSON. Else skip this part.\
                                
                                Key: id, name, price, location, category`;

const model = ai.getGenerativeModel({
  model: "gemini-3-flash-preview",
  systemInstruction,
  generationConfig: {
    responseMimeType: "application/json",
  },
});

let chat = null;

export default async function gemini(prompt) {
  if (!chat) {
    chat = model.startChat({
      history: [],
    });
  }

  try {
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = await response.text();
    const jsonResponse = JSON.parse(text);
    return jsonResponse;
  } catch (err) {
    console.log(err);
    return err;
  }
}
