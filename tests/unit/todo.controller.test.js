const TodoController = require("../../controllers/todo.controller");
const TodoModel = require("../../models/todo.model");
const httpMocks = require("node-mocks-http");

const newTodo = require("../mock-data/new-todo.json");

TodoModel.create = jest.fn();

// runs before each unit test
let req, res, next; // let so its modified/reset when different test is called
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe("TodoController.createTodo", () => {
  // another beforeEach in the individual tests
  beforeEach(() => {
    req.body = newTodo;
  });

  it("should have a createTodo function", () => {
    expect(typeof TodoController.createTodo).toBe("function");
  });

  it("should call TodoModel.create", () => {
    // this is just to test that the function is being called
    // TodoController.createTodo();
    // expect(TodoModel.create).toBeCalled();
    // req.body = newTodo;
    TodoController.createTodo(req, res, next);
    expect(TodoModel.create).toBeCalledWith(newTodo);
  });

  it("should return 201 response code", () => {
    // req.body = newTodo;
    TodoController.createTodo(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy(); // test if sending back something
  });

  it("should return json body in response", () => {
    TodoModel.create.mockReturnValue(newTodo);
    TodoController.createTodo(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newTodo);
  });
});
