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

exports.getTodoById = async (req, res, next) => {
  try {
    const todo = await TodoModel.findById(req.params.id);
    if (todo) {
      res.status(201).json(todo);
    } else {
      res.status(404).json({ message: "todo not found" });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, useFindAndModify: false }
    );

    if (updatedTodo) {
      res.status(201).json(updatedTodo);
    } else {
      res.status(404).json({ message: "failed to update todo" });
    }
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(req.params.id);

    if (deletedTodo) {
      res.status(200).json(deletedTodo);
    } else {
      res.status(404).json({ message: "failed to delete todo" });
    }
  } catch (err) {
    next(err);
  }
};
