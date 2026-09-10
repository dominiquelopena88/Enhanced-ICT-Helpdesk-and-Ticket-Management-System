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

        const allowedRoles = ['employee', 'admin'];

        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                message: 'Invalid role. Role must be employee or admin.'
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

module.exports = {
    getAllUsers,
    updateUserRole
};