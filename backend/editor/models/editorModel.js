const mongoose = require("mongoose");

const editorSchema = new mongoose.Schema({
    _id: {
        type: String
    },
    data: {
        type: Object
    },
});

var Editor = (module.exports = mongoose.model("Editor", editorSchema));
module.exports.get = function (callback, limit) {
    Editor.find(callback).limit(limit);
};
