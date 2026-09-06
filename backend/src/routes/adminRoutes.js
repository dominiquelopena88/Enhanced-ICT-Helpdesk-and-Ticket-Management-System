const express = require('express');
const router = express.Router();

const {
    authenticateToken,
    authorizeRoles
} = require('../middleware/authMiddleware');

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