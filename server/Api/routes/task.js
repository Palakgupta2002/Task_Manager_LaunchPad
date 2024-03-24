import express from 'express';
import Task from '../models/TaskSchema.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/:email/:projectId/tasks', async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;
        const { email, projectId } = req.params;

        // Create a new task object
        const newTask = new Task({
            title,
            description,
            priority,
            dueDate,
            email,
        });

     
        await newTask.save();
        
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

    
        const projectIndex = user.projects.findIndex(project => project._id.toString() === projectId);

        if (projectIndex === -1) {
            return res.status(404).json({ message: 'Project not found' });
        }

      
        user.projects[projectIndex].tasks.push(newTask);
        await user.save();

        return res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
     
        console.error('Error creating task:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
