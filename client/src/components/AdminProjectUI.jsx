import React, { useState, useEffect } from 'react';
import teamImg from "../assest/team3.png";
import managerProfile from "../assest/ManagerProfile.png"
import EmployeeImg from "../assest/EmployeeProfile.png"
import { Button, Table } from 'flowbite-react';
import ProjectData from './ProjectData';
import { Link } from 'react-router-dom';

const AdminProjectUI = ({ isManager, email }) => {
    const [userData, setUserData] = useState(null);
    const [project, setProject] = useState(null);
    const [search, setSearch] = useState("");
    console.log(email, "project email");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                let apiUrl = '';
                if (isManager) {
                    apiUrl = `https://task-manager-launchpad.onrender.com/ManagerData/getOneManager/${email}`;
                } else {
                    apiUrl = `https://task-manager-launchpad.onrender.com/user/users/${email}`;
                }

                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setUserData(data);
                if (data.projects) {
                    setProject(data.projects)

                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (email !== null) {
            fetchUserData();
        }
    }, [isManager, email]);

    useEffect(() => {
        const getProject = async () => {
            try {
                const response = await fetch(`https://task-manager-launchpad.onrender.com/Project/getProject/${email}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        setProject([]);
                        console.log("Manager does not have any projects");
                    } else {
                        throw new Error('Failed to fetch project');
                    }
                } else {
                    const data = await response.json();
                    if (data.projects) {
                        setProject(data.projects);
                    }
                    console.log(project, "hello ji ");
                }
            } catch (error) {
                console.error('Error fetching project', error);
            }
        };

        if (isManager && email !== null) {
            getProject();
        }
    }, [email, isManager]);

    const filteredProjects = project ? project.filter(project => {
        return project.name.toLowerCase().includes(search.toLowerCase());
    }) : [];

    return (
        <>
            {userData === null ? (
                <div className='shadow-lg pt-20 bg-slate-700 rounded-lg'>
                    <div className='flex justify-center text-3xl text-white'>
                        <h1>You did not search any project yet!!!!</h1>
                    </div>
                    <img width={800} src={teamImg} alt='team' />
                </div>
            ) : (
                isManager ?
                    <div>
                        <div className='flex justify-between p-4  border-b-8'>
                            <div className='text-2xl mt-10'>
                                <div>{userData?.Memail}</div>
                                <div>{userData?.MUniqueID}</div>
                                <div>{userData?.Musername}</div>
                            </div>
                            <div><img className='h-44' src={managerProfile} alt='manager Profile' /></div>
                        </div>
                        <div className='flex justify-between p-5'>
                            <input onChange={(e) => setSearch(e.target.value)} value={search} type='text' className='w-96' placeholder='Search here' />
                            <Link to={`/viewManager/${userData.Memail}`}>
                                <button className="text-blue-500 hover:text-blue-700">See Details</button>
                            </Link>
                        </div>
                        <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
                            {filteredProjects.length > 0 ?
                                <Table hoverable>
                                    <Table.Head>
                                        <Table.HeadCell>Project Name</Table.HeadCell>
                                        <Table.HeadCell>Description</Table.HeadCell>
                                        <Table.HeadCell>Start Date</Table.HeadCell>
                                        <Table.HeadCell>End Date</Table.HeadCell>
                                        <Table.HeadCell>Priority</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className="divide-y">
                                        {filteredProjects.map(project => (
                                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={project._id}>
                                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                    {project.name}
                                                </Table.Cell>
                                                <Table.Cell>{project.description}</Table.Cell>
                                                <Table.Cell>{project.startDate.slice(0, 10)}</Table.Cell>
                                                <Table.Cell>{project.endDate.slice(0, 10)}</Table.Cell>
                                                <Table.Cell>{project.priority}</Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table> :
                                <div>No Projects Found</div>
                            }
                        </div>
                    </div>
                    :
                    <div>
                        <div className='flex justify-between p-5 border-b-4'>
                            <div className='mt-5'>
                                <div>{userData?.email}</div>
                                <div>{userData?.username}</div>
                                <div>{userData?.UserUniqueID}</div>
                            </div>
                            <div><img className='h-36' src={EmployeeImg} alt='manager Profile' /></div>
                        </div>
                        <div className='flex justify-between p-5'>
                            <input onChange={(e) => setSearch(e.target.value)} value={search} type='text' className='w-96' placeholder='Search here' />
                            <Link to={`/UserDetails/${userData.email}`}>
                                <button className="text-blue-500 hover:text-blue-700">See Details</button>
                            </Link>
                        </div>
                        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                            <Table className='overflow-hidden h-14'>
                                <Table.Head>
                                    <Table.HeadCell>Project Name</Table.HeadCell>
                                    <Table.HeadCell>Description</Table.HeadCell>
                                    <Table.HeadCell>Start Date</Table.HeadCell>
                                    <Table.HeadCell>End Date</Table.HeadCell>
                                    <Table.HeadCell>Priority</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y">
                                    {filteredProjects?.map((ele, index) => (
                                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {ele.name}
                                            </Table.Cell>
                                            <Table.Cell>{ele.description}</Table.Cell>
                                            <Table.Cell>{ele.startDate.slice(0, 10)}</Table.Cell>
                                            <Table.Cell>{ele.endDate}</Table.Cell>
                                            <Table.Cell>{ele.priority}</Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </div>
                    </div>
            )}
        </>
    );
}

export default AdminProjectUI;

