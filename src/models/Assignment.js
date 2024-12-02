const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    task: { type: String, required: true },
    adminId: { type: String, required: true },
    status: { type: String, default: 'pending', enum: ['pending', 'accepted', 'rejected'] },
    timestamp: { type: Date, default: Date.now },
});

const Assignment = mongoose.model('Assignment', AssignmentSchema);

module.exports = Assignment;
