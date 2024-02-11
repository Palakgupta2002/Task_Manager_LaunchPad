// Import necessary modules
import express from 'express';
import Task from '../models/TaskSchema.js'; // Import your Task model

const router = express.Router();

// Route to update a task
router.put('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { title, description, priority, dueDate } = req.body;

  try {
    // Find the task by ID
    const task = await Task.findById(taskId);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update the task properties
    task.title = title;
    task.description = description;
    task.priority = priority;
    task.dueDate = dueDate;

    // Save the updated task object
    await task.save();

    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
