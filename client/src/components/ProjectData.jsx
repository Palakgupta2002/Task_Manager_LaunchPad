import React, { useEffect, useContext, useState } from 'react';
import { EmailContext } from '../App';
import { Link, useParams } from 'react-router-dom';
import { Table } from 'flowbite-react';
import { PieChart, Pie, Sector, Cell } from "recharts";
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
const data1 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 }
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ProjectData = ({ email, priorityText, orderText, searchText }) => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);

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
        // Filter projects by priority
        let filteredProjects = [...projects]; // Create a copy of the projects array

        if (priorityText && priorityText !== "All") { // Check if priorityText is not "All"
            filteredProjects = projects.filter(project => project.priority === priorityText);
        }

        // Sort projects by order
        if (orderText === 'asc') {
            filteredProjects.sort((a, b) => a.name.localeCompare(b.name));
        } else if (orderText === 'desc') {
            filteredProjects.sort((a, b) => b.name.localeCompare(a.name));
        }

        // Filter projects by search text
        if (searchText) {
            filteredProjects = filteredProjects.filter(project => project.name.toLowerCase().includes(searchText.toLowerCase()));
        }

        setFilteredProjects(filteredProjects);
    }, [projects, priorityText, orderText, searchText]);


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
                            {filteredProjects.map(project => (
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

                </div>
            </div>
            <div>
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
<div>
    
<div className='flex'>
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
                    <div>
                        <PieChart width={800} height={400}>
                            <Pie
                                data={data1}
                                cx={120}
                                cy={200}
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Pie
                                data={data}
                                cx={420}
                                cy={200}
                                startAngle={180}
                                endAngle={0}
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </div>
</div>

                </div>

            </div>
        </div>
    );
};

export default ProjectData;
