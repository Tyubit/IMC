const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    timeType: {
        type: String,
        enum: { values:['daily', 'weekly', 'global'], message:'taskType must be of of the following types: daily, weekly, global' },
        required: [true, "Time type is required"]
    },
    taskType: {
        type: String,
        enum: { values:['food', 'water', 'exercise', 'other'], message:'taskType must be of of the following types: food, water, exercise, other' },
        required: [true, "Task type is required"]
    },
    reward: {
        type: Number,
        default: 0
    },
    dueDate: {
        type: Date,
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);
exports.Task = Task;