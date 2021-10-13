require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const io = require("socket.io")(port, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
})


app.get('/chat/check', (req, res) => 
  res.status(200).json({message: 'ok', data: 'Chat microservice is working!'}));

io.on('connection', socket => {
  console.log("A user connected");

  socket.on("join-session", sessionId => {
    socket.join(sessionId);
    socket.emit('new-message', {
      sessionId: sessionId,
      message: `You have joined ${sessionId}`
      });
    });
    socket.on("send-changes", delta => {
      socket.broadcast.to(sessionId).emit("receive-changes", delta)
    })
  
});

const port = process.env.PORT || 5002

http.listen(port, () => {
  console.log(`Message ms listening on port ${port}...`);
});
