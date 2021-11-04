require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// use cors
let cors = require('cors');

let bodyParser = require('body-parser')
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json())

const dbUsername = process.env.DBUSERNAME;
const dbPassword = process.env.DBPASSWORD;
/*
if (!dbUsername || !dbPassword) {
    console.error(
        "Please specify the database username and password as environment variables!"
    );
    process.exit(1);
}
*/

const uri = process.env.CLOUD_DATABASE_URL || (process.env.LOCAL_DATABASE_URL || "http://localhost:5001");
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to db"));
db.once("open", console.error.bind(console, "Db connected successfully"));

// User microservice API status check
app.get("/api/user", (req, res) =>
    res.status(200).json({ message: "User microservice is working!" })
);

// User Microservice API status check at root level
app.get("/", (req, res) => 
  res.status(200).json({ status: "ok", message: "User microservice is working!"})
)

// Auth API
const authRouter = require("./routes/authRoutes");
app.use("/api", authRouter);

// Define verification mechanism for all non-auth endpoints
let verifyToken = require('./util/auth').verifyToken

// User API 
const userRouter = require("./routes/userRoutes");
app.use("/api/", verifyToken, userRouter);

// Profile API
const profileRouter = require("./routes/profileRoutes");
app.use("/api/", verifyToken, profileRouter);

// Friend API
const friendRouter = require("./routes/friendRoutes");
app.use("/api/user-friend", verifyToken, friendRouter);

const port = process.env.PORT || 5001;

app.listen(port, () =>
  console.log(`Server listening to port ${port} at ${uri}`)
);

module.exports = app;
