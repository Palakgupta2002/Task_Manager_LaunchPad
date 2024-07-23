import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderAdmin from './HeaderAdmin';
import ProjectDetails from './ProjectDetails';
import ProjectData from './ProjectData';
import managerProfile from "../assest/ManagerProfile.png"
import Card from './Card';

const ViewManagerDetails = () => {
    const [manager, setManager] = useState(null);
    const [project, setProject] = useState(null); 
    const [projectCount,setProjectCount]=useState(null)
    const[taskCount,setTaskCount]=useState(null)
    const { id } = useParams();

    useEffect(() => {
        const getManager = async () => {
            try {
                const response = await fetch(`https://task-manager-launchpad.onrender.com/ManagerData/getOneManager/${id}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch manager')
                }
                const data = await response.json();
                setManager(data);
            } catch (error) {
                console.error('Error fetching manager:', error);
            }
        };
        getManager();
    }, [id]); 

    useEffect(() => {
        const getProject = async () => {
            try {
                const response = await fetch(`https://task-manager-launchpad.onrender.com/Project/getProject/${id}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch project')
                }
                const data = await response.json();
                setProject(data.projects);
                console.log(project,"hello ji ")
            } catch (error) {
                console.error('Error fetching project', error);
            }
        };
        getProject();
    }, [id]); 

    return (
        <div>
            <HeaderAdmin/>
            <div className='md:flex  border-2 border-solid border-gray-600' >
                                <div><img className='h-32' src={managerProfile} alt='Profile photo'/></div>
                                <div className=''>
                                    <div className='text-2xl mt-10'>Welcome in  {manager?.Musername} Dashboard</div>
                                </div>
                               <Card title={"Total Number of Projects"}count={projectCount} />
                               <Card title={"Total Number of Tasks"}count={taskCount} /> 
                            </div>
           <ProjectData email={id} setProjectCount={setProjectCount} setTaskCount={setTaskCount}/>
        </div>
    );
};

export default ViewManagerDetails;
