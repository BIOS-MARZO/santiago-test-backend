const Todo = require("../models/todoModel");
const todos = [];

const getAllTodos = (req, res) => {
  res.json(todos);
};

const getTodoById = (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((todo) => todo.id === parseInt(id));
  const task = {
    ...todos[index],
  };
  res.json(task);
};

const createTodo = (request, response) => {
  const newTask = {
    id: Date.now(),
    ...request.body,
  };
  response.json(newTask);
  todos.push(newTask);
};

const updateTodo = (request, response) => {
  const { todoId } = request.params;
  const index = todos.findIndex((todo) => todo.id === parseInt(todoId));

  if (index !== -1) {
    todos[index] = {
      ...todos[index],
      ...request.body,
    };
  } else {
    response.status(404).send("No encuntramos ninguna tarea con ese ID");
  }

  response.json(todos[index]);
};

const deleteTodo = (request, response) => {
  const { id } = request.params;
  todos = todos.filter((todo) => todo.id !== parseInt(id));
  response.status(204).send();
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
