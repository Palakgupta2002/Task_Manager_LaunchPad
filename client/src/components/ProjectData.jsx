import React, { useEffect, useContext, useState } from 'react';
import managerProfile from "../assest/ManagerProfile.png"
import filter from "../assest/filter.svg"

import { Link, useParams } from 'react-router-dom';
import { Dropdown, Table } from 'flowbite-react';
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
import {
    ComposedChart,
    Line,
    Area,
    Scatter
} from "recharts";

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

const dateJson = [
    {
        "date": "2020-2030"
    },
    {
        "date": "2000-2010"
    },
    {
        "date": "2010-2020"
    },
    {
        "date": "2020-2030"
    },
    {
        "date": "2030-2040"
    },
    {
        "date": "2040-2050"
    },
    {
        "date": "2050-2060"
    }

]
const data4 = [
    {
        name: "Jan",
        uv: 590,
        pv: 800,
        amt: 1400,
        cnt: 490
    },
    {
        name: "Feb",
        uv: 868,
        pv: 967,
        amt: 1506,
        cnt: 590
    },
    {
        name: "Mar",
        uv: 1397,
        pv: 1098,
        amt: 989,
        cnt: 350
    },
    {
        name: "April",
        uv: 1480,
        pv: 1200,
        amt: 1228,
        cnt: 480
    },
    {
        name: "May",
        uv: 1520,
        pv: 1108,
        amt: 1100,
        cnt: 460
    },
    {
        name: "Jun",
        uv: 1500,
        pv: 680,
        amt: 1700,
        cnt: 380
    },
    {
        name: "Jul",
        uv: 900,
        pv: 680,
        amt: 1700,
        cnt: 380
    },
    {
        name: "Aug",
        uv: 1400,
        pv: 680,
        amt: 1700,
        cnt: 380
    },
    {
        name: "Sep",
        uv: 700,
        pv: 680,
        amt: 1700,
        cnt: 380
    },
    {
        name: "Oct",
        uv: 1000,
        pv: 680,
        amt: 1700,
        cnt: 380
    },
    {
        name: "Nov",
        uv: 1400,
        pv: 680,
        amt: 1700,
        cnt: 380
    },
    {
        name: "Dec",
        uv: 1400,
        pv: 680,
        amt: 1700,
        cnt: 380
    }
];

