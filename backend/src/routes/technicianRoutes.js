// Import Express.
const express = require('express');

// Create Express router.
const router = express.Router();


// Import authentication and authorisation middleware.
const {
    authenticateToken,
    authorizeRoles
} = require('../middleware/authMiddleware');


// Import technician controller functions.
const {
    getAssignedTickets,
    getAssignedTicketById,
    updateTicketStatus,
    getTechnicianDashboard
} = require('../controllers/technicianController');


// ============================================================
// TECHNICIAN DASHBOARD
// ============================================================

// Get dashboard summary.
router.get(
    '/dashboard',
    authenticateToken,
    authorizeRoles('ict_technician'),
    getTechnicianDashboard
);


// ============================================================
// ASSIGNED TICKETS
// ============================================================

// Get all tickets assigned to the technician.
router.get(
    '/tickets',
    authenticateToken,
    authorizeRoles('ict_technician'),
    getAssignedTickets
);


// ============================================================
// SINGLE TICKET
// ============================================================

// Get one assigned ticket.
router.get(
    '/tickets/:ticketId',
    authenticateToken,
    authorizeRoles('ict_technician'),
    getAssignedTicketById
);


// ============================================================
// UPDATE TICKET STATUS
// ============================================================

// Update the status of an assigned ticket.
router.put(
    '/tickets/:ticketId/status',
    authenticateToken,
    authorizeRoles('ict_technician'),
    updateTicketStatus
);


// Export router.
module.exports = router;