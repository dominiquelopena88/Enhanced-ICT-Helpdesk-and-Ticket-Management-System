// Import the database connection pool.
const pool = require('../config/database');


// Automatically find and assign the most suitable
// ICT technician for a ticket.
async function assignTicketToTechnician(ticketId) {

    try {

        // Get the ticket's category.
        const [tickets] = await pool.query(
            `SELECT id, category, status
             FROM tickets
             WHERE id = ?`,
            [ticketId]
        );

        // Stop if the ticket does not exist.
        if (tickets.length === 0) {
            return {
                success: false,
                message: 'Ticket not found.'
            };
        }

        const ticket = tickets[0];

        // Find ICT technicians who have the
        // skill/category required by the ticket.
        const [technicians] = await pool.query(
            `SELECT
                u.id,
                u.full_name,
                COUNT(
                    CASE
                        WHEN t.status IN ('Open', 'In Progress')
                        THEN t.id
                    END
                ) AS current_workload
             FROM users u

             INNER JOIN technician_skills ts
                ON u.id = ts.user_id

             LEFT JOIN tickets t
                ON u.id = t.assigned_to

             WHERE u.role = 'ict_technician'
             AND ts.category = ?

             GROUP BY
                u.id,
                u.full_name

             ORDER BY current_workload ASC, u.id ASC`,
            [ticket.category]
        );

        // No technician has the required skill.
        if (technicians.length === 0) {
            return {
                success: false,
                message: `No ICT technician is available for category: ${ticket.category}.`
            };
        }

        // Select the technician with the lowest workload.
        const selectedTechnician = technicians[0];

        // Assign the ticket to the selected technician.
        await pool.query(
            `UPDATE tickets
             SET assigned_to = ?,
                 assigned_at = CURRENT_TIMESTAMP
             WHERE id = ?`,
            [
                selectedTechnician.id,
                ticketId
            ]
        );

        return {
            success: true,
            technician: {
                id: selectedTechnician.id,
                full_name: selectedTechnician.full_name,
                workload: Number(selectedTechnician.current_workload)
            }
        };

    } catch (error) {

        console.error(
            'Automatic technician assignment error:',
            error
        );

        throw error;
    }
}


module.exports = {
    assignTicketToTechnician
};