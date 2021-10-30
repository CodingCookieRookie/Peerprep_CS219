const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    image: {
        type: String
    }, 
    testcases: {
        type: [{
            input: String,
            output: String
        }],
        required: true
    }
})

var Question = module.exports = mongoose.model('Question', questionSchema)

module.exports.get = function (callback, limit) {
    Question.find(callback).limit(limit);
};
