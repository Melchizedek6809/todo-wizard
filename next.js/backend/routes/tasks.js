const express = require('express');
const router = express.Router();
const { Task } = require('../models/task'); // Assuming you have a Task model

// Get all tasks
router.get('/tasks', async (req, res) => {
	const tasks = await Task.find();
	res.json(tasks);
});

// Create a new task
router.post('/tasks', async (req, res) => {
	const newTask = new Task({ title: req.body.title });
	await newTask.save();
	res.json(newTask);
});

// Delete a task
router.delete('/tasks/:id', async (req, res) => {
	await Task.findByIdAndDelete(req.params.id);
	res.sendStatus(204);
});

module.exports = router;
