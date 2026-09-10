const express = require('express');
const router = express.Router();

const { createTicket, getMyTickets } = require('../controllers/ticketController');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// Employee submits a new ICT support ticket.
router.post(
    '/',
    authenticateToken,
    authorizeRoles('employee'),
    createTicket
);

// Employee views all tickets submitted by their own account.
router.get(
    '/',
    authenticateToken,
    authorizeRoles('employee'),
    getMyTickets
);

module.exports = router;