const ProjectData = ({ email,setProjectCount,setTaskCount }) => {

    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [startYear, setStartYear] = useState("2020")
    const [endYear, setEndYear] = useState("2030")
    const [projectCountsByYear, setProjectCountsByYear] = useState({});
    const [priority, setPriority] = useState("All")
    const [projectCount, setProjectcount] = useState(null)
    const [showFilter, setShowFilter] = useState(true)
    const [search, setSearch] = useState(true)
    const [priorityText, setPriorityText] = useState("All")
    const [orderText, setOrderText] = useState("Ascending")
    const [searchText, setSearchText] = useState(null)

    const [itemsPerPage] = useState(12);
    const [data, setData] = useState(
        [
            {
                name: "1990",
                uv: 4000,
                pv: 0,
                amt: 2400
            },
            {
                name: "1991",
                uv: 3000,
                pv: 0,
                amt: 2210
            },
            {
                name: "1992",
                uv: 2000,
                pv: 0,
                amt: 2290
            },
            {
                name: "1993",
                uv: 2780,
                pv: 0,
                amt: 2000
            },
            {
                name: "1994",
                uv: 1890,
                pv: 0,
                amt: 2181
            },
            {
                name: "1995",
                uv: 2390,
                pv: 0,
                amt: 2500
            },
            {
                name: "1996",
                uv: 3490,
                pv: 0,
                amt: 2100
            }, {
                name: "1997",
                uv: 3490,
                pv: 0,
                amt: 2100
            }, {
                name: "1998",
                uv: 3490,
                pv: 0,
                amt: 2100
            }
            , {
                name: "1999",
                uv: 3490,
                pv: 0,
                amt: 2100
            }
            , {
                name: "2000",
                uv: 3490,
                pv: 0,
                amt: 2100
            }
        ]

    )

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/Project/getProject/${email}`);
                if (response.ok) {
                    const data = await response.json();
                    setProjects(data.projects);

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


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);


    const paginate = pageNumber => setCurrentPage(pageNumber);
    useEffect(() => {
        const fetchProjectCounts = async () => {
            try {
                const response = await fetch('http://localhost:5000/Project/countProjectsByManagerAndYear', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        managerEmail: email,
                        startYear: startYear,
                        endYear: endYear,
                        priority: priority
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch project counts');
                }

                const data = await response.json();
                setProjectCountsByYear(data.projectCountsByYear);
                setProjectCount(data.allprojectCount) 
                setTaskCount(data.totalTasks)
            } catch (error) {
                console.log(error)
            }
        };

        fetchProjectCounts();
    }, [email, startYear, endYear, priority]);
    

    const setFun = (e) => {
        const selectedDateRange = e.target.value;
        const [startYear, endYear] = selectedDateRange.split('-').map(year => parseInt(year));
        setStartYear(startYear)
        setEndYear(endYear)
    }

    useEffect(() => {
        const selectedDateRange = `${startYear}-${endYear}`;
        const [startYearInt, endYearInt] = selectedDateRange.split('-').map(year => parseInt(year));

        const updatedData = data.map((entry, index) => {
            const year = startYearInt + index;
            const count = projectCountsByYear[year] || 0;
            if (year >= startYearInt && year <= endYearInt) {
                return {
                    ...entry,
                    name: `${year}`,
                    pv: count
                };
            }
            return entry;
        });
        setData(updatedData);
    }, [startYear, endYear, projectCountsByYear]);


    return (
        <div>
            <div className=''>
                <div className='md:flex justify-between'>
                    <div>
                        <div className='flex gap-5 m-8'>
                            <div>
                                <select onChange={(e) => setFun(e)} name="Start" id="Start">
                                    {
                                        dateJson && dateJson.map((date) =>
                                            <option value={date.date}>{date.date}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div>
                                <select onChange={(e) => setPriority(e.target.value)} name="All" id="All">
                                    <option value="All">All</option>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                            </div>
                        </div>


                        <BarChart
                            width={700}
                            height={270}
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
                        <div className="">
                            <div className='flex justify-between m-10'>
                                <div className='flex gap-10'>

                                    <div onClick={() => setShowFilter(!showFilter)} className='flex gap-4 text-lg font-bold text-blue-800' ><img className='-mt-2' width={"20px"} src={filter} alt='filterImage' /> <h2>Filter</h2></div>
                                    {
                                        showFilter ? "" :
                                            <div className='flex gap-10'>
                                                <div>
                                                    <Dropdown label={`${priorityText}`}>
                                                        <Dropdown.Item onClick={() => setPriorityText("All")}>All</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setPriorityText("High")}>High</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setPriorityText("Medium")}>Medium</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setPriorityText("Low")}>Low</Dropdown.Item>
                                                    </Dropdown>
                                                </div>
                                                <div>
                                                    <Dropdown label={`${orderText}`}>
                                                        <Dropdown.Item onClick={() => setOrderText("asc")}>Ascending</Dropdown.Item>
                                                        <Dropdown.Item onClick={() => setOrderText("desc")}>Descending</Dropdown.Item>
                                                    </Dropdown>

                                                </div>
                                            </div>
                                    }

                                    <div className='text-lg font-bold text-blue-800' onClick={() => setSearch(!search)}>Search</div>
                                    {
                                        search ? "" : <div className=''><input onChange={(e) => setSearchText(e.target.value)} type='text' placeholder='Search' /></div>
                                    }
                                </div>

                            </div>
                            <div style={{ maxHeight: '200px',overflowY: 'auto',overflowX:'auto' }}>
                                <Table hoverable>
                                    <Table.Head>
                                        <Table.HeadCell>Project Name</Table.HeadCell>
                                        <Table.HeadCell>Description</Table.HeadCell>
                                        <Table.HeadCell>Start Date</Table.HeadCell>
                                        <Table.HeadCell>End Date</Table.HeadCell>
                                        <Table.HeadCell>Priority</Table.HeadCell>
                                        <Table.HeadCell>Action</Table.HeadCell>
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
                    </div>
                </div>
            </div>


        </div>
    );
};

export default ProjectData;