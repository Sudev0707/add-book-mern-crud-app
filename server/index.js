require("dotenv").config(); 

const express = require("express");
const databaseConnection = require("./database");
const bookRouter = require("./routes/book.routes");
const userRouter = require("./routes/user.route")
const cors = require("cors");

// database connection
databaseConnection();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
app.use(express.json()); // tells server that data is in the format of json (To parse JSON body)

// Test route
app.get("/", (req, res) => {
  res.send("Hello world (mern-crud)");
});

// Route to insert a book
app.use("/book", bookRouter);
app.use("/user", userRouter)

app.listen(8000, () => {
  console.log("PORT listening on 8000");
});
