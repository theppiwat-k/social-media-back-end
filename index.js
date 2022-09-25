const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { unless } = require("express-unless");

const dbConfig = require("./config/db.config");
const auth = require("./middlewares/auth.js");
const errors = require("./middlewares/errors.js");

const app = express();
const bodyParser = require("body-parser");

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database connected");
    },
    (error) => {
      console.log("Database can't be connected: " + error);
    }
  );

app.use(cors());
app.use(bodyParser.json());

auth.authenticateToken.unless = unless;
app.use(
  auth.authenticateToken.unless({
    path: [
      { url: "/users/login", methods: ["POST"] },
      { url: "/users/register", methods: ["POST"] },
    ],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// initialize routes
app.use("/users", require("./routes/users.routes"));
app.post("/post", function (req, res) {
  let body = req.body;
  console.log(body);
  res.send(body);
});

// middleware for error responses
app.use(errors.errorHandler);

// listen for requests
app.listen(process.env.port || 4000, function () {
  console.log("Ready to Go!");
});
