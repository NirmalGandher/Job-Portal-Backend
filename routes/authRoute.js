import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register Route
router.post("/register", async(req, res) => {
    const { username, email, password, isEmployer } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, error: "User already exists" });
        }

        const newUser = new User({ username, email, password, isEmployer: !!isEmployer });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(201).json({
            success: true,
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                isEmployer: newUser.isEmployer,
            },
        });
    } catch (err) {
        console.error("Register Error:", err.message);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

// Login Route
router.post("/login", async(req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, error: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ success: false, error: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isEmployer: user.isEmployer,
            },
        });
    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

export default router;