const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Todo = require('../models/todoSchema')
require('dotenv').config()

describe('Todo API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_CLIENT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  it('should create a new todo', async () => {
    const response = await request(app)
      .post('/todos')
      .send({ title: 'Task 1', description: 'Description 1' });

    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe('/');
  });

  it('should retrieve all todos with pagination', async () => {
    const response = await request(app).get('/todos');

    expect(response.statusCode).toBe(200);
  });

  it('should update a todo', async () => {
    const todo = await Todo.create({ title: 'Task', description: 'Description' });

    const response = await request(app)
      .put(`/todos/${todo._id}`)
      .send({ title: 'Updated Task', description: 'Updated Description' });

    expect(response.statusCode).toBe(302);
  });

  it('should batch insert todos', async () => {
    const newTodos = [
      { title: 'Task 1', description: 'Description 1' },
      { title: 'Task 2', description: 'Description 2' },
      { title: 'Task 3', description: 'Description 3' },
    ];
  
    const response = await request(app)
      .post('/todos/batch')
      .send({ todos: newTodos });
  
    expect(response.statusCode).toBe(201);
    expect(response.body.length).toBe(3);
  });

  it('should delete a todo', async () => {
    const todo = await Todo.create({ title: 'Task5', description: 'Description' });

    const response = await request(app).delete(`/todos/${todo._id}`);

    expect(response.statusCode).toBe(204);
    expect(await Todo.findById(todo._id)).toBeNull();
  });
});
