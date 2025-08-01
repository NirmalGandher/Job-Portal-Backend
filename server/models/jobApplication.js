import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },
    appliedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Application = mongoose.model("Application", jobApplicationSchema);
export default Application;