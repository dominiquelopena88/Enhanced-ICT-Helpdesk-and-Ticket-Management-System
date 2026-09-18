// Import the database connection.
const pool = require('../config/database');

// Import the automatic technician assignment service.
const {
    assignTicketToTechnician
} = require('../services/technicianAssignmentService');

// Import the ticket classification service.
const {
    classifyTicket
} = require('../services/ticketClassificationService');


// Create a new support ticket.
async function createTicket(req, res) {
    try {
        const {
            subject,
            description,
            priority
        } = req.body;


        // Validate required fields.
        if (!subject || !description) {
            return res.status(400).json({
                message: 'Subject and description are required.'
            });
        }


        // Get the authenticated user's ID from the JWT.
        const userId = req.user.id;


        // Automatically classify the ticket.
        const classification = classifyTicket(
            subject,
            description
        );


        // Get the category predicted by the classifier.
        const category = classification.category;


        // Insert the ticket using the automatically
        // classified category.
        const [result] = await pool.query(
            'INSERT INTO tickets (user_id, subject, description, category, priority) VALUES (?, ?, ?, ?, ?)',
            [
                userId,
                subject,
                description,
                category,
                priority || 'Medium'
            ]
        );


        // Get the newly created ticket ID.
        const ticketId = result.insertId;


        // Automatically find a suitable ICT technician.
        const assignment = await assignTicketToTechnician(
            ticketId
        );


        // If a technician was successfully assigned.
        if (assignment.success) {
            return res.status(201).json({
                message: 'Ticket submitted and automatically assigned successfully.',

                ticketId: ticketId,

                category: category,

                classification_score: classification.confidence,

                assigned_technician: {
                    id: assignment.technician.id,
                    name: assignment.technician.full_name,
                    workload: assignment.technician.workload
                }
            });
        }


        // Ticket was created but no suitable technician
        // was found.
        return res.status(201).json({
            message: 'Ticket submitted successfully, but no suitable technician was available for automatic assignment.',

            ticketId: ticketId,

            category: category,

            classification_score: classification.confidence,

            assigned_technician: null
        });


    } catch (error) {

        console.error('Create ticket error:', error);

        return res.status(500).json({
            message: 'Server error while submitting ticket.'
        });
    }
}

// Get all tickets submitted by the logged-in user.
async function getMyTickets(req, res) {

    try {

        // Get the authenticated user's ID from the JWT.
        const userId = req.user.id;


        // Retrieve the user's tickets together with:
        // - assigned technician name
        // - technician comment
        // - resolved by name
        // - resolved date
        const [tickets] = await pool.query(
            `SELECT
                t.id,
                t.user_id,
                t.subject,
                t.description,
                t.category,
                t.priority,
                t.status,
                t.created_at,
                t.assigned_to,
                t.assigned_at,
                t.resolved_by,
                t.resolved_at,
                t.technician_comment,

                employee.full_name AS employee_name,
                employee.email AS employee_email,

                assigned.full_name AS assigned_technician,

                resolver.full_name AS resolved_by_name

             FROM tickets t

             INNER JOIN users employee
                ON t.user_id = employee.id

             LEFT JOIN users assigned
                ON t.assigned_to = assigned.id

             LEFT JOIN users resolver
                ON t.resolved_by = resolver.id

             WHERE t.user_id = ?

             ORDER BY
                t.created_at DESC,
                t.id DESC`,
            [userId]
        );


        // Return the user's tickets.
        return res.status(200).json({
            message: 'Tickets retrieved successfully.',
            tickets
        });


    } catch (error) {

        console.error(
            'Get my tickets error:',
            error
        );


        return res.status(500).json({
            message:
                'Server error while retrieving tickets.'
        });
    }
}

module.exports = {
    createTicket,
    getMyTickets
};