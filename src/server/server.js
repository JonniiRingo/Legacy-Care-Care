import express, { json } from 'express';
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";
const app = express();

// Middleware to parse JSON
app.use(json());

// Define your API route
app.post('/api/chat', async (req, res) => {
  const data = req.body;

  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
  const index = pc.index("ragforcars").namespace("car-data");
  const openai = new OpenAI();

  // create embedding for the user's question
  const text = data[data.length - 1].content;
  console.log("User query:", text);
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: text,
  });

  // Logic to handle the incoming message
  if (!data) {
    return res.status(400).json({ error: 'Message is required!' });
  }

  // Example response
  const reply = `You said: "${data}"`;
  return res.json({ reply });
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});