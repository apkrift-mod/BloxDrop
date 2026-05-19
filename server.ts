import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

app.use(express.json());

// API route for Fruit Oracle
app.post("/api/oracle", async (req, res) => {
  const { fruitName, rarity } = req.body;

  if (!fruitName) {
    return res.status(400).json({ error: "Fruit name is required" });
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the Ancient Fruit Oracle from the world of Blox Fruits. 
      A player has just rolled a "${fruitName}" (Rarity: ${rarity}). 
      Provide a 1-2 sentence mysterious and atmospheric prophecy about their destiny with this fruit.
      Keep it thematic to the game (Roblox Blox Fruits).`,
      config: {
        temperature: 0.8,
      }
    });

    res.json({ prophecy: response.text });
  } catch (error) {
    console.error("Oracle Error:", error);
    res.status(500).json({ prophecy: "The stars are clouded... your destiny remains a mystery for now." });
  }
});

async function startServer() {
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
    // In Express v4, use app.get('*', ...)
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
