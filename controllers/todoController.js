const Todo = require("../models/todoModel");

const getAllTodos = async (req, res) => {
  try {
    const tasks = await Todo.find(); // Consulta todas las tareas
    res.json({
      status: "ok",
      data: tasks,
    });
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    res.status(500).json({
      status: "error",
      message: "Error al obtener las tareas",
    });
  }
};

const getTodoById = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Todo.findById(id); // Busca la tarea por ID

    if (!task) {
      return res.status(404).json({
        status: "error",
        message: "La tarea no existe",
      });
    }

    res.json({
      status: "OK",
      data: task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Error al Obtener la Tarea",
    });
  }
};
const createTodo = async (request, response) => {
  const { title, description, is_completed } = request.body;
  try {
    const newTask = new Todo({
      title,
      description,
      is_completed,
    });

    await newTask.save();
    response.status(201).json({
      status: "Ok",
      message: "Task creada correctamente",
      data: newTask,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({
      status: "error",
      message: "Error al crear la tarea",
    });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params; // ID de la tarea que se pasa por la URL
  const { title, description, is_completed } = req.body; // Campos a actualizar (pueden ser sólo algunos)

  try {
    // Creamos un objeto vacío para almacenar los cambios
    const updateFields = {};

    // Añadimos al objeto de actualización solo los campos que han sido proporcionados
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (is_completed !== undefined) updateFields.is_completed = is_completed; // Asegurarse de que sea `undefined` en vez de `null`

    // Si no se pasan campos para actualizar, enviamos un error
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        status: "error",
        message: "No se enviaron datos para actualizar",
      });
    }

    // Usamos findByIdAndUpdate para actualizar solo los campos especificados
    const updatedTask = await Todo.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({
        status: "error",
        message: "La tarea no existe",
      });
    }

    res.json({
      status: "OK",
      message: "Tarea actualizada correctamente",
      data: updatedTask,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Error al actualizar la tarea",
    });
  }
};

const deleteTodo = async (request, response) => {
  const { id } = request.params;

  try {
    const deletedTask = await Todo.findByIdAndDelete(id); // Busca y elimina la tarea por su ID

    if (!deletedTask) {
      return response.status(404).json({
        status: "error",
        message: "Task no encontrada para eliminar",
      });
    }

    response.status(200).json({
      status: "OK",
      message: "Tarea Eliminada Satisfactoriamente",
      data: deletedTask, // Aquí debes usar deletedTask
    });
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    response.status(500).json({
      status: "error",
      message: "Error al eliminar la tarea",
    });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
