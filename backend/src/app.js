// Import Express.
const express = require('express');

// Import CORS middleware.
const cors = require('cors');

// Load environment variables from .env.
require('dotenv').config();

// Import authentication routes.
const authRoutes = require('./routes/authRoutes');

// Create the Express application.
const app = express();

// Enable CORS so the frontend can communicate
// with backend.
app.use(cors());

// Allow Express to read JSON request bodies.
app.use(express.json());

// Register authentication routes.
// All authentication routes will start with /api/auth.
app.use('/api/auth', authRoutes);

// Basic health-check endpoint.
app.get('/', (req, res) => {
    res.json({
        message: ' Enhanced ICT Helpdesk API is running.'
    });
});

// Get the port number from .env.
// Use 3000 if no port was specified.
const PORT = process.env.PORT || 3000;

// Start the Express server.
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});