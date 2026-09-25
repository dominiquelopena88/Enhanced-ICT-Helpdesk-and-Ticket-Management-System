const pool = require('../config/database');

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const [users] = await pool.query(
            `SELECT id, full_name, email, role
             FROM users
             ORDER BY id ASC`
        );

        res.status(200).json({
            message: 'Users retrieved successfully.',
            users
        });

    } catch (error) {
        console.error('Get users error:', error);

        res.status(500).json({
            message: 'An unexpected server error occurred.'
        });
    }
};


// Update user role
const updateUserRole = async (req, res) => {
    try {
        const userId = req.params.id;
        const { role } = req.body;

        const allowedRoles = ['employee', 'administrator', 'ict_technician'];

        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                message: 'Invalid role. Role must be employee, administrator, or ict_technician.'
            });
        }

        const [result] = await pool.query(
            `UPDATE users
             SET role = ?
             WHERE id = ?`,
            [role, userId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        res.status(200).json({
            message: 'User role updated successfully.'
        });

    } catch (error) {
        console.error('Update role error:', error);

        res.status(500).json({
            message: 'An unexpected server error occurred.'
        });
    }
};


// Get all ICT technicians with their assigned skills
const getTechnicians = async (req, res) => {
    try {
        const [technicians] = await pool.query(
            `SELECT
                u.id,
                u.full_name,
                u.email,
                u.role,
                ts.id AS skill_id,
                ts.category
             FROM users u
             LEFT JOIN technician_skills ts
                ON u.id = ts.user_id
             WHERE u.role = 'ict_technician'
             ORDER BY u.id ASC, ts.category ASC`
        );

        res.status(200).json({
            message: 'Technicians retrieved successfully.',
            technicians
        });

    } catch (error) {
        console.error('Get technicians error:', error);

        res.status(500).json({
            message: 'An unexpected server error occurred.'
        });
    }
};

 // Add a skill to an ICT technician.
 const addTechnicianSkill = async (req, res) => {
    try {

        const technicianId = req.params.id;
        const { category } = req.body;


        // Validate the skill/category.
        const allowedCategories = [
            'Network',
            'Hardware',
            'Software',
            'Account'
        ];

        if (!allowedCategories.includes(category)) {
            return res.status(400).json({
                message: 'Invalid category.'
            });
        }


        // Check that the user is an ICT technician.
        const [technicians] = await pool.query(
            `SELECT id
             FROM users
             WHERE id = ?
             AND role = 'ict_technician'`,
            [technicianId]
        );

        if (technicians.length === 0) {
            return res.status(404).json({
                message: 'ICT technician not found.'
            });
        }


        // Check whether the technician already has
        // this skill.
        const [existingSkills] = await pool.query(
            `SELECT id
             FROM technician_skills
             WHERE user_id = ?
             AND category = ?`,
            [technicianId, category]
        );

        if (existingSkills.length > 0) {
            return res.status(409).json({
                message: 'Technician already has this skill.'
            });
        }


        // Add the new technician skill.
        await pool.query(
            `INSERT INTO technician_skills
             (user_id, category)
             VALUES (?, ?)`,
            [technicianId, category]
        );


        return res.status(201).json({
            message: 'Technician skill added successfully.'
        });


    } catch (error) {

        console.error(
            'Add technician skill error:',
            error
        );

        return res.status(500).json({
            message: 'An unexpected server error occurred.'
        });
    }
};

// Remove a skill from an ICT technician.
const removeTechnicianSkill = async (req, res) => {
    try {

        const technicianId = req.params.id;
        const skillId = req.params.skillId;


        // Check that the user is an ICT technician.
        const [technicians] = await pool.query(
            `SELECT id
             FROM users
             WHERE id = ?
             AND role = 'ict_technician'`,
            [technicianId]
        );

        if (technicians.length === 0) {
            return res.status(404).json({
                message: 'ICT technician not found.'
            });
        }


        // Check that the skill belongs to this technician.
        const [skills] = await pool.query(
            `SELECT id
             FROM technician_skills
             WHERE id = ?
             AND user_id = ?`,
            [skillId, technicianId]
        );

        if (skills.length === 0) {
            return res.status(404).json({
                message: 'Technician skill not found.'
            });
        }


        // Remove the skill.
        await pool.query(
            `DELETE FROM technician_skills
             WHERE id = ?
             AND user_id = ?`,
            [skillId, technicianId]
        );


        return res.status(200).json({
            message: 'Technician skill removed successfully.'
        });


    } catch (error) {

        console.error(
            'Remove technician skill error:',
            error
        );

        return res.status(500).json({
            message: 'An unexpected server error occurred.'
        });
    }
};

/*
    ============================================================
    ADMIN - ACTIVE TICKETS
    ============================================================
*/

// Get all active tickets for the administrator.
const getActiveTickets = async (req, res) => {

    try {

        const [tickets] = await pool.query(

            `SELECT
                t.id,
                t.subject,
                t.description,
                t.category,
                t.priority,
                t.status,
                t.created_at,
                t.assigned_to,
                t.assigned_at,

                requester.full_name AS requester_name,
                requester.email AS requester_email,

                technician.full_name AS technician_name

             FROM tickets t

             LEFT JOIN users requester
                ON t.user_id = requester.id

             LEFT JOIN users technician
                ON t.assigned_to = technician.id

             WHERE t.status NOT IN ('Resolved', 'Closed')

             ORDER BY t.created_at DESC`
        );


        res.status(200).json({

            message:
                'Active tickets retrieved successfully.',

            tickets

        });


    } catch (error) {

        console.error(
            'Get active tickets error:',
            error
        );


        res.status(500).json({

            message:
                'An unexpected server error occurred.'

        });
    }
};

