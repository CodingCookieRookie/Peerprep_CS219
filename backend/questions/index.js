require('dotenv').config();
// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');

// Initialise the app
let app = express();

// use cors
let cors = require('cors');


app.use(express.urlencoded({
  extended: false
}));
app.use(cors());
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

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

const uri = process.env.CLOUD_DATABASE_URL || (process.env.LOCAL_DATABASE_URL || "mongodb://localhost/questions");
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
// db.on("error", console.error.bind(console, "Error connecting to db"));
// db.once("open", console.error.bind(console, "Db connected successfully"));

// Added check for DB connection
if(!db) {
  console.log("Error connecting db")
}
else
  console.log("Db connected successfully")


// Question endpoint status check
app.get("/", (req, res) =>
  res.status(200).json({ message: "Question microservice is running!" })
);


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