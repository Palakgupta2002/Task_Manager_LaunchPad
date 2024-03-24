import React, { useEffect, useContext, useState } from 'react';
import { EmailContext } from '../App';
import { Link, useParams } from 'react-router-dom';
import { Table } from 'flowbite-react';
import Example from './PieChart';

const ProjectData = ({email}) => {
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
        <div className="overflow-x-auto">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Project Name</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Start Date</Table.HeadCell>
                    <Table.HeadCell>End Date</Table.HeadCell>
                    <Table.HeadCell>Priority</Table.HeadCell>
                    <Table.HeadCell>Action</Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">Edit</span>
                    </Table.HeadCell>
                </Table.Head>
        
                <Table.Body className="divide-y">
                    {projects.map(project => (
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={project._id}>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {project.name}
                            </Table.Cell>
                            <Table.Cell>{project.description}</Table.Cell>
                            <Table.Cell>{project.startDate.slice(0,10)}</Table.Cell>
                            <Table.Cell>{project.endDate.slice(0,10)}</Table.Cell>
                            <Table.Cell>{project.priority}</Table.Cell>
                            
                            <Table.Cell>
                                <Link to={`/Projectdetails/${project._id}`}>
                                    <button>See details</button>
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            
        </div>
    );
};

export default ProjectData;
