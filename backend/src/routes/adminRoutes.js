const express = require('express');
const router = express.Router();

const {
    authenticateToken,
    authorizeRoles
} = require('../middleware/authMiddleware');

const {
    getAllUsers,
    updateUserRole
} = require('../controllers/adminController');


// Admin views all users.
router.get(
    '/users',
    authenticateToken,
    authorizeRoles('admin'),
    getAllUsers
);


// Admin updates a user's role.
router.put(
    '/users/:id/role',
    authenticateToken,
    authorizeRoles('admin'),
    updateUserRole
);


// Test endpoint for admin-only access.
router.get(
    '/test',
    authenticateToken,
    authorizeRoles('admin'),
    (req, res) => {

        res.status(200).json({
            message: 'Admin access granted.',
            user: req.user
        });
    }
);

module.exports = router;