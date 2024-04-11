const {Task} = require('../models/task.model');
const errorHandler = require('../middleware/errors');


const addTask = async (req, res, next) => {
    const { title, timeType, taskType, reward, dueDate, description } = req.body;
    const owner = req.user.id;
    
    const newTask = new Task({ title, timeType, taskType, reward, dueDate, description, owner});

    try {
        await newTask.save();
        res.status(200).json(newTask);
    } catch (error) {
        next(errorHandler(500, 'Error creating task: ' + error));
    }
};

const updateTask = async (req, res, next) => {

    try {
        const updateTask = await Task.findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                timeType: req.body.timeType,
                taskType: req.body.taskType,
                reward: req.body.reward,
                dueDate: req.body.dueDate,
                description: req.body.description
            }
        },{runValidators: true}, { new: true });
        res.status(200).json(updateTask);
    } catch (error) {
        next(errorHandler(500, 'Error updating task'));
    }

}

const deleteTask = async (req, res, next) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'Task deleted successfully'
        });
    } catch (error) {
        next(errorHandler(500, 'Error deleting task'));
    }
};

const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ owner: req.user.id });
        res.status(200).json(tasks);
    } catch (error) {
        next(errorHandler(500, 'Error getting tasks'));
    }
}

module.exports = { addTask, updateTask ,getTasks,deleteTask};