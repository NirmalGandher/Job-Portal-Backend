const express = require("express");
const router = express.Router();
const Application = require("../models/Application");

router.get("/applications", async(req, res) => {
    try {
        const applications = await Application.find()
            .populate("user", "name email") // fetch user name and email
            .populate("job", "title description"); // fetch job title and description

        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ message: "Error fetching applications", error: err });
    }
});

module.exports = router;