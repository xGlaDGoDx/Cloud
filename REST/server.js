/**
 * Created by anatoly on 28.03.2025
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());

const dataFilePath = path.join(__dirname, 'todos.json');

const readData = () => {
    if (!fs.existsSync(dataFilePath)) return [];
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

app.get('/api/todos', (req, res) => {
    const todos = readData();
    res.json(todos);
});

app.get('/api/todos/:id', (req, res) => {
    const todos = readData();
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
});

app.post('/api/todos', (req, res) => {
    const todos = readData();
    const newTodo = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        title: req.body.title,
        isCompleted: req.body.isCompleted || false
    };
    todos.push(newTodo);
    writeData(todos);
    res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
    const todos = readData();
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Todo not found' });

    todos[index].title = req.body.title;
    todos[index].isCompleted = req.body.isCompleted;
    writeData(todos);
    res.json(todos[index]);
});

app.delete('/api/todos/:id', (req, res) => {
    const todos = readData();
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Todo not found' });

    const removedTodo = todos.splice(index, 1);
    writeData(todos);
    res.json(removedTodo);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
