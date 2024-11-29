require("dotenv").config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const userPrompt = "Write a code for TODO app";

const generateContentStream = async () => {
  try {
    const { stream, response } = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
    });

    for await (const chunk of stream) {
      console.log(chunk.text());
    }

    // Optionally, handle the final aggregated response
    const finalResponse = await response;
    console.log("Final response:", finalResponse.text());
  } catch (error) {
    console.error("Error generating content:", error);
  }
};

generateContentStream();
