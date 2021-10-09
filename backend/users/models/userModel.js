const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    }
})
var User = module.exports = mongoose.model('User', userSchema)
module.exports.get = function (callback, limit) {
    User.find(callback).limit(limit);
};
