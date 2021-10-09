const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// GET (all users)
exports.index = function (req, res) {
    User.get(function (err, users) {
        if (err) {
            return res.status(500).json({
                message: err.message,
            });
        }
        return res.json({
            message: "Users retrieved successfully!",
            data: users,
        });
    });
};

// GET (get 1 user using username)
exports.view = function (req, res) {
    User.findOne({ username: req.params.username }, function (err, user) {
        if (err) {
            return res.status(500).json({
                message: err.message,
            });
        }
        if (user == null) {
            // user does not exist
            return res.status(404).json({ message: "Cannot find user!" });
        }
        return res.json({
            message: "User " + req.params.username + " retrieved successfully!",
            data: user,
        });
    });
};

// POST (Create new user)
exports.new = function (req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
        if (user != null) {
            // Already exist user with that username
            return res.status(405).json({
                message:
                    "There already exist a user with the username of " +
                    req.body.username +
                    "!",
            });
        }
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        newUser.save(function (err) {
            if (err) {
                return res.status(400).json({
                    message: err.message,
                });
            }
            return res.status(201).json({
                message: "New user created!",
                data: newUser,
            });
        });
    });
};

// PUT (Edit a user's details)
exports.update = async function (req, res) {
    let isExist = null;
    if (req.body.username != null) {
        try {
            await User.findOne(
                { username: req.body.username },
                function (err, user) {
                    if (user != null) {
                        isExist = true;
                    } else {
                        isExist = false;
                    }
                }
            ).then()
        } catch (e) {
            
        }
    }
    User.findOne({ username: req.params.username }, function (err, user) {
        if (user == null) {
            // user does not exist
            return res.status(404).json({ message: "Cannot find user!" });
        }
        if (req.body.username != null) {
            user.username = req.body.username;
        }
        if (req.body.email != null) {
            user.email = req.body.email;
        }
        if (req.body.password != null) {
            user.password = req.body.password;
        }
        if (isExist) {
            // Already exist user with that username
            return res.status(405).json({
                message:
                    "There already exist a user with the username of " +
                    req.body.username +
                    "!",
            });
        }
        user.save(function (err) {
            if (err) {
                return res.status(400).json({
                    message: err.message,
                });
            }
            return res.json({
                message: "User " + req.params.username + " information updated!",
                data: user,
            });
        });
    });
};

// DELETE
exports.delete = function (req, res) {
    User.findOneAndDelete(
        { username: req.params.username },
        function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                });
            }
            if (user == null) {
                // user does not exist
                return res
                    .status(404)
                    .json({ message: "Cannot find user!" });
            }
            return res.json({
                message: "User " + req.params.username + " deleted!",
            });
        }
    );  
};
