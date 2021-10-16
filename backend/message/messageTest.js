// Test
const io = require("socket.io-client");
const url = process.env.URL || "http://localhost:5002";
const socket = io.connect(url);

console.log("Start test.js ")
socket.emit("new-message", { 
    sessionId: "xd_ac1",
    message: "Hello World"
});