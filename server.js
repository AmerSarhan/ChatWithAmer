const express = require('express');
const cors = require('cors');
const path = require('path');

// Import API routes
const chatHandler = require('./api/chat');
const calendarHandler = require('./api/calendar');
const statusHandler = require('./api/status');
const calendlyHandler = require('./api/calendly');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.post('/api/chat', chatHandler);
app.all('/api/calendar', calendarHandler);
app.all('/api/status', statusHandler);
app.all('/api/calendly', calendlyHandler);

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('API endpoints:');
  console.log('  POST /api/chat');
  console.log('  POST /api/calendar');
  console.log('  POST /api/calendly');
  console.log('  GET  /api/status');
});
