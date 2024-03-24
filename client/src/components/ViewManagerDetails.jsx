import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderAdmin from './HeaderAdmin';
import ProjectDetails from './ProjectDetails';
import ProjectData from './ProjectData';

const ViewManagerDetails = () => {
    const [manager, setManager] = useState(null);
    const [project, setProject] = useState(null); 
    const { id } = useParams();

    useEffect(() => {
        const getManager = async () => {
            try {
                const response = await fetch(`http://localhost:5000/ManagerData/getOneManager/${id}`)
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
                const response = await fetch(`http://localhost:5000/Project/getProject/${id}`)
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
            <div>
            {manager && (
                <div>
                    <h2>Manager Details</h2>
                    <p>ID: {manager.MUniqueID}</p>
                    <p>Name: {manager.Musername}</p>
                    <p>Email: {manager.Memail}</p>
                </div>
            )}
            </div>
           <ProjectData email={id}/>
        </div>
    );
};

export default ViewManagerDetails;
