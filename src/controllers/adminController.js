const Assignment = require('../models/Assignment');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Admin registration logic
const adminRegister = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the admin already exists
        const existingAdmin = await User.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new admin
        const admin = new User({
            username,
            password: hashedPassword,
            role: 'admin', // Ensure the role is set to 'admin'
        });

        // Save the admin in the database
        await admin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Admin login logic
const adminLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the admin exists
        const admin = await User.findOne({ username, role: 'admin' });

        if (!admin) {
            return res.status(400).json({ message: 'Admin not found' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: admin._id, role: admin.role },
            'your_secret_key', // Replace this with your actual secret key
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// View assignments tagged to the admin
const getAssignments = async (req, res) => {
    const { adminId } = req.params;

    try {
        const assignments = await Assignment.find({ adminId, status: 'pending' });
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Accept an assignment
const acceptAssignment = async (req, res) => {
    const { id } = req.params; // Get the assignment id from the URL

    try {
        // Find the assignment by its ID and update its status to "accepted"
        const assignment = await Assignment.findByIdAndUpdate(id, { status: 'accepted' }, { new: true });

        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        // Return the updated assignment
        res.json({ message: 'Assignment accepted successfully', assignment });
    } catch (err) {
        console.error('Error accepting assignment:', err);  // Log the error to the console
        res.status(500).json({ message: 'Server error' });
    }
};

// Reject an assignment
const rejectAssignment = async (req, res) => {
    const { id } = req.params;

    try {
        const assignment = await Assignment.findById(id);
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

        assignment.status = 'rejected';
        await assignment.save();

        res.json({ message: 'Assignment rejected' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { adminLogin, getAssignments, acceptAssignment,adminRegister, rejectAssignment };
