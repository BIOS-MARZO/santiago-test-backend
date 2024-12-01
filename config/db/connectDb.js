require("dotenv").config();

const mongoose = require("mongoose");

const connectMongoDb = async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/todo_list", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a Mongo Db");
  } catch (error) {
    console.error("Error al conectar a mongo: ", error);
    process.exit(1);
  }
};

module.exports = {
  connectMongoDb,
};
