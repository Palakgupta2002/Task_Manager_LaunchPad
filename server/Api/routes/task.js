import express from 'express';
import Task from '../models/TaskSchema.js';

const router = express.Router();
router.post('/tasks', async (req, res) => {
    try {
        // Extract task details from request body
        const { title, description, priority, dueDate, email } = req.body;

        // Create a new task object
        const newTask = new Task({
            title,
            description,
            priority,
            dueDate,
            email
        });

        // Save the task to the database
        await newTask.save();

        // Respond with a success message
        return res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        // If an error occurs, respond with an error message
        console.error('Error creating task:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
 
export default router
