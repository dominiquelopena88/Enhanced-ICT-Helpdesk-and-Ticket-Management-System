// ============================================================
// ENHANCED ICT HELPDESK
// ADMINISTRATOR ROUTES
// ============================================================

const express = require('express');

const router = express.Router();

const {
    authenticateToken,
    authorizeRoles
} = require('../middleware/authMiddleware');

const {
    getAllUsers,
    updateUserRole,
    getTechnicians,
    addTechnicianSkill,
    removeTechnicianSkill,
    getActiveTickets
} = require('../controllers/adminController');

const {
    assignTicketToTechnician
} = require('../services/technicianAssignmentService');


// ============================================================
// ADMIN - USERS
// ============================================================

// Administrator views all users.
router.get(
    '/users',
    authenticateToken,
    authorizeRoles('administrator'),
    getAllUsers
);


// Administrator updates a user's role.
router.put(
    '/users/:id/role',
    authenticateToken,
    authorizeRoles('administrator'),
    updateUserRole
);


// ============================================================
// ADMIN - TECHNICIANS
// ============================================================

// Administrator views all ICT technicians and their skills.
router.get(
    '/technicians',
    authenticateToken,
    authorizeRoles('administrator'),
    getTechnicians
);


// Administrator adds a skill to an ICT technician.
router.post(
    '/technicians/:id/skills',
    authenticateToken,
    authorizeRoles('administrator'),
    addTechnicianSkill
);


// Administrator removes a skill from an ICT technician.
router.delete(
    '/technicians/:id/skills/:skillId',
    authenticateToken,
    authorizeRoles('administrator'),
    removeTechnicianSkill
);


// ============================================================
// ADMIN - ACTIVE TICKETS
// ============================================================

// Administrator views all active tickets.
router.get(
    '/tickets/active',
    authenticateToken,
    authorizeRoles('administrator'),
    getActiveTickets
);


// ============================================================
// ADMIN - TEST
// ============================================================

// Test endpoint for administrator-only access.
router.get(
    '/test',
    authenticateToken,
    authorizeRoles('administrator'),
    (req, res) => {

        res.status(200).json({
            message: 'Admin access granted.',
            user: req.user
        });

    }
);


// ============================================================
// ADMIN - AUTOMATIC TICKET ASSIGNMENT
// ============================================================

// Test automatic technician assignment.
router.post(
    '/tickets/:id/auto-assign',
    authenticateToken,
    authorizeRoles('administrator'),
    async (req, res) => {

        try {

            const result =
                await assignTicketToTechnician(
                    req.params.id
                );


            if (!result.success) {

                return res.status(404).json(
                    result
                );

            }


            res.status(200).json({

                message:
                    'Ticket automatically assigned successfully.',

                assignment:
                    result.technician

            });

        } catch (error) {

            console.error(
                'Auto-assignment route error:',
                error
            );


            res.status(500).json({

                message:
                    'An unexpected server error occurred.'

            });

        }

    }
);


module.exports = router;