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



export default router;
