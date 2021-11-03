const mongoose = require('mongoose')

const matchSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    xp: {
        type: Number,
        required: true
    },
    match: {    //Name of match
        type: String,
        required: false
    }, 
    isOnline: {
        type: Boolean,
        required: true
    },
    questionTitle: {   // If offline, questionDifficulty = false
        type: String,
        required: false
    },
    questionDifficulty: {
        type: String,
        required: false
    }
})

var Match = module.exports = mongoose.model('Match', matchSchema)
module.exports.get = function (callback, limit) {
    Match.find(callback).limit(limit);
};
