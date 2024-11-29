require("dotenv").config();
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import { basePrompt as nodeBasePrompt } from "./defaults/node";
import { basePrompt as reactBasePrompt } from "./defaults/react";
import cors from "cors";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const app = express();
app.use(cors());
app.use(express.json());

app.post("/template", async (req, res) => {
  const prompt = req.body.prompt;
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: getSystemPrompt(),
  });

  try {
    // First determine if it's node or react
    const typeResult = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra\n\n" +
                prompt,
            },
          ],
        },
      ],
    });

    const answer = typeResult.response.text().trim().toLowerCase();

    if (answer === "node") {
      // Generate the actual project template
      const templateResult = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${getSystemPrompt()}\n\nCreate a complete Node.js project template for the following request:\n${prompt}\n\nInclude proper project structure, necessary files, and implementation details.`,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 8000,
        },
      });

      const response = templateResult.response.text();

      res.json({
        prompts: [response],
        uiPrompts: [response],
      });
      return;
    }

    if (answer === "react") {
      // For React projects, use the existing template structure
      res.json({
        prompts: [
          BASE_PROMPT,
          // BASE_INSTRUCTIONS,
          `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
        ],
        uiPrompts: [reactBasePrompt],
      });
      return;
    }

    res.status(403).json({ message: "You cant access this" });
  } catch (error) {
    console.error("Template generation error:", error);
    res.status(500).json({ message: "Error processing request" });
  }
});

app.post("/chat", async (req, res) => {
  const messages = req.body.messages;
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: getSystemPrompt(),
  });

  try {
    const result = await model.generateContent({
      contents: [
        // Include system prompt as first message
        { role: "user", parts: [{ text: getSystemPrompt() }] },
        // Include full conversation history
        ...messages.map((msg: any) => ({
          role: msg.role,
          parts: [{ text: msg.content }],
        })),
      ],
      generationConfig: {
        maxOutputTokens: 8000,
      },
    });

    res.json({
      response: result.response.text(),
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ message: "Error processing request" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
