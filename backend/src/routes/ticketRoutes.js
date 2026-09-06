const express = require('express');
const router = express.Router();

const { createTicket } = require('../controllers/ticketController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// Employee submits a new ICT support ticket.
router.post(
    '/',
    authenticateToken,
    authorizeRoles('employee'),
    createTicket
);

module.exports = router;
