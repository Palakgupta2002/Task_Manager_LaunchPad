import express from "express"
import Project from "../models/ProjectSchema.js"

const router = express.Router();

router.post('/CreateProject',async(req,res)=>{
    try{
        const {description,endDate,managerName,name,notes,priority,startDate,teamMembers}=req.body;
        const newProject=new Project({
            description,
            endDate,
            managerName,
            name,
            notes,
            priority,
            startDate,
            teamMembers
        })
        await newProject.save()
        return res.status(201).json({ message: 'Project created successfully', Project: newProject });

    }catch(error){
        console.error('Error creating task:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }

})
router.get('/getProject/:Musername', async (req, res) => {
    const { Musername } = req.params;
    try {
        const projects = await Project.find({ managerName: Musername });

        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: 'No projects found for the specified manager' });
        }

        res.json({ message: 'Projects retrieved successfully', projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
router.get('/getProjectDetails/:id',async(req,res)=>{
    const {id}=req.params;
    try{
        const projectDetails=await  Project.find({_id:id});
        if(!projectDetails){
            return res.status(404).json({message:'No details found of this project'})
        }
        res.json({message:'Project details get succesfully',projectDetails})

    }catch(error){
        console.log("some errors occurs in this project",error)
        return res.status(500).json({message:"Internal server error"})

    }
})

export default router