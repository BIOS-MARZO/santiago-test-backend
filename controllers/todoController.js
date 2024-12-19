const Todo = require("../models/todoModel");

const getAllTodos = async (req, res) => {
  try {
    const creatorId = req.user.user;
    console.log("Token recibido:", creatorId);

    if (!creatorId) {
      return res.status(400).json({
        status: "error",
        message: "ID de creador no encontrado",
      });
    }

    const tasks = await Todo.find({ creator: creatorId });

    if (tasks.length === 0) {
      return res.status(404).json({
        status: "ok",
        message: "No hay tareas para este usuario.",
        data: [],
      });
    }

    res.json({
      status: "ok",
      data: tasks,
    });
    console.log("Tareas encontradas:", tasks);
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
  const { title, description, status } = request.body;
  try {
    const creatorId = request.user.user; // Asegúrate de que esto esté correcto
    console.log("Creator ID:", creatorId); // Verifica que el ID del creador esté presente

    if (!creatorId) {
      return response.status(400).json({
        status: "error",
        message: "ID del creador no encontrado",
      });
    }

    const newTask = new Todo({
      title,
      description,
      status,
      creator: creatorId,
    });

    await newTask.save();

    response.status(201).json({
      status: "Ok",
      message: "Tarea creada correctamente",
      data: newTask,
    });
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    response.status(500).json({
      status: "error",
      message: "Error al crear la tarea",
    });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params; // ID de la tarea que se pasa por la URL
  const { title, description, status } = req.body;

  try {
    // Creamos un objeto vacío para almacenar los cambios
    const updateFields = {};

    // Añadimos al objeto de actualización solo los campos que han sido proporcionados
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (status !== undefined) updateFields.status = status; // Asegurarse de que sea `undefined` en vez de `null`

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

    res.status(200).json({
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
    const deletedTask = await Todo.findByIdAndDelete(id);

    if (!deletedTask) {
      return response.status(404).json({
        status: "error",
        message: "Task no encontrada para eliminar",
      });
    }

    return response.status(200).json({
      status: "OK",
      message: "Tarea Eliminada Satisfactoriamente",
    });
  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    return response.status(500).json({
      status: "error",
      message: "Error al eliminar la tarea",
      error: error.message,
    });
  }
};

const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ["pendientes", "en proceso", "completadas"];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      status: "error",
      message: `El estado proporcionado no es válido. Los estados válidos son: ${validStatuses.join(
        ", "
      )}.`,
    });
  }

  try {
    const updatedTask = await Todo.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        status: "error",
        message: "La tarea no existe.",
      });
    }

    res.status(200).json({
      status: "OK",
      message: "Estado de la tarea actualizado correctamente",
      data: updatedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Error al actualizar el estado de la tarea.",
    });
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  updateTaskStatus,
};
