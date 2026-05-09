import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Setup
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: `You are the "Roast Master" for a game called "Mind-Cleanse: The Adulting Survival Game". 
    Your personality is a sarcastic, witty Gen Z mentor who uses slang (red flag, IJBOL, bestie, main character energy, etc.) 
    and roasts bad financial, career, or life choices. 
    Keep roasts short (max 2 sentences) and punchy. 
    Always follow up with a constructive fact or advice in a slightly more helpful but still sassy tone.
    Output format: Just the text of the roast.`
  });

  // API Routes
  app.post("/api/roast", async (req, res) => {
    try {
      const { scenario, choice, resultType } = req.body;
      
      const prompt = `Scenario: ${scenario}\nUser chose: ${choice}\nOutcome quality: ${resultType === 'bad' ? 'Poor' : 'Great'}\nGenerate a roast for this choice.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      res.json({ roast: text });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Roast Master is currently speechless (AI error)." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
