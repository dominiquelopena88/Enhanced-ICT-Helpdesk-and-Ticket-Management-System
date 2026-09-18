// ============================================================
// ENHANCED ICT HELPDESK - BACKEND APPLICATION
// ============================================================

// Import Express.
const express = require('express');

// Import Node's path module.
const path = require('path');

// Import CORS middleware.
const cors = require('cors');

// Load environment variables from .env.
require('dotenv').config();


// ============================================================
// ROUTES
// ============================================================

// Import authentication routes.
const authRoutes = require('./routes/authRoutes');

// Import employee ticket routes.
const ticketRoutes = require('./routes/ticketRoutes');

// Import administrator routes.
const adminRoutes = require('./routes/adminRoutes');

// Import ICT technician routes.
const technicianRoutes = require('./routes/technicianRoutes');


// ============================================================
// CREATE APPLICATION
// ============================================================

const app = express();


// ============================================================
// MIDDLEWARE
// ============================================================

// Enable CORS so the frontend can communicate
// with the backend.
app.use(cors());

// Allow Express to read JSON request bodies.
app.use(express.json());


// ============================================================
// FRONTEND FILES
// ============================================================

// Define the frontend folder path.
const frontendPath = path.join(
    __dirname,
    '../../frontend'
);

// Serve all frontend files such as:
// index.html
// apps.js
// general.js
// CSS files
// images
app.use(
    express.static(frontendPath)
);


// ============================================================
// API ROUTES
// ============================================================

// Authentication.
// /api/auth/...
app.use(
    '/api/auth',
    authRoutes
);


// Employee tickets.
// /api/tickets/...
app.use(
    '/api/tickets',
    ticketRoutes
);


// Administrator.
// /api/admin/...
app.use(
    '/api/admin',
    adminRoutes
);


// ICT Technician.
// /api/technician/...
app.use(
    '/api/technician',
    technicianRoutes
);


// ============================================================
// FRONTEND HOME PAGE
// ============================================================

// Serve index.html when visiting:
// http://localhost:3000/
app.get(
    '/',
    (req, res) => {

        res.sendFile(
            path.join(
                frontendPath,
                'index.html'
            )
        );
    }
);


// ============================================================
// START SERVER
// ============================================================

// Get the port number from .env.
// Use 3000 if no port was specified.
const PORT =
    process.env.PORT || 3000;


// Start the server.
app.listen(
    PORT,
    () => {

        console.log(
            `Server running on http://localhost:${PORT}`
        );
    }
);