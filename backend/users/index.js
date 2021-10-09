require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const dbUsername = process.env.DBUSERNAME;
const dbPassword = process.env.DBPASSWORD;
if (!dbUsername || !dbPassword) {
  console.error(
    "Please specify the database username and password as environment variables!"
  );
  process.exit(1);
}

const uri = `mongodb+srv://team23:${dbPassword}@team23.77voc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to db"));
db.once("open", console.error.bind(console, "Db connected successfully"));

const userRouter = require("./userRoutes");
const userController = require("./controllers/userController");

app.get("/user", (req, res) =>
  res.status(200).json({ message: "User microservice is working!" })
);
app.use("/", userRouter);

const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`Server listening at http://localhost:${port}`)
);