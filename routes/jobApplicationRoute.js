import express from "express";
import Application from "../models/jobApplication.js";
import Job from "../models/jobs.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply to a job - Protected route
router.post("/apply", protect, async(req, res) => {
    try {
        const userId = req.user; // Assuming req.user contains user ID
        const { jobId } = req.body;

        if (!jobId) {
            return res.status(400).json({ success: false, message: "Job ID is required." });
        }

        const jobExists = await Job.findById(jobId);
        if (!jobExists) {
            return res.status(404).json({ success: false, message: "Job not found." });
        }

        // Check if user already applied for this job
        const alreadyApplied = await Application.findOne({ user: userId, job: jobId });
        if (alreadyApplied) {
            return res.status(400).json({ success: false, message: "You have already applied to this job." });
        }

        const application = new Application({ user: userId, job: jobId });
        await application.save();

        return res.status(201).json({ success: true, message: "Job applied successfully!" });
    } catch (error) {
        console.error("Apply Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Get all applications with populated user and job (for dashboard)
router.get("/", protect, async(req, res) => {
    try {
        const applications = await Application.find()
            .populate("user", "username email") // populate only username and email
            .populate("job", "title company location salary"); // populate relevant job fields

        res.status(200).json(applications);
    } catch (error) {
        console.error("Fetch Applications Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

export default router;