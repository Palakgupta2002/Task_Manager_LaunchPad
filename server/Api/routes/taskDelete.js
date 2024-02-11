// Import necessary modules
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Route to delete a user's task
router.delete('/:email/tasks/:taskId', async (req, res) => {
  const { email, taskId } = req.params;

  try {
    // Find the user by email
    const user = await User.findOne({ email: email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the index of the task to delete
    const taskIndex = user.tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Remove the task from the user's tasks array
    user.tasks.splice(taskIndex, 1);

    // Save the updated user object
    await user.save();

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
