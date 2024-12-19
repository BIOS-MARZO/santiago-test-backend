const express = require("express");
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  updateTaskStatus,
} = require("../controllers/todoController");
const { authenticatorToken } = require("../middleware/authenticator"); // Aquí importas el middleware

const router = express.Router();

// Protege las rutas con el middleware de autenticación
router.get("/", authenticatorToken, getAllTodos); // Ruta protegida para obtener todas las tareas
router.get("/:id", authenticatorToken, getTodoById); // Ruta protegida para obtener tarea por ID
router.post("/", authenticatorToken, createTodo); // Ruta protegida para crear una nueva tarea
router.put("/:id", authenticatorToken, updateTodo); // Ruta protegida para actualizar tarea
router.delete("/:id", authenticatorToken, deleteTodo); // Ruta protegida para eliminar tarea
router.put("/:id", authenticatorToken, updateTaskStatus);
module.exports = router;
