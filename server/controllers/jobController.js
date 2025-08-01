// controllers/jobController.js

const jobs = require("../models/Job");

// Get all jobs
const getAllJobs = (req, res) => {
    res.json(jobs);
};

// Get a single job by ID
const getJobById = (req, res) => {
    const job = jobs.find(j => j.id === parseInt(req.params.id));
    if (job) {
        res.json(job);
    } else {
        res.status(404).json({ message: "Job not found" });
    }
};

// Create a new job
const createJob = (req, res) => {
    const { title, company, location, salary } = req.body;
    const newJob = {
        id: jobs.length + 1,
        title,
        company,
        location,
        salary
    };
    jobs.push(newJob);
    res.status(201).json(newJob);
};

// Update a job
const updateJob = (req, res) => {
    const job = jobs.find(j => j.id === parseInt(req.params.id));
    if (job) {
        job.title = req.body.title || job.title;
        job.company = req.body.company || job.company;
        job.location = req.body.location || job.location;
        job.salary = req.body.salary || job.salary;
        res.json(job);
    } else {
        res.status(404).json({ message: "Job not found" });
    }
};

// Delete a job
const deleteJob = (req, res) => {
    const index = jobs.findIndex(j => j.id === parseInt(req.params.id));
    if (index !== -1) {
        jobs.splice(index, 1);
        res.json({ message: "Job deleted" });
    } else {
        res.status(404).json({ message: "Job not found" });
    }
};

module.exports = {
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
};