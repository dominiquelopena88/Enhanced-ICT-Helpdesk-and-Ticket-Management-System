// Import the database connection pool.
const pool = require('../config/database');

// Import bcrypt for securely hashing passwords.
const bcrypt = require('bcrypt');

// Register a new user.
async function registerUser(req, res) {
    try {
        // Get the user's registration information
        // from the request body.
        const { full_name, email, password } = req.body;

        // Check that all required fields were provided.
        if (!full_name || !email || !password) {
            return res.status(400).json({
                message: 'Full name, email and password are required.'
            });
        }

        // Check whether the email address is already registered.
        const [existingUsers] = await pool.query(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        // If a user with this email already exists,
        // stop the registration process.
        if (existingUsers.length > 0) {
            return res.status(409).json({
                message: 'Email address is already registered'
            });
        }

        // Convert the plain-text password into a secure hash.
        const passwordHash = await bcrypt.hash(password, 12);

        // Insert the new user into the database.
        const [result] = await pool.query(
            `INSERT INTO users
            (full_name, email, password_hash)
            VALUES (?, ?, ?)`,
            [full_name, email, passwordHash]
        );

        // Send a successful response back to the employee.
        return res.status(201).json({
            message: 'User registered successfully.',
            userId: result.insertId
        });

    } catch (error) {
        // Display the error in the backend terminal.
        console.error('Registration error:', error);

        // Send a general error response to the employee.
        return res.status(500).json({
            message: 'An unexpected server error occured.'
        });
    }
}

// Log in an existing user.
async function loginUser(req, res) {
    try {
        // Get the user's login information
        // from the request body.
        const { email, password } = req.body;

        // Check that both email and password were provided.
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required.'
            });
        }

        // Find the user by email address.
        const [users] = await pool.query(
            'SELECT id, full_name, email, password_hash FROM users WHERE email = ?',
            [email]
        );

        // If no user was found, the login details are invalid.
        if (users.length === 0) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        // Get the user record from the database.
        const user = users[0];

        // Compare the password entered by the user
        // with the hashed password stored in the database.
        const passwordMatch = await bcrypt.compare(
            password,
            user.password_hash
        );

        // If the passwords do not match, reject the login.
        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Invalid email or password.'
            });
        }

        // Login was successful.
        return res.status(200).json({
            message: 'Login successful.',
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email
            }
        });

    } catch (error) {
        // Display the error in the backend terminal.
        console.error('Login error:', error);

        // Send a general error response to the employee.
        return res.status(500).json({
            message: 'An unexpected server error occurred.'
        });
    }
}

// Export the registration function
// so the route can use it.
module.exports = {
    registerUser,
    loginUser
};