// Import necessary modules
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Route to update a user's task status
router.put('/:email/tasks/:taskId', async (req, res) => {
  const { email, taskId } = req.params;

  try {
    // Find the user by ID
    const user = await User.findOne({ email: email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the task by ID
    const taskIndex = user.tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update the task status to false
    user.tasks[taskIndex].completed = true;

    // Save the updated user object
    await user.save();

    res.json({ message: 'Task status updated successfully' });
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
