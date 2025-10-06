const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve index.html for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`
    ⛳ The Voyage Pitch Deck is running!
    
    🌐 View at: http://localhost:${PORT}
    
    📱 To share on your local network:
       Find your IP address and use: http://[YOUR_IP]:${PORT}
    
    Press Ctrl+C to stop the server
    `);
});
