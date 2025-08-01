// app.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import authRoute from "./routes/authRoute.js";
import jobRoute from "./routes/jobRoute.js";
import jobApplicationRoutes from "./routes/jobApplicationRoute.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/applications", jobApplicationRoutes);

// MongoDB connection
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

// Local development only
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`🚀 Server is running on port ${port}`);
    });
}

// Export for Vercel
export default app;