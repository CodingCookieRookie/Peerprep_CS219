require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
let bodyParser = require('body-parser')
// use cors
let cors = require('cors');


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json())

/*
const dbUsername = process.env.DBUSERNAME;
const dbPassword = process.env.DBPASSWORD;

if (!dbUsername || !dbPassword) {
  console.error(
    "Please specify the database username and password as environment variables!"
  );
  process.exit(1);
}
*/

const uri = process.env.CLOUD_DATABASE_URL || (process.env.LOCAL_DATABASE_URL || "http://localhost:5005");
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to db"));
db.once("open", console.error.bind(console, "Db connected successfully"));


// Question API status check
app.get("/api", (req, res) =>
  res.status(200).json({ message: "Question microservice is working!" })
);

// Question API 
const questionRouter = require("./questionRoutes");
app.use("/api", questionRouter);

const port = process.env.PORT || 5005;

app.listen(port, () =>
  console.log(`Server listening to port ${port}`)
);

module.exports = app;