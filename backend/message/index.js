require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5002
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  },
  path: '/chat/new',
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/chat/check', (req, res) => 
  res.status(200).json({message: 'ok', data: 'Chat microservice is working!'}));

io.on('connection', socket => {
  console.log(`Server side socket id = ${socket.id}`);
  socket.on('new-message', msg => {
    console.log(`New Message received ${msg.newMsg.text}`);
    io.emit(msg.interviewId, msg.newMsg);
  })
})

http.listen(port, () => {
  console.log(`Message ms listening to port ${port}`);
})