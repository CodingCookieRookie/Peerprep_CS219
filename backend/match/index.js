require('dotenv').config();
// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');

let cors = require('cors');

// Initialise the app
let app = express();

// Import routes
let apiRoutes = require("./api-routes");

const dbUsername = process.env.DBUSERNAME;
const dbPassword = process.env.DBPASSWORD;

// Configure bodyparser to handle post requests
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Connect to Mongoose and set connection variable
const uri = `mongodb+srv://${dbUsername}:${dbPassword}@team23.77voc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection

// Added check for DB connection
if(!db) {
    console.log("Error connecting db")
}
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 5003;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello welcome to peerprep!'));

// Use Api routes in the App
app.use('/api', apiRoutes);
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running Peerprep on port " + port);
});

module.exports = app;