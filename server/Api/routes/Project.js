import express from "express"
import Project from "../models/ProjectSchema.js"
import User from "../models/User.js"; 

const router = express.Router();

router.post('/CreateProject', async (req, res) => {
    try {
        const { description, endDate, managerName, name, notes, priority, startDate, teamMembers } = req.body;

        // Create a new project
        const newProject = new Project({
            description,
            endDate,
            managerName,
            name,
            notes,
            priority,
            startDate,
            teamMembers
        });
        const users = await User.find({ email: { $in: teamMembers } });
        await newProject.save()
        
        
        if (!users.length) {
            return res.status(404).json({ message: 'Users not found for the given emails' });
        }

        await Promise.all(users.map(async (user) => {
            user.projects.push(newProject);
           
            await user.save();
        }));

        return res.status(201).json({ message: 'Project created successfully', Project: newProject });

    } catch (error) {
        console.error('Error creating project:', error);
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
router.post('/countProjectsByManagerAndYear', async (req, res) => {
    let allprojectCount=0;
    let totalTasks = 0;
    try {
        const { managerEmail, startYear, endYear, priority } = req.body;

        const projectCountsByYear = {};
  
            const allProjects = await Project.find({
   
            });
            allprojectCount=allProjects.length;
            allProjects.forEach(project => {
                totalTasks += project.tasks.length; 
            });
        

       
        if (priority === 'All') {
            for (let year = startYear; year <= endYear; year++) {
                const allProjects = await Project.find({
                    managerName: managerEmail,
                    startDate: { $gte: `${year}-01-01`, $lte: `${year}-12-31` }
                });

                projectCountsByYear[year] = allProjects.length;
                
            }
            
           
        } else {
           
            for (let year = startYear; year <= endYear; year++) {
                const projectsOfYear = await Project.find({
                    managerName: managerEmail,
                    startDate: { $gte: `${year}-01-01`, $lte: `${year}-12-31` },
                    priority: priority
                });
               
                projectCountsByYear[year] = projectsOfYear.length;
              
            }
        }

        res.json({ message: 'Project counts by year retrieved successfully', projectCountsByYear,allprojectCount,totalTasks });
    } catch (error) {
        console.error('Error counting projects by manager and year:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});




export default router