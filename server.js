const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const recipes = require("./routes/api/recipes");

const app = express();

// DB config
const db = require("./config/keys").mongoURI;
//connect to mongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("hello world");
});

// user routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/recipes", recipes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
