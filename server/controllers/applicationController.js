// backend/controllers/applicationController.js
import asyncHandler from "express-async-handler";
import Application from "../models/applicationModel.js";
import Job from "../models/jobModel.js";

// @desc    Apply to a job
// @route   POST /api/applications/apply
// @access  Private
export const applyToJob = asyncHandler(async(req, res) => {
    const userId = req.user._id;
    const { jobId } = req.body;

    if (!jobId) {
        return res.status(400).json({ message: "Job ID is required." });
    }

    const job = await Job.findById(jobId);
    if (!job) {
        return res.status(404).json({ message: "Job not found." });
    }

    const alreadyApplied = await Application.findOne({ job: jobId, user: userId });
    if (alreadyApplied) {
        return res.status(400).json({ message: "You have already applied to this job." });
    }

    const application = await Application.create({
        job: jobId,
        user: userId,
    });

    res.status(201).json({ message: "Application submitted successfully.", application });
});