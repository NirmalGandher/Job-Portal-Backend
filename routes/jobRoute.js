// routes/jobRoute.js
import express from "express";
import Job from "../models/jobs.js";

import JobApplication from "../models/jobApplication.js";


const router = express.Router();

// ✅ Get all jobs
router.get("/", async(req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
});

// ✅ Apply to a job
router.post("/apply/:jobId", async(req, res) => {
    const { jobId } = req.params;
    const { userId, coverLetter } = req.body;

    try {
        // prevent duplicate applications
        const existing = await Application.findOne({ job: jobId, user: userId });
        if (existing) {
            return res.status(400).json({ error: "You already applied to this job" });
        }

        const application = new Application({ job: jobId, user: userId, coverLetter });
        await application.save();
        res.status(201).json({ message: "Application submitted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Application failed" });
    }
});

export default router;