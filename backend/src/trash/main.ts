// require("dotenv").config();
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { getSystemPrompt } from "../prompts";

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// if (!GEMINI_API_KEY) {
//   throw new Error("GEMINI_API_KEY is not defined");
// }

// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-pro",
//   systemInstruction: getSystemPrompt(),
// });

// const userPrompt = `
// First state what you are going to create. Then, provide a detailed description of the project. Create a well-structured project with proper component separation and TypeScript types. Break it down into smaller, focused components and utilities. Provide step-by-step instructions for creating files, writing their contents, and a conclusion summarizing the steps. Ensure the project has the following features:
// Create a well-structured project with proper component separation and TypeScript types. Break it down into smaller, focused components and utilities. Provide step-by-step instructions for creating files, writing their contents, and a conclusion summarizing the steps. Ensure the project has the following features:

// - Clean component separation
// - Custom hooks for managing state and actions
// - TypeScript types in a separate file for better type safety
// - Modern UI with Tailwind CSS
// - Responsive design
// - Smooth hover states
// - Clear visual hierarchy
// - Nice animations and transitions
// `;

// const generateContentStream = async () => {
//   try {
//     const { stream, response } = await model.generateContentStream({
//       contents: [
//         {
//           role: "user",
//           parts: [
//             {
//               text: userPrompt,
//             },
//           ],
//         },
//         {
//           role: "user",
//           parts: [
//             {
//               text: "For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\nBy default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\nUse icons from lucide-react for logos.\n\nUse stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.",
//             },
//           ],
//         },
//         {
//           role: "user",
//           parts: [
//             {
//               text: '# Project Files\n\nThe following is a list of all project files and their complete contents that are currently visible and accessible to you.\n\neslint.config.js:\n```\nimport js from \'@eslint/js\';\nimport globals from \'globals\';\nimport reactHooks from \'eslint-plugin-react-hooks\';\nimport reactRefresh from \'eslint-plugin-react-refresh\';\nimport tseslint from \'typescript-eslint\';\n\nexport default tseslint.config(\n  { ignores: [\'dist\'] },\n  {\n    extends: [js.configs.recommended, ...tseslint.configs.recommended],\n    files: [\'**/*.{ts,tsx}\'],\n    languageOptions: {\n      ecmaVersion: 2020,\n      globals: globals.browser,\n    },\n    plugins: {\n      \'react-hooks\': reactHooks,\n      \'react-refresh\': reactRefresh,\n    },\n    rules: {\n      ...reactHooks.configs.recommended.rules,\n      \'react-refresh/only-export-components\': [\n        \'warn\',\n        { allowConstantExport: true },\n      ],\n    },\n  }\n);\n\n```\n\nindex.html:\n```\n<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="icon" type="image/svg+xml" href="/vite.svg" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Vite + React + TS</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.tsx"></script>\n  </body>\n</html>\n\n```\n\npackage.json:\n```\n{\n  "name": "vite-react-typescript-starter",\n  "private": true,\n  "version": "0.0.0",\n  "type": "module",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n    "lint": "eslint .",\n    "preview": "vite preview"\n  },\n  "dependencies": {\n    "lucide-react": "^0.344.0",\n    "react": "^18.3.1",\n    "react-dom": "^18.3.1"\n  },\n  "devDependencies": {\n    "@eslint/js": "^9.9.1",\n    "@types/react": "^18.3.5",\n    "@types/react-dom": "^18.3.0",\n    "@vitejs/plugin-react": "^4.3.1",\n    "autoprefixer": "^10.4.18",\n    "eslint": "^9.9.1",\n    "eslint-plugin-react-hooks": "^5.1.0-rc.0",\n    "eslint-plugin-react-refresh": "^0.4.11",\n    "globals": "^15.9.0",\n    "postcss": "^8.4.35",\n    "tailwindcss": "^3.4.1",\n    "typescript": "^5.5.3",\n    "typescript-eslint": "^8.3.0",\n    "vite": "^5.4.2"\n  }\n}\n\n```\n\npostcss.config.js:\n```\nexport default {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n};\n\n```\n\nsrc/App.tsx:\n```\nimport React from \'react\';\n\nfunction App() {\n  return (\n    <div className="min-h-screen bg-gray-100 flex items-center justify-center">\n      <p>Start prompting (or editing) to see magic happen :)</p>\n    </div>\n  );\n}\n\nexport default App;\n\n```\n\nsrc/index.css:\n```\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n```\n\nsrc/main.tsx:\n```\nimport { StrictMode } from \'react\';\nimport { createRoot } from \'react-dom/client\';\nimport App from \'./App.tsx\';\nimport \'./index.css\';\n\ncreateRoot(document.getElementById(\'root\')!).render(\n  <StrictMode>\n    <App />\n  </StrictMode>\n);\n\n```\n\nsrc/vite-env.d.ts:\n```\n/// <reference types="vite/client" />\n\n```\n\ntailwind.config.js:\n```\n/** @type {import(\'tailwindcss\').Config} */\nexport default {\n  content: [\'./index.html\', \'./src/**/*.{js,ts,jsx,tsx}\'],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n};\n\n```\n\ntsconfig.app.json:\n```\n{\n  "compilerOptions": {\n    "target": "ES2020",\n    "useDefineForClassFields": true,\n    "lib": ["ES2020", "DOM", "DOM.Iterable"],\n    "module": "ESNext",\n    "skipLibCheck": true,\n\n    /* Bundler mode */\n    "moduleResolution": "bundler",\n    "allowImportingTsExtensions": true,\n    "isolatedModules": true,\n    "moduleDetection": "force",\n    "noEmit": true,\n    "jsx": "react-jsx",\n\n    /* Linting */\n    "strict": true,\n    "noUnusedLocals": true,\n    "noUnusedParameters": true,\n    "noFallthroughCasesInSwitch": true\n  },\n  "include": ["src"]\n}\n\n```\n\ntsconfig.json:\n```\n{\n  "files": [],\n  "references": [\n    { "path": "./tsconfig.app.json" },\n    { "path": "./tsconfig.node.json" }\n  ]\n}\n\n```\n\ntsconfig.node.json:\n```\n{\n  "compilerOptions": {\n    "target": "ES2022",\n    "lib": ["ES2023"],\n    "module": "ESNext",\n    "skipLibCheck": true,\n\n    /* Bundler mode */\n    "moduleResolution": "bundler",\n    "allowImportingTsExtensions": true,\n    "isolatedModules": true,\n    "moduleDetection": "force",\n    "noEmit": true,\n\n    /* Linting */\n    "strict": true,\n    "noUnusedLocals": true,\n    "noUnusedParameters": true,\n    "noFallthroughCasesInSwitch": true\n  },\n  "include": ["vite.config.ts"]\n}\n\n```\n\nvite.config.ts:\n```\nimport { defineConfig } from \'vite\';\nimport react from \'@vitejs/plugin-react\';\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [react()],\n  optimizeDeps: {\n    exclude: [\'lucide-react\'],\n  },\n});\n\n```\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n  - .bolt/prompt',
//             },
//           ],
//         },
//         {
//           role: "user",
//           parts: [
//             {
//               text: "create a todo app",
//             },
//           ],
//         },
//       ],
//     });

