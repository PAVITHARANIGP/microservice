const Task = require('../models/taskModel');

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;

  try {
    const newTask = new Task({
      title,
      description,
      userId
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  const userId = req.user.id;

  try {
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, completed } = req.body;
  const userId = req.user.id;

  try {
    const task = await Task.findOneAndUpdate(
      { taskId, userId },
      { title, description, completed },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.id;

  try {
    const task = await Task.findOneAndDelete({ taskId, userId });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
