// Import jsonwebtoken for verifying JWT tokens.
const jwt = require('jsonwebtoken');

// Authenticate a logged-in user.
function authenticateToken(req, res, next) {

    // Get the Authorization header.
    const authHeader = req.headers.authorization;

    // Check whether the Authorization header exists.
    if (!authHeader) {
        return res.status(401).json({
            message: 'Access token is required.'
        });
    }

    // Extract the token from "Bearer TOKEN".
    const token = authHeader.split(' ')[1];

    // Check whether a token was provided.
    if (!token) {
        return res.status(401).json({
            message: 'Access token is required.'
        });
    }

    try {

        // Verify the token using the secret stored in .env.
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Store the authenticated user information.
        req.user = decoded;

        // Continue to the next middleware or route.
        next();

    } catch (error) {

        return res.status(403).json({
            message: 'Invalid or expired access token.'
        });
    }
}

// Check whether the authenticated user has
// one of the required roles.
function authorizeRoles(...allowedRoles) {

    return (req, res, next) => {

        // Make sure the user has been authenticated first.
        if (!req.user) {
            return res.status(401).json({
                message: 'Authentication required.'
            });
        }

        // Check whether the user's role is allowed.
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'You are not authorised to access this resource.'
            });
        }

        // User has the required role.
        next();
    };
}

module.exports = {
    authenticateToken,
    authorizeRoles
};