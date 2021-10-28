const express = require("express");
const router = express.Router();
const Question = require("./questionModel");
var fs = require('fs');
var buffer = require('buffer');


// GET (all users)
exports.index = (req, res) => {
    Question.get((err, questions) => {
        if (err) {
            return res.status(500).json({
                message: err.message,
            });
        }
        return res.json({
            message: "Questions retrieved successfully!",
            data: questions,
        });
    });
};

// GET (get 1 question using title)
exports.view = function (req, res) {
    Question.findOne({ title: req.params.title }, function (err, qns) {
        if (err) {
            return res.status(500).json({
                message: err.message,
            });
        }
        if (qns == null) {
            // user does not exist
            return res.status(404).json({ message: "Cannot find question!" });
        }
        return res.json({
            message: "Question: " + req.params.title + " retrieved successfully!",
            data: qns,
        });
    });
};

// POST (Create new question)
exports.new = async function (req, res) {
    Question.findOne({ title: req.body.title }, (err, qns) => {
        if (qns != null) {
            // Already exist user with that username
            return res.status(405).json({
                message:
                    "There already exist a question with the username of " +
                    req.body.title +
                    "!",
            });
        }

        var testcases = req.body.testcases;
        const imagePath = req.body.image;
        var imageData = fs.readFileSync(imagePath, 'base64');
        
        const newQuestion = new Question({
            title: req.body.title,
            description: req.body.description,
            difficulty: req.body.difficulty,
            image: imageData,
            testcases: testcases
        });

        newQuestion.save((err) => {
            if (err) {
                return res.status(400).json({
                    message: err.message,
                });
            }
            return res.status(201).json({
                message: "New question created!",
                data: newQuestion,
            });
        });
    });
};

// PUT (Edit a user's details)
// exports.update = async function (req, res) {
//     let isExist = null;
//     if (req.body.username != null) {
//         try {
//             await User.findOne(
//                 { username: req.body.username },
//                 function (err, user) {
//                     if (user != null) {
//                         isExist = true;
//                     } else {
//                         isExist = false;
//                     }
//                 }
//             ).then();
//         } catch (e) {}
//     }
//     User.findOne({ username: req.params.username }, function (err, user) {
//         if (user == null) {
//             // user does not exist
//             return res.status(404).json({ message: "Cannot find user!" });
//         }
//         if (req.body.username != null) {
//             user.username = req.body.username;
//         }
//         if (req.body.email != null) {
//             // check if email ends with .edu
//             if (!validateEmail(req.body.email)) {
//                 return res.status(405).json({
//                     message: 'Please use an email that starts with ".edu"',
//                 });
//             }
//             user.email = req.body.email;
//         }
//         if (req.body.password != null) {
//             user.password = req.body.password;
//         }
//         if (isExist) {
//             // Already exist user with that username
//             return res.status(405).json({
//                 message:
//                     "There already exist a user with the username of " +
//                     req.body.username +
//                     "!",
//             });
//         }
//         user.save(function (err) {
//             if (err) {
//                 return res.status(400).json({
//                     message: err.message,
//                 });
//             }
//             return res.json({
//                 message:
//                     "User " + req.params.username + " information updated!",
//                 data: user,
//             });
//         });
//     });
// };

// DELETE
exports.delete = (req, res) => {
    console.log(req.params)
    Question.findOneAndDelete(
        { title: req.params.title },
        (err, qns) => {

            if (err) {
                return res.status(500).json({
                    message: err.message,
                });
            }

            if (qns == null) {
                // user does not exist
                return res.status(404).json({ message: "Cannot find question!" });
            }

            return res.json({
                message: "Question " + req.params.title + " deleted!",
            });
        }
    );
};