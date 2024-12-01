require("dotenv").config();

const express = require("express");

const todoRoutes = require("./routes/todoRoutes");

const { connectMongoDb } = require("./config/db/connectDb");

const app = express();

const port = 4000;

connectMongoDb();

app.use(express.json());

app.use("/api/todos", todoRoutes);

app.listen(port, (request, response) => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
