// Test
const io = require("socket.io-client");
const url = 'https://match-6i7ougacoq-de.a.run.app' || "http://localhost:5004";
const local = "http://localhost:5004";
const socket = io(local);

console.log("Start test.js ")
socket.emit("send-username", "testUsername");

socket.on("receive-username", (msg) => {
    console.log(`Received msg ${msg}`);
})
