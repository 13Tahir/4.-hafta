const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Task = require('./models/Task');

dotenv.config();

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// GET all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks.map(t => ({ ...t._doc, id: t._id })));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new task
app.post('/api/tasks', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        dueDate: req.body.dueDate,
        status: req.body.status || 'Bekliyor'
    });

    try {
        const newTask = await task.save();
        res.status(201).json({ ...newTask._doc, id: newTask._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT (update) task status or assignee
app.put('/api/tasks/:id', async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status,
                assignee: req.body.assignee
            },
            { new: true }
        );
        res.json({ ...updatedTask._doc, id: updatedTask._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server http://localhost:${PORT} adresinde çalışıyor`);
});
