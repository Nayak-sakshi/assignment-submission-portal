const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Authenticate user
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];  // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key');  // Verify token
        req.userId = decoded.userId;  // Set userId in the request
        req.role = decoded.role;      // Set role in the request
        next();  // Proceed to next middleware or route
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Authenticate admin
const authenticateAdmin = (req, res, next) => {
    if (req.role !== 'admin') {  // Check if the role is 'admin'
        return res.status(403).json({ message: 'Access denied, admins only' });
    }
    next();  // Proceed to next middleware or route if the user is an admin
};

module.exports = { authenticate, authenticateAdmin };
