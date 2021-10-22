require("dotenv").config();
const mongoose = require("mongoose");
const Editor = require("./models/editorModel");

const uri = process.env.CLOUD_DATABASE_URL || process.env.LOCAL_DATABASE_URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const io = require("socket.io")(4001, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

// socket to communicate with client
io.on("connection", (socket) => {
    socket.on("get-editor", async (interviewId) => {
        const editor = await findOrCreateEditor(interviewId);
        socket.join(interviewId);
        socket.emit("load-editor", editor.data);

        socket.on("send-changes", (delta) => {
            socket.broadcast.to(interviewId).emit("receive-changes", delta);
        });
      
        socket.on("save-editor", async data => {
          await Editor.findByIdAndUpdate(interviewId, { data })
        })
    });
});

// creates a new editor if editor does not exist else fetches back the same editor
async function findOrCreateEditor(id) {
    if (id == null) return;

    const editor = await Editor.findById(id);
    if (editor) {
        return editor;
    } else {
        return await Editor.create({ _id: id, data: "" });
    }
}
