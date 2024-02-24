const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");

const app = express();
dotenv.config();

const PORT = 4000;

app.use(cors());
app.use(express.json());

const { entryRoutes } = require("./routes");

app.use("/entry", entryRoutes);

app.use("/", (req, res, next) => {
  res.send("<h1>welcome to careNow assignment project</h1>");
});

app.listen(PORT, () => {
  console.log("Listening in Port: ", PORT);
});