/*
    ============================================================
    ADMIN - TICKET ANALYTICS
    ============================================================
*/

// Get ticket analytics for the administrator.
const getTicketAnalytics = async (req, res) => {

    try {

        const { fromDate, toDate } = req.query;

        let dateCondition = '';
        const queryParams = [];

        if (fromDate && toDate) {
            dateCondition =
                ' WHERE created_at >= ? AND created_at < DATE_ADD(?, INTERVAL 1 DAY) ';

            queryParams.push(
                fromDate,
                toDate
            );
        }

        // Get total number of tickets.
        const [totalTickets] = await pool.query(
            `SELECT COUNT(*) AS total
             FROM tickets
             ${dateCondition}`,
            queryParams
        );


        // Get ticket count by status.
        const [statusBreakdown] = await pool.query(
            `SELECT
                status,
                COUNT(*) AS count
             FROM tickets
             ${dateCondition}
             GROUP BY status
             ORDER BY status`,
            queryParams
        );


        // Get ticket count by category.
        const [categoryBreakdown] = await pool.query(
            `SELECT
                category,
                COUNT(*) AS count
             FROM tickets
             ${dateCondition}
             GROUP BY category
             ORDER BY category`,
            queryParams
        );


        // Get ticket count by priority.
        const [priorityBreakdown] = await pool.query(
            `SELECT
                priority,
                COUNT(*) AS count
             FROM tickets
             ${dateCondition}
             GROUP BY priority
             ORDER BY priority`,
            queryParams
        );


        // Get number of tickets assigned to each ICT technician.
        const [technicianWorkload] = await pool.query(
            `SELECT
                u.id AS technician_id,
                u.full_name AS technician_name,
                COUNT(t.id) AS ticket_count
             FROM users u
             LEFT JOIN tickets t
                ON t.assigned_to = u.id
                ${fromDate && toDate
                    ? `AND t.created_at >= ?
                       AND t.created_at < DATE_ADD(?, INTERVAL 1 DAY)`
                    : ''}
             WHERE u.role = 'ict_technician'
             GROUP BY u.id, u.full_name
             ORDER BY ticket_count DESC, u.full_name ASC`,
            fromDate && toDate
                ? [fromDate, toDate]
                : []
        );


        res.status(200).json({

            message:
                'Ticket analytics retrieved successfully.',

            totalTickets:
                totalTickets[0].total,

            statusBreakdown,

            categoryBreakdown,

            priorityBreakdown,

            technicianWorkload

        });


    } catch (error) {

        console.error(
            'Get ticket analytics error:',
            error
        );


        res.status(500).json({

            message:
                'An unexpected server error occurred.'

        });
    }
};

// Export ticket analytics as a CSV report.
const exportTicketAnalytics = async (req, res) => {
    try {
        // Get ticket status breakdown.
        const [statusBreakdown] = await pool.query(
            `SELECT
                status,
                COUNT(*) AS count
             FROM tickets
             GROUP BY status
             ORDER BY status`
        );

        // Get ticket category breakdown.
        const [categoryBreakdown] = await pool.query(
            `SELECT
                category,
                COUNT(*) AS count
             FROM tickets
             GROUP BY category
             ORDER BY category`
        );

        // Get ticket priority breakdown.
        const [priorityBreakdown] = await pool.query(
            `SELECT
                priority,
                COUNT(*) AS count
             FROM tickets
             GROUP BY priority
             ORDER BY priority`
        );

        // Get technician workload.
        const [technicianWorkload] = await pool.query(
            `SELECT
                u.full_name AS technician_name,
                COUNT(t.id) AS ticket_count
             FROM users u
             LEFT JOIN tickets t
                ON t.assigned_to = u.id
             WHERE u.role = 'ict_technician'
             GROUP BY u.id, u.full_name
             ORDER BY ticket_count DESC, u.full_name ASC`
        );

        // Get total number of tickets.
        const [totalTickets] = await pool.query(
            `SELECT COUNT(*) AS total
             FROM tickets`
        );

        let csv = '';

        csv += 'ICT Helpdesk Ticket Analytics Report\n';
        csv += `Total Tickets,${totalTickets[0].total}\n\n`;

        csv += 'Tickets by Status\n';
        csv += 'Status,Tickets\n';

        statusBreakdown.forEach(item => {
            csv += `"${item.status}",${item.count}\n`;
        });

        csv += '\nTickets by Category\n';
        csv += 'Category,Tickets\n';

        categoryBreakdown.forEach(item => {
            csv += `"${item.category}",${item.count}\n`;
        });

        csv += '\nTickets by Priority\n';
        csv += 'Priority,Tickets\n';

        priorityBreakdown.forEach(item => {
            csv += `"${item.priority}",${item.count}\n`;
        });

        csv += '\nTechnician Workload\n';
        csv += 'Technician,Assigned Tickets\n';

        technicianWorkload.forEach(item => {
            csv += `"${item.technician_name}",${item.ticket_count}\n`;
        });

        // Tell the browser to download the response as a CSV file.
        res.setHeader(
            'Content-Type',
            'text/csv'
        );

        res.setHeader(
            'Content-Disposition',
            'attachment; filename="ict-ticket-analytics.csv"'
        );

        res.status(200).send(csv);

    } catch (error) {
        console.error(
            'Export ticket analytics error:',
            error
        );

        res.status(500).json({
            message:
                'An unexpected server error occurred.'
        });
    }
};

module.exports = {
    getAllUsers,
    updateUserRole,
    getTechnicians,
    addTechnicianSkill,
    removeTechnicianSkill,
    getActiveTickets,
    getTicketAnalytics,
    exportTicketAnalytics
};