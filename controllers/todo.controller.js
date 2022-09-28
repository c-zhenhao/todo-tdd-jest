const TodoModel = require("../models/todo.model");

exports.createTodo = (req, res, next) => {
  // TodoModel.create(req.body);
  const createdModel = TodoModel.create(req.body);

  res.status(201).json(createdModel);
};
