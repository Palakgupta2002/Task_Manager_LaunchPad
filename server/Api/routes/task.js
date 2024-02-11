import express from 'express';
import Task from '../models/TaskSchema.js';
import User from '../models/User.js'; // Import the User model

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
            email,
           
        });

        // Save the task to the database
        await newTask.save();

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Add the task to the user's profile
        user.tasks.push(newTask);
        await user.save();

        // Respond with a success message
        return res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        // If an error occurs, respond with an error message
        console.error('Error creating task:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
