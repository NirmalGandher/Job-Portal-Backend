// app.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoute from "./routes/authRoute.js";
import jobRoute from "./routes/jobRoute.js";
import jobApplicationRoutes from "./routes/jobApplicationRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/auth", authRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/applications", jobApplicationRoutes);

// Connect to MongoDB (only once)
let isConnected = false;
async function connectDB() {
    if (!isConnected) {
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            isConnected = true;
            console.log("✅ MongoDB Connected");
        } catch (err) {
            console.error("❌ MongoDB Connection Error:", err);
        }
    }
}
connectDB();

// Export the app for Vercel serverless deployment
export default app;