const TodoModel = require("../models/todo.model");

exports.createTodo = async (req, res, next) => {
  try {
    const createdTodo = await TodoModel.create(req.body);
    res.status(201).json(createdTodo);
  } catch (err) {
    next(err);
  }
};

exports.getTodos = async (req, res, next) => {
  try {
    const allTodos = await TodoModel.find({});
    res.status(201).json(allTodos);
  } catch (err) {
    next(err);
  }
};
