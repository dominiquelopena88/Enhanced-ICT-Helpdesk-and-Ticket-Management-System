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

module.exports = {
    createTicket
};
