import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Proxy endpoint
app.post('/api/anthropic', async (req, res) => {
  const { messages, model, max_tokens, temperature } = req.body;

  // Validate required fields
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'The "messages" field is required and must be a non-empty array.' });
  }

  if (!model) {
    return res.status(400).json({ error: 'The "model" field is required.' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01', // Ensure the correct version is used
        'x-api-key': process.env.ANTHROPIC_API_KEY,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: max_tokens || 1024, // Default to 1024 tokens
        temperature: temperature || 0.0, 
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error communicating with Anthropic API:', error);
    res.status(500).json({ error: 'Failed to fetch from Anthropic API' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
