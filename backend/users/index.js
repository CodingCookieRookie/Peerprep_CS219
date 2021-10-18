require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const jwt = require('jsonwebtoken')
let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json())

const dbUsername = process.env.DBUSERNAME;
const dbPassword = process.env.DBPASSWORD;

if (!dbUsername || !dbPassword) {
  console.error(
    "Please specify the database username and password as environment variables!"
  );
  process.exit(1);
}

const uri = process.env.LOCAL_DATABASE_URL || process.env.CLOUD_DATABASE_URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to db"));
db.once("open", console.error.bind(console, "Db connected successfully"));

// User microservice API status check
app.get("/api/user", (req, res) =>
  res.status(200).json({ message: "User microservice is working!" })
);

// Auth API
const authRouter = require("./routes/authRoutes");
app.use("/api", authRouter);

// Define verification mechanism for all non-auth endpoints
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: "Token is required for authentication."});
  }
  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
      return res.status(401).json({ message: "Invalid/Expired token."});
  }
  return next();
};

// User API 
const userRouter = require("./routes/userRoutes");
app.use("/api", verifyToken, userRouter);

// Profile API
const profileRouter = require("./routes/profileRoutes");
app.use("/api", verifyToken, profileRouter);

const port = process.env.PORT || 5001;

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);