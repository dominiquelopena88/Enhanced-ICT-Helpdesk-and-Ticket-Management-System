// Import the database connection.
const pool = require('../config/database');

// Create a new support ticket.
async function createTicket(req, res) {
    try {
        const { subject, description, category, priority } = req.body;

        // Validate required fields.
        if (!subject || !description || !category) {
            return res.status(400).json({
                message: 'Subject, description, and category are required.'
            });
        }

        // Get the authenticated user's ID from the JWT.
        const userId = req.user.id;

        // Insert the new ticket.
        const [result] = await pool.query(
            `INSERT INTO tickets
            (user_id, subject, description, category, priority)
            VALUES (?, ?, ?, ?, ?)`,
            [
                userId,
                subject,
                description,
                category,
                priority || 'Medium'
            ]
        );

        res.status(201).json({
            message: 'Ticket submitted successfully.',
            ticketId: result.insertId
        });

    } catch (error) {
        console.error('Create ticket error:', error);

        res.status(500).json({
            message: 'Server error while submitting ticket.'
        });
    }
}

// Get all tickets submitted by the logged-in user.
async function getMyTickets(req, res) {
    try {
        // Get the authenticated user's ID from the JWT.
        const userId = req.user.id;

        // Retrieve only tickets belonging to the logged-in user.
        const [tickets] = await pool.query(
            `SELECT
                id,
                subject,
                description,
                category,
                priority,
                status,
                created_at
             FROM tickets
             WHERE user_id = ?
             ORDER BY created_at DESC, id DESC`,
            [userId]
        );

        // Return the user's tickets.
        return res.status(200).json({
            message: 'Tickets retrieved successfully.',
            tickets: tickets
        });

    } catch (error) {
        console.error('Get my tickets error:', error);

        return res.status(500).json({
            message: 'Server error while retrieving tickets.'
        });
    }
}

module.exports = {
    createTicket,
    getMyTickets
};