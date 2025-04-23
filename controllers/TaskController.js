const Task = require('../models/TaskModel');


exports.addTask = async (req, res) => {
  const {
    locationID,
    locationName,
    category,
    name,
    taskDescription,
    dueDate,
    toDos
  } = req.body;

  if (!locationID || !locationName || !category || !name || !dueDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const task = new Task({
      locationID,
      locationName,
      category,
      name,
      taskDescription,
      dueDate,
      toDos
    });

    await task.save();
    res.status(201).json({ message: 'Task saved successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Error saving task', error: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ dueDate: 1 }); // sorted by due date
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
};

exports.getTasksByName = async (req, res) => {
    const { name } = req.params;
  
    try {
      const tasks = await Task.find({ name });
      if (tasks.length === 0) {
        return res.status(404).json({ message: 'No tasks found with that name' });
      }
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching task', error: error.message });
    }
};

exports.getTasksByLocation = async (req, res) => {
    const { locationName } = req.params;
  
    try {
      const tasks = await Task.find({ locationName });
      if (tasks.length === 0) {
        return res.status(404).json({ message: 'No tasks found for this location' });
      }
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks for location', error: error.message });
    }
};

exports.markTodosCompleted = async (req, res) => {
    const { id } = req.params;
    const { completedTodoTitles } = req.body; // e.g. ["Write draft", "Send to review"]
  
    try {
      const task = await Task.findById(id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
  
      task.toDos = task.toDos.map(todo => {
        if (completedTodoTitles.includes(todo.title)) {
          return { ...todo.toObject(), completed: true };
        }
        return todo;
      });
  
      await task.save();
      res.status(200).json({ message: 'Task updated', task });
    } catch (error) {
      res.status(500).json({ message: 'Error updating task', error: error.message });
    }
};