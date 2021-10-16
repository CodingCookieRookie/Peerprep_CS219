const mongoose = require("mongoose");

// represents each interview a user has been through
const interviewSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    partnerUsername: {
        type: String,
        required: true,
    },
});

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    interviews: [interviewSchema],
});

var Profile = (module.exports = mongoose.model("Profile", profileSchema));
module.exports.get = function (callback, limit) {
    Profile.find(callback).limit(limit);
};