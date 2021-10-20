const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require("../models/userModel");
const Friend = require("../models/friendModel");

// use session JWT token to get userId
function getUserId(header) {
    var userId;
    const token = header && header.split(' ')[1]
    try {
        userId = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET).user_id;
    } catch (err) {
        throw Error(err);
    }
    return userId;
}

// GET (Get all friends of a user)
exports.index = function (req, res) {

    const userId = getUserId(req.headers['authorization']);

    Friend.find({ user_id: userId }, (err, friends) => {
        if (err) {
            return res.status(500).json({
                message: err.message,
            });
        }

        return res.json({
            message: "Friends retrieved successfully!",
            data: friends
        })
    })
};

// POST (Create new friend for a user)
exports.new = async (req, res) => {

    const userId = getUserId(req.headers['authorization']);
    const friendId = req.body.friendId
    const friend = await User.findOne({ _id: friendId });

    if (!friend) {
        return res.status(404).json({
            message: "Friend non existent.",
        });
    }

    const newFriend = new Friend({
        user_id: userId,
        friend_id: friendId
    })

    newFriend.save((err) => {
        if (err) {
            return res.status(400).json({
                message: err.message,
            });
        }
        return res.status(201).json({
            message: "New friend formed!",
            data: newFriend,
        });
    })
};

// DELETE (Remove a friend from a user)
exports.delete = async (req, res) => {

    const userId = getUserId(req.headers['authorization']);
    const friendId = req.body.friendId

    Friend.findOneAndDelete(
        { user_id: userId, friend_id: friendId },
        function (err, entry) {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                });
            }

            // entry does not exist
            if (entry == null) { 
                return res.status(404).json({ message: "Absent friend entry." });
            }

            return res.json({
                message: "Friend from " + userId + " deleted!",
            });
        }
    );
};