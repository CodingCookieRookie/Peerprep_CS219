const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    friend_id: {
        type: String,
        required: true
    },
}).index({ user_id: 1, friend_id: 1 }, { unique: true }) // enforce unique contraint on user_id, friend_id

var Friend = module.exports = mongoose.model('Friend', friendSchema)

module.exports.get = function (callback, limit) {
    Friend.find(callback).limit(limit);
};
