// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const getBotReply = require('./Chatbot');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'https://https://ai-chatbot-by-a-mukherjee.onrender.com/'
}));
app.use(express.json());

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Health check route
app.get('/ping', (req, res) => {
  res.send('Server is live!');
});

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/contactme.html',(req,res) => {
    res.sendFile(path.join(__dirname,'public/contactme.html'));
})

// Chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const botReply = await getBotReply(userMessage);
    res.json({ response: botReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ response: "Error: " + err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
