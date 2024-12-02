const express = require('express');
const { registerUser, loginUser, uploadAssignment } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/upload', authenticate, uploadAssignment);

module.exports = router;
