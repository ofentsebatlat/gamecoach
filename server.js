require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Claude API Proxy Route
app.post('/api/chat', async (req, res) => {
    try {
        const { message, game, level, history } = req.body;
        
        const systemPrompt = `You are a professional coach for ${game}. 
        The user is at ${level} level. 
        Explain clearly and simply with examples. 
        Focus on game-specific knowledge and skill-level adaptation.`;

        const response = await axios.post('https://api.anthropic.com/v1/messages', {
            model: "claude-3-haiku-20240307",
            max_tokens: 1024,
            system: systemPrompt,
            messages: [
                ...history,
                { role: "user", content: message }
            ]
        }, {
            headers: {
                'x-api-key': process.env.CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json'
            }
        });

        res.json({ reply: response.data.content[0].text });
    } catch (error) {
        console.error('Claude API Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to get response from AI tutor' });
    }
});

// Quiz Generation Route
app.post('/api/quiz', async (req, res) => {
    try {
        const { game, level, topics } = req.body;
        
        const prompt = `Generate a 5-question multiple-choice quiz for ${game} at ${level} level, covering these topics: ${topics.join(', ')}. 
        Format the response as a JSON array of objects, each with 'question', 'options' (array of 4 strings), and 'correctIndex' (number 0-3).`;

        const response = await axios.post('https://api.anthropic.com/v1/messages', {
            model: "claude-3-haiku-20240307",
            max_tokens: 1500,
            system: "You are an expert game coach and quiz generator. Respond ONLY with valid JSON.",
            messages: [
                { role: "user", content: prompt }
            ]
        }, {
            headers: {
                'x-api-key': process.env.CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01',
                'content-type': 'application/json'
            }
        });

        // Parse the JSON from the AI response
        const quizData = JSON.parse(response.data.content[0].text);
        res.json(quizData);
    } catch (error) {
        console.error('Quiz Generation Error:', error);
        res.status(500).json({ error: 'Failed to generate quiz' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
