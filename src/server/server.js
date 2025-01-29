import express, { json } from 'express';
const app = express();

// Middleware to parse JSON
app.use(json());

// Define your API route
app.post('/api/chat', (req, res) => {
  const { message } = req.body;

  // Logic to handle the incoming message
  if (!message) {
    return res.status(400).json({ error: 'Message is required!' });
  }

  // Example response
  const reply = `You said: "${message}"`;
  return res.json({ reply });
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});