const express = require("express");
const router = express.Router();
const Profile = require("../models/profileModel");

// GET a user profile
exports.view = function (req, res) {
    Profile.findOne({ username: req.params.username }, function (err, profile) {
        if (err) {
            return res.status(500).json({
                message: err.message,
            });
        }
        if (profile == null) {
            // profile does not exist
            return res.status(404).json({ message: "Cannot find profile!" });
        }
        return res.json({
            message:
                "Profile of " +
                req.params.username +
                " retrieved successfully!",
            data: profile,
        });
    });
};

// POST (Create new user profile - to be called only when creating a user)
exports.new = function (req, res) {
    Profile.findOne({ username: req.body.username }, function (err, profile) {
        if (profile != null) {
            // User already has profile
            return res.status(405).json({
                message:
                    "User " + req.body.username + " already has a profile!",
            });
        }
        const newProfile = new Profile({
            username: req.body.username,
            interviews: [],
        });
        newProfile.save(function (err) {
            if (err) {
                return res.status(400).json({
                    message: err.message,
                });
            }
            return res.status(201).json({
                message: "New profile created!",
                data: newProfile,
            });
        });
    });
};

// DELETE (user profile)
exports.delete = function (req, res) {
    Profile.findOneAndDelete(
        { username: req.params.username },
        function (err, profile) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                });
            }
            if (profile == null) {
                // profile does not exist
                return res.status(404).json({ message: "Cannot find profile!" });
            }
            return res.json({
                message: "Profile of " + req.params.username + " deleted!",
            });
        }
    );
};


// PUT (Create new interview)
exports.newInterview = function (req, res) {
    Profile.findOne({ username: req.params.username }, function (err, profile) {
        if (err) {
            return res.status(400).json({
                message: err.message,
            });
        }
        if (profile == null) {
            // No profile found
            return res.status(404).json({
                message:
                    "User " + req.body.username + " does not have a profile!",
            });
        }

        const newInterview = profile.interviews.create({
            partnerUsername: req.body.partnerUsername,
        });

        const interviews = profile.interviews;
        interviews.push(newInterview);
        profile.save(function (err) {
            if (err) {
                return res.status(400).json({
                    message: err.message,
                });
            }
            return res.status(201).json({
                message: "New interview created!",
                data: newInterview,
            });
        });
    });
};

// DELETE (interview) // for internal use - user should not have to delete their interview history
exports.deleteInterview = function (req, res) {
    Profile.findOne({ username: req.params.username }, function (err, profile) {
        if (err) {
            return res.status(400).json({
                message: err.message,
            });
        }
        if (profile == null) {
            // No profile found
            return res.status(404).json({
                message:
                    "User " + req.body.username + " does not have a profile!",
            });
        }
        let hasFound = false;
        if (req.body._id == null) {
            return res.status(405).json({
                message: "Please send the interview's id as a JSON object!",
            });
        }
        const interviews = profile.interviews;
        for (let i = interviews.length - 1; i >= 0; i--) {
            interview = interviews[i];
            if (interview._id.toString() === req.body._id) {
                interviews.splice(i, 1);
                hasFound = true;
            }
        }
        if (!hasFound) {
            return res.status(404).json({
                message:
                    "User " +
                    req.params.username +
                    " did not have such an interview!",
            });
        } else {
            profile.interviews = interviews;
            profile.save(function (err) {
                if (err) {
                    return res.status(400).json({
                        message: err.message,
                    });
                }
            });
            return res.status(201).json({
                message:
                    "Interview " +
                    req.body._id +
                    " has been successfully deleted!",
            });
        }
    });
};
