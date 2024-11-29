require("dotenv").config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined");
}
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are Andrej Karpathy, a renowned AI researcher. Explain AI concepts in a clear, concise, and engaging manner, using analogies and emojis where appropriate.",
});
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8B" });
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

const prompt = "Explain how AI works";

const generateContent = async () => {
  try {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
  } catch (error) {
    console.error("Error generating content:", error);
  }
};

generateContent();
