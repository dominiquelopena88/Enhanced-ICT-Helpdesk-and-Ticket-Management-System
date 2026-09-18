// Import the database connection pool.
const pool = require('../config/database');


// ============================================================
// GET ASSIGNED TICKETS
// ============================================================

// Get all tickets assigned to the logged-in ICT technician.
async function getAssignedTickets(req, res) {

    try {

        // Get the technician's ID from the JWT.
        const technicianId = req.user.id;


        // Retrieve tickets assigned to this technician.
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
                
                u.full_name AS employee_name,
                u.email AS employee_email,
            
                assigned.full_name AS assigned_technician,

                resolver.full_name AS resolved_by_name

            FROM tickets t
            
            INNER JOIN users u
                ON t.user_id = u.id
            
            LEFT JOIN users assigned
                ON t.assigned_to = assigned.id

            LEFT JOIN users resolver
                ON t.resolved_by = resolver.id
            
                WHERE t.assigned_to = ?
            
            ORDER BY
                CASE
                    WHEN t.status = 'Open' THEN 1
                    WHEN t.status = 'In Progress' THEN 2
                    WHEN t.status = 'Resolved' THEN 3
                    ELSE 4
                END,
                t.created_at DESC,
                t.id DESC`,
            [technicianId]
        );


        // Return the assigned tickets.
        return res.status(200).json({
            message: 'Assigned tickets retrieved successfully.',
            tickets: tickets
        });


    } catch (error) {

        console.error(
            'Get assigned tickets error:',
            error
        );


        return res.status(500).json({
            message:
                'Server error while retrieving assigned tickets.'
        });
    }
}



// ============================================================
// GET SINGLE ASSIGNED TICKET
// ============================================================

// Get one ticket belonging to the logged-in technician.
async function getAssignedTicketById(req, res) {

    try {

        // Get technician ID from the JWT.
        const technicianId = req.user.id;

        // Get ticket ID from the URL.
        const ticketId = req.params.ticketId;


        // Find the ticket only if it is assigned
        // to the logged-in technician.
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

                u.full_name AS employee_name,
                u.email AS employee_email,

                assigned.full_name AS assigned_technician,
                resolver.full_name AS resolved_by_name

            FROM tickets t

            INNER JOIN users u
                ON t.user_id = u.id
            
            LEFT JOIN users assigned
                ON t.assigned_to = assigned.id
            
            LEFT JOIN users resolver
                ON t.resolved_by = resolver.id

             WHERE t.id = ?
             AND t.assigned_to = ?`,
            [
                ticketId,
                technicianId
            ]
        );


        // Ticket was not found or does not belong
        // to this technician.
        if (tickets.length === 0) {

            return res.status(404).json({
                message:
                    'Ticket not found or it is not assigned to you.'
            });
        }


        return res.status(200).json({
            message:
                'Ticket retrieved successfully.',
            ticket:
                tickets[0]
        });


    } catch (error) {

        console.error(
            'Get assigned ticket error:',
            error
        );


        return res.status(500).json({
            message:
                'Server error while retrieving the ticket.'
        });
    }
}



// ============================================================
// UPDATE TICKET STATUS
// ============================================================

// Allow the technician to update the status of
// their assigned ticket.
async function updateTicketStatus(req, res) {

    try {

        // Get technician ID from the JWT.
        const technicianId = req.user.id;

        // Get ticket ID from the URL.
        const ticketId = req.params.ticketId;

        // Get the requested status.
        const {
            status,
            technician_comment
        } = req.body;


        // Allowed technician status values.
        const allowedStatuses = [
            'Open',
            'In Progress',
            'Resolved'
        ];


        // Validate the status.
        if (!allowedStatuses.includes(status)) {

            return res.status(400).json({
                message:
                    'Invalid status. Use Open, In Progress, or Resolved.'
            });
        }


        // Make sure the ticket belongs to
        // the logged-in technician.
        const [tickets] = await pool.query(
            `SELECT
                id,
                status
             FROM tickets
             WHERE id = ?
             AND assigned_to = ?`,
            [
                ticketId,
                technicianId
            ]
        );


        // Ticket was not found.
        if (tickets.length === 0) {

            return res.status(404).json({
                message:
                    'Ticket not found or it is not assigned to you.'
            });
        }


        // If the ticket is being resolved,
        // record who resolved it and when.
        if (status === 'Resolved') {

            await pool.query(
                `UPDATE tickets
                 SET
                    status = ?,
                    technician_comment = ?,
                    resolved_by = ?,
                    resolved_at = CURRENT_TIMESTAMP
                 WHERE id = ?
                 AND assigned_to = ?`,
                [
                    status,
                    technician_comment || null,
                    technicianId,
                    ticketId,
                    technicianId
                ]
            );

        } else {

            // For Open / In Progress,
            // clear resolution information.
            await pool.query(
                `UPDATE tickets
                 SET
                    status = ?,
                    technician_comment = ?,
                    resolved_by = NULL,
                    resolved_at = NULL
                 WHERE id = ?
                 AND assigned_to = ?`,
                [
                    status,
                    technician_comment || null,
                    ticketId,
                    technicianId
                ]
            );
        }


        return res.status(200).json({
            message:
                'Ticket status updated successfully.',
            ticketId:
                Number(ticketId),
            status:
                status
        });


    } catch (error) {

        console.error(
            'Update ticket status error:',
            error
        );


        return res.status(500).json({
            message:
                'Server error while updating ticket status.'
        });
    }
}



// ============================================================
// TECHNICIAN DASHBOARD SUMMARY
// ============================================================

// Get ticket counts for the logged-in technician.
async function getTechnicianDashboard(req, res) {

    try {

        // Get technician ID from JWT.
        const technicianId = req.user.id;


        // Count tickets by status.
        const [results] = await pool.query(
            `SELECT
                COUNT(*) AS total_tickets,

                SUM(
                    CASE
                        WHEN status = 'Open'
                        THEN 1
                        ELSE 0
                    END
                ) AS open_tickets,

                SUM(
                    CASE
                        WHEN status = 'In Progress'
                        THEN 1
                        ELSE 0
                    END
                ) AS in_progress_tickets,

                SUM(
                    CASE
                        WHEN status = 'Resolved'
                        THEN 1
                        ELSE 0
                    END
                ) AS resolved_tickets

             FROM tickets
             WHERE assigned_to = ?`,
            [technicianId]
        );


        const summary = results[0];


        return res.status(200).json({
            message:
                'Technician dashboard retrieved successfully.',

            dashboard: {
                total_tickets:
                    Number(summary.total_tickets || 0),

                open_tickets:
                    Number(summary.open_tickets || 0),

                in_progress_tickets:
                    Number(summary.in_progress_tickets || 0),

                resolved_tickets:
                    Number(summary.resolved_tickets || 0)
            }
        });


    } catch (error) {

        console.error(
            'Technician dashboard error:',
            error
        );


        return res.status(500).json({
            message:
                'Server error while retrieving technician dashboard.'
        });
    }
}



// ============================================================
// EXPORT FUNCTIONS
// ============================================================

module.exports = {

    getAssignedTickets,

    getAssignedTicketById,

    updateTicketStatus,

    getTechnicianDashboard

};