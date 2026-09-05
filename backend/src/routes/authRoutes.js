// Import Express.
const express = require('express');

// Create an Express router.
const router = express.Router();

// Import the registration controller.
const { 
    registerUser,
    loginUser
} = require('../controllers/authController');

// Define the user registration route.
// POST /api/auth/register
router.post('/register', registerUser);

// Login route.
// POST /api/auth/login
router.post('/login', loginUser);

// Export the router so app.js can use it.
module.exports = router;