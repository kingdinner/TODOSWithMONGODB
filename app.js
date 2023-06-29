const express = require('express');
const Todo = require('./models/todoSchema');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));
// Create a new todo

app.post('/todos', async (req, res) => {
  try {
    const { title, description } = req.body;
    await Todo.create({ title, description });
    res.redirect('/');
  } catch (error) { 
    console.log(error)
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// Batch insert todos
app.post('/todos/batch', async (req, res) => {
  try {
    const { todos } = req.body;
    const insertedTodos = await Todo.insertMany(todos);
    res.status(201).json(insertedTodos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to batch insert todos' });
  }
});

app.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.render('index', { todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve todos' });
  }
});

// Retrieve all todos with pagination
app.get('/todos', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const todos = await Todo.find({})
      .skip(skip)
      .limit(parseInt(limit, 10))
      .exec();

    res.render('index', { todos });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve todos' });
  }
});

// Update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndUpdate({_id: id}, { $set: { title: req.body.title, description: req.body.description } }, { new: true, "upsert": true  });
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
