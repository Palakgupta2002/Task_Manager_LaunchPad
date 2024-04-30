import express from 'express';
import Task from '../models/TaskSchema.js';
import Project from "../models/ProjectSchema.js"
import User from '../models/User.js';

const router = express.Router();

router.post('/:email/:projectId/tasks', async (req, res) => {
    try {
        const { title, description, priority, dueDate,status1 } = req.body;
        const { email, projectId } = req.params;

        // Create a new task object
        const newTask = new Task({
            title,
            description,
            priority,
            dueDate,
            email,
            status1
        });

     
        await newTask.save();
        
        const user = await User.findOne({ email });
        const project = await Project.findById(projectId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

    
        const projectIndex = user.projects.findIndex(project => project._id.toString() === projectId);

        if (projectIndex === -1) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.tasks.push(newTask);
        user.projects[projectIndex].tasks.push(newTask);
        await user.save();
        await project.save();
      

        return res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
     
        console.error('Error creating task:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/:projectId', async (req, res) => {
    const {projectId} = req.params;
    try {
       

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        
        // Assuming the task array is named 'tasks' inside the project object
        const tasks = project.tasks;
        
        return res.status(200).json({ tasks });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/tasks/:taskId', async (req, res) => {
    const taskId = req.params.taskId;

    try {
        // Delete the task from Task schema
        const deletedTask = await Task.findByIdAndDelete(taskId);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Delete the task from all users' projects
        await User.updateMany(
            { 'projects.tasks._id': taskId },
            { $pull: { 'projects.$.tasks': { _id: taskId } } }
        );

        // Delete the task from all projects
        await Project.updateMany(
            { 'tasks._id': taskId },
            { $pull: { tasks: { _id: taskId } } }
        );

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:email/tasks/:taskId', async (req, res) => {
    const { email, taskId } = req.params;
    const { title, description, priority, dueDate } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update task in user's tasks if exists
      if (user.tasks && user.tasks.id(taskId)) {
        const userTask = user.tasks.id(taskId);
        userTask.title = title;
        userTask.description = description;
        userTask.priority = priority;
        userTask.dueDate = dueDate;
        await user.save();
      }
  
      // Update task in projects' tasks
      for (const project of user.projects) {
        if (project.tasks && project.tasks.id(taskId)) {
          const projectTask = project.tasks.id(taskId);
          projectTask.title = title;
          projectTask.description = description;
          projectTask.priority = priority;
          projectTask.dueDate = dueDate;
        }
      }
  
      // Update standalone task
      await Task.findByIdAndUpdate(taskId, {
        title,
        description,
        priority,
        dueDate
      });
  
      res.json({ message: 'Task updated successfully' });
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
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
  
  router.put('/:email/:projectId/:taskId/status', async (req, res) => {
    const { taskId, projectId, email } = req.params;
    const { status } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, { status1: status }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await User.updateMany(
            { 'projects.tasks._id': taskId },
            { $set: { 'projects.$[outer].tasks.$[inner].status1': status } },
            { arrayFilters: [{ 'outer._id': projectId }, { 'inner._id': taskId }] }
        );

    
        await Project.updateMany(
            { 'tasks._id': taskId },
            { $set: { 'tasks.$.status1': status } }
        );

        res.json({ message: 'Task status updated successfully', task: updatedTask });
    } catch (error) {
        console.error('Error updating task status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
