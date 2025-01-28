import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = 'AIzaSyDYEUsqRb49Yb6QDLcKyvsHV3Sjt1fQjh0';
const genAI = new GoogleGenerativeAI({ apiKey });

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Updated to return a function
export async function runChat(input) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],  
    });

    const result = await chatSession.sendMessage(input); 
    return result.response;  
  } catch (error) {
    console.error("Error generating response:", error);
  }
}

export default runChat;