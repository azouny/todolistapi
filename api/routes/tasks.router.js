const express = require('express');


const tasksController = require('../controllers/tasks.controller');

const { checkAuth } = require('../middleware/checkAuth');

const router = express.Router();

router.get('/', checkAuth, tasksController.getAllTasks);

router.get('/:taskId', checkAuth, tasksController.getTaskById);

router.post('/', checkAuth, tasksController.addTask);

router.put('/:taskId', checkAuth, tasksController.updateTask);

router.delete('/:taskId', checkAuth, tasksController.deleteTask);



module.exports = router;