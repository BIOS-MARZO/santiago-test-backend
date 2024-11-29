const express = require("express");

const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

const router = express.Router();

// Rutas CRUD
router.get("/", getAllTodos); // Obtener todas las tareas
router.get("/:id", getTodoById); // Obtener una tarea por ID
router.post("/", createTodo); // Crear una nueva tarea
router.put("/:id", updateTodo); // Actualizar una tarea
router.delete("/:id", deleteTodo); // Eliminar una tarea

module.exports = router;
