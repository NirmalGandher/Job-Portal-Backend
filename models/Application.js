const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // connected to User model
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" }, // connected to Job/Course model
    appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Application", applicationSchema);