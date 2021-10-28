const express = require("express");
const router = express.Router();
const Question = require("./questionModel");
var fs = require('fs');
var buffer = require('buffer');

// count of each question type - update when question is added or removed
const count = 3;


// GET (all questions)
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
exports.view = (req, res) => {
    Question.findOne({ title: req.params.title }, (err, qns) => {
        if (err) {
            return res.status(500).json({
                message: err.message,
            });
        }
        if (qns == null) {
            // Question does not exist
            return res.status(404).json({ message: "Cannot find question!" });
        }
        return res.json({
            message: "Question: " + req.params.title + " retrieved successfully!",
            data: qns,
        });
    });
}; 

// GET (get 1 question using difficulty)
exports.level = (req, res) => {

    const rand = Math.floor(Math.random() * count)
    console.log(req.params.level)
    Question
        .find({ difficulty: new RegExp(`^${req.params.level}$`, 'i') })
        .skip(rand)
        .exec((err, qns) => {
            if (err) {
                return res.status(500).json({
                    message: err.message,
                });
            }
            if (qns == null || !qns.length) {
                // Question can't be fetched
                return res.status(404).json({ message: "Cannot find any question!" });
            }
            return res.json({
                message: "Random question: " + qns[0].title + " retrieved successfully!",
                data: qns,
            });
        });
};

// POST (Create new question)
exports.new = async function (req, res) {
    Question.findOne({ title: req.body.title }, (err, qns) => {
        if (qns != null) {
            // Already exist question with that title
            return res.status(405).json({
                message:
                    "There already exist a question with the title of " +
                    req.body.title +
                    "!",
            });
        }

        const imagePath = req.body.image;
        var imageData = imagePath === "" ? "" : fs.readFileSync(imagePath, 'base64');
        
        const newQuestion = new Question({
            title: req.body.title,
            description: req.body.description,
            difficulty: req.body.difficulty,
            image: imageData,
            testcases: req.body.testcases
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
                // question does not exist
                return res.status(404).json({ message: "Cannot find question!" });
            }

            return res.json({
                message: "Question " + req.params.title + " deleted!",
            });
        }
    );
};