const TodoController = require("../../controllers/todo.controller");
const TodoModel = require("../../models/todo.model");

const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");
const allTodos = require("../mock-data/all-todos.json");
// jest.mock("../../models/todo.model"); // mock the entire model below rather than typing all these
TodoModel.create = jest.fn();
TodoModel.find = jest.fn();
TodoModel.findById = jest.fn();
TodoModel.findByIdAndUpdate = jest.fn();
TodoModel.findByIdAndDelete = jest.fn();

// runs before each unit test
let req, res, next; // let so its modified/reset when different test is called
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("TodoController.createTodo", () => {
  // another beforeEach in the individual tests
  beforeEach(() => {
    req.body = newTodo;
  });

  it("should have a createTodo function", () => {
    expect(typeof TodoController.createTodo).toBe("function");
  });

  it("should call TodoModel.create", async () => {
    // this is just to test that the function is being called
    // TodoController.createTodo();
    // expect(TodoModel.create).toBeCalled();
    // req.body = newTodo;
    await TodoController.createTodo(req, res, next);

    expect(TodoModel.create).toBeCalledWith(newTodo);
  });

  it("should return 201 response code", async () => {
    // req.body = newTodo;
    await TodoController.createTodo(req, res, next);

    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy(); // test if sending back something
  });

  it("should return json body in response", async () => {
    TodoModel.create.mockReturnValue(newTodo);
    await TodoController.createTodo(req, res, next);

    expect(res._getJSONData()).toStrictEqual(newTodo);
  });

  // test if error handling is working
  it("should handle errors", async () => {
    const errMessage = { message: "Done property missing" };
    const rejectedPromise = Promise.reject(errMessage);
    TodoModel.create.mockReturnValue(rejectedPromise);
    await TodoController.createTodo(req, res, next);

    expect(next).toBeCalledWith(errMessage);
  });
});

describe("TodoController.getTodos", () => {
  it("should have a getTodos function", () => {
    expect(typeof TodoController.getTodos).toBe("function");
  });

  it("should call TodoModel.find({})", async () => {
    await TodoController.getTodos(req, res, next);

    expect(TodoModel.find).toHaveBeenCalledWith({});
  });

  it("should return 201 response code and all todos", async () => {
    TodoModel.find.mockReturnValue(allTodos);
    await TodoController.getTodos(req, res, next);

    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
    expect(res._getJSONData()).toStrictEqual(allTodos);
  });

  it("should handle errors in getTodos", async () => {
    const errMessage = { message: "error finding todos" };
    const rejectedPromise = Promise.reject(errMessage);
    TodoModel.find.mockReturnValue(rejectedPromise);
    await TodoController.getTodos(req, res, next);

    expect(next).toHaveBeenCalledWith(errMessage);
  });
});

describe("TodoController.getTodoById", () => {
  it("should have a getTodoById function", () => {
    expect(typeof TodoController.getTodoById).toBe("function");
  });

  it("should call TodoModel.findById with route parameters", async () => {
    req.params.id = "63341570670c0efa2dbdb135";
    await TodoController.getTodoById(req, res, next);

    expect(TodoModel.findById).toBeCalledWith("63341570670c0efa2dbdb135");
  });

  it("should return json body and response code 201", async () => {
    TodoModel.findById.mockReturnValue(newTodo);
    await TodoController.getTodoById(req, res, next);

    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toStrictEqual(newTodo);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle errors in getTodoById", async () => {
    const errMessage = { message: "error finding todo by id" };
    const rejectedPromise = Promise.reject(errMessage);
    TodoModel.findById.mockReturnValue(rejectedPromise);
    await TodoController.getTodoById(req, res, next);

    expect(next).toHaveBeenCalledWith(errMessage);
  });

  it("should return 404 when item doesnt exist", async () => {
    TodoModel.findById.mockReturnValue(null);
    await TodoController.getTodoById(req, res, next);

    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe("TodoController.updateTodo", () => {
  it("should have an updateTodo function", () => {
    expect(typeof TodoController.updateTodo).toBe("function");
  });

  it("should update with TodoModel.findByIdAndUpdate", async () => {
    req.params.id = "63341570670c0efa2dbdb135"; // can make this a const
    req.body = newTodo;
    await TodoController.updateTodo(req, res, next);

    expect(TodoModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "63341570670c0efa2dbdb135",
      newTodo,
      {
        new: true,
        useFindAndModify: false,
      }
    );
  });

  it("should return a response with json data and http code 201", async () => {
    req.params.id = "63341570670c0efa2dbdb135";
    req.body = newTodo;
    TodoModel.findByIdAndUpdate.mockReturnValue(newTodo);
    await TodoController.updateTodo(req, res, next);

    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });

  it("should handle errors in updateTodo", async () => {
    const errMessage = { message: "error updating todo by id" };
    const rejectedPromise = Promise.reject(errMessage);
    TodoModel.findByIdAndUpdate.mockReturnValue(rejectedPromise);
    await TodoController.updateTodo(req, res, next);

    expect(next).toHaveBeenCalledWith(errMessage);
  });

  it("should return 404 when item doesnt exist", async () => {
    TodoModel.findByIdAndUpdate.mockReturnValue(null);
    await TodoController.updateTodo(req, res, next);

    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});

describe("TodoController.delete", () => {
  it("should have deleteTodo function", () => {
    expect(typeof TodoController.deleteTodo).toBe("function");
  });

  it("should call TodoModel.findByIdAndDelete", async () => {
    req.params.id = "63346f7e6d4419346083d19a";
    await TodoController.deleteTodo(req, res, next);

    expect(TodoModel.findByIdAndDelete).toHaveBeenCalledWith(
      "63346f7e6d4419346083d19a"
    );
  });

  it("should respond with 200 OK and the deleted todo", async () => {
    TodoModel.findByIdAndDelete.mockReturnValue(newTodo);
    await TodoController.deleteTodo(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newTodo);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle errors in deleteTodo", async () => {
    const errMessage = { message: "error deleting todo by id" };
    const rejectedPromise = Promise.reject(errMessage);
    TodoModel.findByIdAndDelete.mockReturnValue(rejectedPromise);
    await TodoController.deleteTodo(req, res, next);

    expect(next).toHaveBeenCalledWith(errMessage);
  });

  it("should return 404 when item doesnt exist", async () => {
    TodoModel.findByIdAndDelete.mockReturnValue(null);
    await TodoController.deleteTodo(req, res, next);

    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });
});
