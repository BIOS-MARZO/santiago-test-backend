const express = require("express");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

const port = 4000;

app.use(express.json());

app.use("/api/todos", todoRoutes);

app.listen(port, (request, response) => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
