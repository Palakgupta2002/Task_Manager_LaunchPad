// Import necessary modules
import express from 'express';
import User from '../models/User.js'; // Import your User model

const router = express.Router();

// Route to update a task
router.put('/:email/tasks/:taskId', async (req, res) => {
  const { email, taskId } = req.params;
  const { title, description, priority, dueDate } = req.body;

  try {
    // Find the user by ID
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the task within the user's tasks array by ID
    const task = user.tasks.id(taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update the task properties
    task.title = title;
    task.description = description;
    task.priority = priority;
    task.dueDate = dueDate;

    // Save the updated user object
    await user.save();

    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
