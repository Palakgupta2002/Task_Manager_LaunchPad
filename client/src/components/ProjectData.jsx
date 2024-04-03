import React, { useEffect, useContext, useState } from 'react';
import { EmailContext } from '../App';
import { Link, useParams } from 'react-router-dom';
import { Table } from 'flowbite-react';
import { PieChart, Pie, Sector, Cell } from "recharts";
import Pagination from './Pagination';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
const data = [
    {
        name: "Jan",
        uv: 4000,
        pv: 2400,
        amt: 2400
    },
    {
        name: "Feb",
        uv: 3000,
        pv: 1398,
        amt: 2210
    },
    {
        name: "Mar",
        uv: 2000,
        pv: 9800,
        amt: 2290
    },
    {
        name: "Apr",
        uv: 2780,
        pv: 3908,
        amt: 2000
    },
    {
        name: "May",
        uv: 1890,
        pv: 4800,
        amt: 2181
    },
    {
        name: "Jun",
        uv: 2390,
        pv: 3800,
        amt: 2500
    },
    {
        name: "Jul",
        uv: 3490,
        pv: 4300,
        amt: 2100
    }, {
        name: "Aug",
        uv: 3490,
        pv: 4300,
        amt: 2100
    }, {
        name: "Sep",
        uv: 3490,
        pv: 4300,
        amt: 2100
    }
    , {
        name: "Oct",
        uv: 3490,
        pv: 4300,
        amt: 2100
    }
    , {
        name: "Nov",
        uv: 3490,
        pv: 4300,
        amt: 2100
    }
    , {
        name: "Dec",
        uv: 3490,
        pv: 4300,
        amt: 2100
    }
];
const data01 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
    { name: "Group E", value: 278 },
    { name: "Group F", value: 189 }
];

const data02 = [
    { name: "Group A", value: 2400 },
    { name: "Group B", value: 4567 },
    { name: "Group C", value: 1398 },
    { name: "Group D", value: 9800 },
    { name: "Group E", value: 3908 },
    { name: "Group F", value: 4800 }
];

const ProjectData = ({ email, priorityText, orderText, searchText }) => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

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
    }, [email]);

    useEffect(() => {
       
        let filteredProjects = [...projects]; 

        if (priorityText && priorityText !== "All") { 
            filteredProjects = projects.filter(project => project.priority === priorityText);
        }

    
        if (orderText === 'asc') {
            filteredProjects.sort((a, b) => a.name.localeCompare(b.name));
        } else if (orderText === 'desc') {
            filteredProjects.sort((a, b) => b.name.localeCompare(a.name));
        }

     
        if (searchText) {
            filteredProjects = filteredProjects.filter(project => project.name.toLowerCase().includes(searchText.toLowerCase()));
        }

        setFilteredProjects(filteredProjects);
    }, [projects, priorityText, orderText, searchText]);




    //   // Dummy JSON data
    //   const dummyData = [
    //     { id: 1, name: "Item 1" },
    //     { id: 2, name: "Item 2" },
    //     { id: 3, name: "Item 3" },
    //     { id: 4, name: "Item 4" },
    //     { id: 5, name: "Item 5" },
    //     { id: 6, name: "Item 6" },
    //     { id: 7, name: "Item 7" },
    //     { id: 8, name: "Item 8" },
    //     { id: 9, name: "Item 9" },
    //     { id: 10, name: "Item 10" },
    //     { id: 11, name: "Item 11" },
    //     { id: 12, name: "Item 12" },
    //   ];

    //   // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);


    const paginate = pageNumber => setCurrentPage(pageNumber);

    //   return (
    //     <div className="container">
    //       <h1>Pagination Example</h1>
    //       <ul>
    //         {currentItems.map(item => (
    //           <li key={item.id}>{item.name}</li>
    //         ))}
    //       </ul>
    //       <Pagination
    //         itemsPerPage={itemsPerPage}
    //         totalItems={dummyData.length}
    //         paginate={paginate}
    //       />
    //     </div>
    //   );


    return (
        <div>
            <div>
                <div className="">
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
                            {currentItems.map(project => (
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={project._id}>
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {project.name}
                                    </Table.Cell>
                                    <Table.Cell>{project.description}</Table.Cell>
                                    <Table.Cell>{project.startDate.slice(0, 10)}</Table.Cell>
                                    <Table.Cell>{project.endDate.slice(0, 10)}</Table.Cell>
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
                    <Pagination itemsPerPage={itemsPerPage}
                        totalItems={filteredProjects.length}
                        paginate={paginate}
                    />

                </div>
            </div>
            <div>
                <div>

                    <div className='flex overflow-hidden gap-10'>

                        <div className='flex'>
                            <div>
                                <div className='flex gap-5 m-8'>
                                    <div>
                                        <select name="Start" id="Start">
                                            <option value="Start">Start Date</option>
                                            <option value="End">End Date</option>
                                        </select>
                                    </div>
                                    <div>
                                        <select name="All" id="All">
                                            <option value="High">High</option>
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="All">All</option>
                                        </select>
                                    </div>
                                </div>
                                <BarChart
                                    width={700}
                                    height={500}
                                    data={data}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5
                                    }}
                                    barSize={20}
                                >
                                    <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Bar dataKey="pv" fill="#0000FF" background={{ fill: "#eee" }} />
                                </BarChart>
                            </div>
                        </div>
                        <div className=''>
                            <div className='flex gap-5 m-8'>
                                <div>
                                    <select name="Start" id="Start">
                                        <option value="Start">Start Date</option>
                                        <option value="End">End Date</option>
                                    </select>
                                </div>
                                <div>
                                    <select name="All" id="All">
                                        <option value="High">High</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="All">All</option>
                                    </select>
                                </div>
                            </div>
                            <PieChart className='' width={600} height={400}>

                                <Pie
                                    dataKey="value"
                                    isAnimationActive={false}
                                    data={data01}
                                    cx={300}
                                    cy={100}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    label
                                    width={700}
                                />
                                <Pie
                                    dataKey="value"
                                    data={data02}
                                    cx={290}
                                    cy={310}
                                    innerRadius={40}
                                    outerRadius={80}
                                    fill="#82ca9d"
                                />


                            </PieChart>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default ProjectData;
