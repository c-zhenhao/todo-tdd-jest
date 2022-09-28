const request = require("supertest");

const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endpointUrl = "/todos";
let firstTodo; // variable to store the first todo from the database

describe(endpointUrl, () => {
  it("POST " + endpointUrl, async () => {
    const response = await request(app).post(endpointUrl).send(newTodo);

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
  });

  it(
    "should return error 500 on malformed data with POST" + endpointUrl,
    async () => {
      const response = await request(app)
        .post(endpointUrl)
        .send({ title: "missing done property" });

      expect(response.statusCode).toBe(500);
      expect(response.body).toStrictEqual({
        message: "todos validation failed: done: Path `done` is required.",
      });
    }
  );

  test("GET " + endpointUrl, async () => {
    const response = await request(app).get(endpointUrl);

    expect(response.statusCode).toBe(201);
    // expect(typeof response.body).toBe("array"); // doesnt work because of JS lol
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0].title).toBeDefined();
    expect(response.body[0].done).toBeDefined();

    firstTodo = response.body[0]; // store the first todo from the database
    // console.log(firstTodo);
  });

  test("GET by Id " + endpointUrl + "/:id", async () => {
    const response = await request(app).get(endpointUrl + "/" + firstTodo._id);
    // console.log(response.body);

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBeDefined();
    expect(response.body.title).toBe(firstTodo.title);
    expect(response.body.done).toBeDefined();
    expect(response.body.done).toBe(firstTodo.done);
  });

  test("getTodoById doesnt exist" + endpointUrl + "/:id", async () => {
    const response = await request(app).get(
      endpointUrl + "/" + "5f0d6e3d1c9d440000c0f5a1"
    );

    expect(response.statusCode).toBe(404);
  });
});
