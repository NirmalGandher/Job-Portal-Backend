// seeder.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Job from "./models/Job.js";
import connectDB from "./config/db.js";

dotenv.config();

const jobs = [{
        title: "Full Stack Developer",
        company: "CodeCraft",
        location: "Remote",
        salary: "PKR 180,000/month",
    },
    {
        title: "MERN Stack Engineer",
        company: "InnovateX",
        location: "Lahore",
        salary: "PKR 170,000/month",
    },
    {
        title: "Frontend Developer (React)",
        company: "NextGenSoft",
        location: "Karachi",
        salary: "PKR 160,000/month",
    },
    {
        title: "Backend Developer (Node.js)",
        company: "TechVerse",
        location: "Islamabad",
        salary: "PKR 165,000/month",
    },
    {
        title: "UI/UX Designer",
        company: "PixelWave Studio",
        location: "Remote",
        salary: "PKR 120,000/month",
    },
    // add more jobs as you want
];

const seedJobs = async() => {
    try {
        await connectDB(); // Connect to MongoDB
        await Job.deleteMany(); // Clear existing jobs
        await Job.insertMany(jobs); // Insert jobs
        console.log("Jobs seeded successfully!");
        process.exit();
    } catch (error) {
        console.error("Error seeding jobs:", error);
        process.exit(1);
    }
};

seedJobs();