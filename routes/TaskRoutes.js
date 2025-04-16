const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController');

router.post('/newtask', taskController.addTask); // Create task
router.get('/all', taskController.getAllTasks); // Get all task list
router.get('/by-name/:name', taskController.getTasksByName);
router.get('/by-location/:locationName', taskController.getTasksByLocation);
router.patch('/:id', taskController.markTodosCompleted);

module.exports = router;
