const express = require('express');
const { addTask,updateTask,getTasks,deleteTask } = require('../controllers/task.controller');

const verifyUser = require('../utils/verifyUser');

const router = express.Router();

router.post('/addtask', verifyUser, addTask);
router.get('/tasks', verifyUser, getTasks);
router.post('/update/:id', verifyUser, updateTask);
router.delete('/delete/:id', verifyUser, deleteTask);

module.exports = router;