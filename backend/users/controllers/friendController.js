const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require("../models/userModel");
const Friend = require("../models/friendModel");

const accessToken = process.env.ACCESS_TOKEN_SECRET || process.env.DEV_ACCESS_TOKEN_SECRET;

// use session JWT token to get userId
function getUserId(header) {
    var userId;
    const token = header && header.split(' ')[1]
    try {
        userId = jwt.verify(token, accessToken).user_id;
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

// GET (Get a friend of a user)
exports.view = function (req, res) {

    const userId = getUserId(req.headers['authorization']);

    Friend.find({ user_id: userId }, (err, friends) => {
        if (err) {
            return res.status(500).json({
                message: err.message,
            });
        }

        var friend = friends.filter((item) => item.friend_username === req.params.friend_username);

        if (friend.length == 0) {
            return res.status(200).json({
                message: "No actual friend present.",
                data: null
            })
        }
        return res.status(200).json({
            message: "Friend retrieved successfully.",
            data: friend
        })
    })
};

// POST (Create new friend for a user with friend_id as param)
exports.new = async (req, res) => {

    const userId = getUserId(req.headers['authorization']);
    const friendId = req.body.friend_id
    const friend = await User.findOne({ _id: friendId });

    if (!friend) {
        return res.status(404).json({
            message: "Friend non existent.",
        });
    }

    const newFriend = new Friend({
        user_id: userId,
        friend_id: friendId,
        friend_username: friend.username
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

// POST (Create new friend for a user with friend username as param)
exports.new_by_username = async (req, res) => {

    const userId = getUserId(req.headers['authorization']);
    const username = req.body.friend_username
    console.log(username)
    const friend = await User.findOne({ username: username });

    if (!friend) {
        return res.status(404).json({
            message: "Friend non existent.",
        });
    }

    const newFriend = new Friend({
        user_id: userId,
        friend_id: friend._id,
        friend_username: friend.username
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