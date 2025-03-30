import { NextApiRequest, NextApiResponse } from "next";
import { GoogleGenAI } from "@google/genai"; // Replace with the actual library import

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "How does AI work?",
      });
      console.log(response.text);
      res.status(200).json({ response });
    } catch (error) {
      console.error("Error generating text:", error);
      res.status(500).json({ error: "Failed to generate text" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}