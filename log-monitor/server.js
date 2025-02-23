const express = require('express');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const app = express();
const PORT = 3000;

// Enable CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/logs', async (req, res) => {
    const { file, keyword, limit } = req.query;
    const logFilePath = path.join(__dirname, 'var', 'log', file);


    if (!file) return res.status(400).json({ error: "Filename is required." });
    if (!fs.existsSync(logFilePath)) return res.status(404).json({ error: "File not found." });
    if (fs.statSync(logFilePath).isDirectory()) {
        console.error('Error: The path is a directory, not a file.');
        return res.status(400).json({ error: "The path provided is a directory, not a file." });
    }


    const results = []; 
    try {
        const rl = readline.createInterface({
            input: fs.createReadStream(logFilePath, { encoding: 'utf-8' }),
            crlfDelay: Infinity
        });
    
        for await (const line of rl) {
            if (!keyword || line.toLowerCase().includes(keyword.toLowerCase())) {
                results.push(line);
            }
        }
    
        results.reverse(); // Newest events first
        res.json(results.slice(0, limit ? parseInt(limit) : results.length));
    } catch (err) {
        console.error('Error reading the log file:', err);
        res.status(500).json({ error: "Error reading the log file." });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));