//     for await (const chunk of stream) {
//       console.log(chunk.text());
//     }

//     // Optionally, handle the final aggregated response
//     const finalResponse = await response;
//     console.log("Final response:", finalResponse.text());
//   } catch (error) {
//     console.error("Error generating content:", error);
//   }
// };

// generateContentStream();

//* 2. Using the Google Generative AI to generate content

// require("dotenv").config();
// import express from "express";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { BASE_PROMPT, getSystemPrompt } from "./prompts";
// import { basePrompt as nodeBasePrompt } from "./defaults/node";
// import { basePrompt as reactBasePrompt } from "./defaults/react";
// import cors from "cors";

// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// if (!GEMINI_API_KEY) {
//   throw new Error("GEMINI_API_KEY is not defined");
// }

// const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
// const app = express();
// app.use(cors());
// app.use(express.json());

// const userPrompt = `
// First state what you are going to create. Then, provide a detailed description of the project. Create a well-structured project with proper component separation and TypeScript types. Break it down into smaller, focused components and utilities. Provide step-by-step instructions for creating files, writing their contents, and a conclusion summarizing the steps. Ensure the project has the following features:

// - Clean component separation
// - Custom hooks for managing state and actions
// - TypeScript types in a separate file for better type safety
// - Modern UI with Tailwind CSS
// - Responsive design
// - Smooth hover states
// - Clear visual hierarchy
// - Nice animations and transitions
// `;

// app.post("/template", async (req, res) => {
//   const prompt = req.body.prompt || userPrompt;
//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//     systemInstruction: getSystemPrompt(),
//   });

//   try {
//     const typeResult = await model.generateContent({
//       contents: [
//         {
//           role: "user",
//           parts: [
//             {
//               text:
//                 "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra\n\n" +
//                 prompt,
//             },
//           ],
//         },
//       ],
//     });

//     const answer = typeResult.response.text().trim().toLowerCase();

//     if (answer === "node") {
//       const { stream } = await model.generateContentStream({
//         contents: [
//           {
//             role: "user",
//             parts: [
//               {
//                 text: `${getSystemPrompt()}\n\nCreate a complete Node.js project template for the following request:\n${prompt}\n\nInclude proper project structure, necessary files, and implementation details.\n\n${userPrompt}`,
//               },
//             ],
//           },
//         ],
//         generationConfig: {
//           maxOutputTokens: 8000,
//         },
//       });

//       res.setHeader("Content-Type", "text/plain");
//       for await (const chunk of stream) {
//         res.write(chunk.text());
//       }
//       res.end();
//       return;
//     }

//     if (answer === "react") {
//       const { stream } = await model.generateContentStream({
//         contents: [
//           {
//             role: "user",
//             parts: [
//               {
//                 text: `${BASE_PROMPT}\n\nHere is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\n${userPrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
//               },
//             ],
//           },
//         ],
//         generationConfig: {
//           maxOutputTokens: 8000,
//         },
//       });

//       res.setHeader("Content-Type", "text/plain");
//       for await (const chunk of stream) {
//         res.write(chunk.text());
//       }
//       res.end();
//       return;
//     }

//     res.status(403).json({ message: "You cant access this" });
//   } catch (error) {
//     console.error("Template generation error:", error);
//     res.status(500).json({ message: "Error processing request" });
//   }
// });

// app.post("/chat", async (req, res) => {
//   const messages = req.body.messages;
//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//     systemInstruction: getSystemPrompt(),
//   });

//   try {
//     const { stream } = await model.generateContentStream({
//       contents: [
//         { role: "user", parts: [{ text: getSystemPrompt() }] },
//         ...messages.map((msg: any) => ({
//           role: msg.role,
//           parts: [{ text: msg.content }],
//         })),
//       ],
//       generationConfig: {
//         maxOutputTokens: 8000,
//       },
//     });

//     res.setHeader("Content-Type", "text/plain");
//     for await (const chunk of stream) {
//       res.write(chunk.text());
//     }
//     res.end();
//   } catch (error) {
//     console.error("Chat error:", error);
//     res.status(500).json({ message: "Error processing request" });
//   }
// });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });
