const express = require('express');
const { adminLogin, adminRegister, getAssignments, acceptAssignment, rejectAssignment } = require('../controllers/adminController');
const { authenticate, authenticateAdmin } = require('../middlewares/authMiddleware');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Assignment = require('../models/Assignment');

const router = express.Router();

// Register a new admin
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingAdmin = await User.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new User({ username, password: hashedPassword, role: 'admin' });
        await admin.save();

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Admin Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await User.findOne({ username });
        if (!admin) return res.status(400).json({ message: 'Admin not found' });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: admin._id, role: admin.role }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch all admins (only accessible by admins)
router.get('/admins', authenticate, authenticateAdmin, async (req, res) => {
    try {
        // Fetch all users with the role 'admin'
        const admins = await User.find({ role: 'admin' });

        if (!admins || admins.length === 0) {
            return res.status(404).json({ message: 'No admins found' });
        }

        res.json(admins);
    } catch (err) {
        console.error(err);  // Log error for debugging
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch assignments for the admin (using the logged-in admin's ID)
router.get('/assignments', authenticate, authenticateAdmin, async (req, res) => {
    try {
        // Fetch assignments assigned to the current admin
        const assignments = await Assignment.find({ adminId: req.userId });

        if (!assignments || assignments.length === 0) {
            return res.status(404).json({ message: 'No assignments found for this admin.' });
        }

        res.json(assignments);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Fetch assignments for a specific admin
router.get('/assignments/:adminId', authenticate, authenticateAdmin, async (req, res) => {
    const { adminId } = req.params;  // Get the adminId from the URL
    console.log('Admin ID:', adminId);  // Log the adminId passed in the URL
    try {
        // Check if the authenticated admin matches the provided adminId
        if (req.userId !== adminId) {
            return res.status(403).json({ message: 'Access denied, admin mismatch' });
        }

        // Fetch assignments for the given adminId
        const assignments = await Assignment.find({ adminId });

        if (!assignments || assignments.length === 0) {
            return res.status(404).json({ message: 'No assignments found for this admin' });
        }

        res.json(assignments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Accept an assignment
router.post('/assignments/:id/accept', authenticate, authenticateAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        // Find the assignment by ID
        const assignment = await Assignment.findById(id);

        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        // Update the assignment status to 'accepted'
        assignment.status = 'accepted';
        await assignment.save();

        res.json({ message: 'Assignment accepted', assignment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/assignments/:id/reject', authenticate, authenticateAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        // Find the assignment by ID
        const assignment = await Assignment.findById(id);

        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        // Update the assignment status to 'rejected'
        assignment.status = 'rejected';
        await assignment.save();

        res.json({ message: 'Assignment rejected', assignment });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});



// View assignments tagged to the admin
router.get('/assignments/:adminId', authenticateAdmin, getAssignments);

// Accept an assignment
router.post('/assignments/:id/accept', authenticateAdmin, acceptAssignment);

// Reject an assignment
router.post('/assignments/:id/reject', authenticateAdmin, rejectAssignment);

module.exports = router;
