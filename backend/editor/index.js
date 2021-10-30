require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
const port = process.env.PORT || 5003
const http = require('http').createServer(app);


const mongoose = require("mongoose");
const Editor = require("./models/editorModel");

const uri = process.env.CLOUD_DATABASE_URL || (process.env.LOCAL_DATABASE_URL || 'http://localhost:5003');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const io = require("socket.io")(http, {
    cors: {
        origin: "*",
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

app.get('/', (req, res) => {
    res.status(200).json({status: 'ok', data: 'Editor Microservice is running.'})
})
  
app.get('/api/editor/', (req, res) => 
    res.status(200).json({status: 'ok', data: 'Editor microservice is working!'})
);

http.listen(port, () => {
    console.log(`Editor ms listening to port ${port}`);
})