import React, { useEffect, useContext, useState } from 'react';
import { EmailContext } from '../App';

const ProjectData = () => {
    const { email } = useContext(EmailContext);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/Project/getProject/${email}`);
                if (response.ok) {
                    const data = await response.json();
                    setProjects(data.projects); // Assuming the projects array is nested under the 'projects' key
                } else {
                    console.log('Failed to fetch data');
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, [projects]);

    return (
        <div className='border-2 border-solid border-red-400 w-full'>
            <h2>Projects</h2>
            <table className='border-2 border-solid border-green-400 w-full text-center'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project._id}>
                            <td>{project.name}</td>
                            <td>{project.description}</td>
                            <td>{project.startDate}</td>
                            <td>{project.endDate}</td>
                            <td>{project.priority}</td>
                            <td><button>See details</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectData;
