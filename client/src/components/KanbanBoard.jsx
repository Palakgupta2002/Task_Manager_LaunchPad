import React, { useEffect, useState } from 'react';
import "../App.css"
import { useParams } from 'react-router-dom';
import deleteIcon from "../assest/delete.svg"
import edit from "../assest/Edit.svg"
import KanbanBoardCard from './KanbanBoardCard';
import todo from "../assest/todo.svg"
import progress from "../assest/in-progress.svg"
import blocked from "../assest/blocked.svg"
import complete from "../assest/completed.svg"
import plus from "../assest/plus.svg"
import KanabanHeader from './KanabanHeader';
import { Dropdown, Modal } from "flowbite-react";
import axios from 'axios';
import updateIcon from "../assest/Update.svg"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,

} from "recharts";
import { PieChart, Pie, Cell } from "recharts";

import { Button, Label, Table } from "flowbite-react";
import Pagination from './Pagination';
import ProgessCard from './ProgessCard';
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);


  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const KanbanBoard = ({ projectData }) => {
  const { id } = useParams();
  const [taskData, setTaskData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const { startDate, endDate } = projectData;
  const [selectedYear, setSelectedYear] = useState(startDate);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [openModalId, setOpenModalId] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const isUser = localStorage.getItem("userLog");
  
  const data = [
    {
      name: "Jan",
      uv: 4000,
      pv: 0,
      amt: 2400
    },
    {
      name: "Feb",
      uv: 3000,
      pv: 0,
      amt: 2210
    },
    {
      name: "Mar",
      uv: 2000,
      pv: 0,
      amt: 2290
    },
    {
      name: "Apr",
      uv: 2780,
      pv: 0,
      amt: 2000
    },
    {
      name: "May",
      uv: 1890,
      pv: 0,
      amt: 2181
    },
    {
      name: "Jun",
      uv: 2390,
      pv: 0,
      amt: 2500
    },
    {
      name: "Jul",
      uv: 3490,
      pv: 0,
      amt: 2100
    }, {
      name: "Aug",
      uv: 3490,
      pv: 0,
      amt: 2100
    }, {
      name: "Sep",
      uv: 3490,
      pv: 0,
      amt: 2100
    }
    , {
      name: "Oct",
      uv: 3490,
      pv: 0,
      amt: 2100
    }
    , {
      name: "Nov",
      uv: 3490,
      pv: 0,
      amt: 2100
    },
    {
      name: "Dec",
      uv: 3490,
      pv: 0,
      amt: 2100
    }
  ]
  const [cx, setCx] = useState(280);
  const [cy, setCy] = useState(200);
  useEffect(() => {
    const handleResize = () => {
     
      if (window.innerWidth <= 768) {
        
        setCx(150);
        setCy(170);
      } else {
        
        setCx(280);
        setCy(200);
      }
    };

  
    handleResize();
    window.addEventListener('resize', handleResize);

    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const generateYearsArray = (start, end) => {
    const startYear = new Date(start).getFullYear();
    const endYear = new Date(end).getFullYear();
    const years = [];
    for (let i = startYear; i <= endYear; i++) {
      years.push(i);
    }
    return years;
  };
  const yearsArray = generateYearsArray(startDate, endDate);

  const fetchTaskData = async () => {
    try {
      const fetchApi = await fetch(`http://localhost:5000/task/${id}`);
      const jsonData = await fetchApi.json();

      setTaskData(jsonData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, [taskData]);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/task/tasks/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        const errorData = await response.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while deleting the task.');
    }
  };

  const handleConfirmation = (id) => {
    const confirmation = window.confirm('Are you sure you want to delete the task?');

    if (confirmation) {
      handleDelete(id);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = taskData?.tasks?.slice(indexOfFirstItem, indexOfLastItem);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const countStatus = (status) => {
    return taskData?.tasks?.filter(task => task.status1 === status).length;
  };

  // Update data1 array with task counts for each status
  const data1 = [
    { name: "Todo", value: countStatus("todo"), Label: "todo" },
    { name: "In Progress", value: countStatus("in progress") },
    { name: "Blocked", value: countStatus("blocked") },
    { name: "Completed", value: countStatus("completed") }
  ];

  // Update pv values in data array based on task length for each month
  const updatedData = data.map(month => {
    const monthName = month.name.toLowerCase(); // Convert month name to lowercase for matching
    const monthTasks = taskData?.tasks?.filter(task => {
      const taskMonth = new Date(task.dueDate).toLocaleString('en-US', { month: 'short' }).toLowerCase();
      return taskMonth === monthName;
    });
    return {
      ...month,
      pv: monthTasks ? monthTasks.length : 0 // Update pv value with task length for the month
    };
  });
  const [newStatus, setNewStatus] = useState(null);

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleUpdateStatus = async (taskid,email) => {
    try {
      const response = await fetch(`http://localhost:5000/task/${email}/${id}/${taskid}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });
  
      if (response.ok) {
        setShowAlert(true);
      } else {
        alert(response.status)
        console.error('Error updating status:', response.status);
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  

  return (
    <div>
      <div className='md:flex'>
        <div>
          <select className='ml-20 mt-3 mb-10' onChange={(e) => setSelectedYear(e.target.value)} name="Start" id="Start">
            {yearsArray.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
          <BarChart
            width={700}
            height={400}
            data={updatedData}
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
          <div className='grid grid-cols-2 md:flex gap-10'>
            <ProgessCard Cardcolor={"#0088FE"} countOfStatus={countStatus("todo")} typeOfStaus={"Todo"} />
            <ProgessCard Cardcolor={"#00C49F"} countOfStatus={countStatus("in progress")} typeOfStaus={"In Progress"} />
            <ProgessCard Cardcolor={"#FFBB28"} countOfStatus={countStatus("blocked")} typeOfStaus={"Blocked"} />
            <ProgessCard Cardcolor={"#FF8042"} countOfStatus={countStatus("completed")} typeOfStaus={"Completed"} />
          </div>
          <PieChart width={400} height={400}>
            <Pie
              data={data1}
              cx={cx}
              cy={cy}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data1.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Priority</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Due Date</Table.HeadCell>
              <Table.HeadCell>Assigned</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {
              taskData.tasks && currentItems.map((task) => (
                <Table.Body className="divide-y">
                  <Table.Row key={task._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {task.title}
                    </Table.Cell>
                    <Table.Cell>{task.priority}</Table.Cell>
                    <Table.Cell>{task.status1}</Table.Cell>
                    <Table.Cell>{task.dueDate.slice(0, 10)}</Table.Cell>
                    <Table.Cell>{task.email}</Table.Cell>
                    {/* <Table.Cell>{task._id}</Table.Cell> */}
                    <Table.Cell>
                      {isUser === "true" ? (

                        <div>
                          <>
                            <button onClick={() => setOpenModalId(task._id)}>Edit Status</button>
                            <Modal dismissible show={openModalId === task._id} onClose={() => setOpenModalId(null)}>
                              <Modal.Header>{task.title}</Modal.Header>
                              <Modal.Body>
                                <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
                                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{task.title}</h2>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className='flex gap-6'>
                                      <div>
                                        <p className="text-gray-700 dark:text-gray-300 font-medium">Status:</p>
                                        <select name="status" id="status" className="text-gray-900 dark:text-white p-2" value={newStatus} onChange={handleStatusChange}>
                                          <option value="in progress">in Progress</option>
                                          <option value="completed">Completed</option>
                                          <option value="blocked">Blocked</option>
                                          <option value="todo">ToDo</option>
                                        </select>
                                      </div>
                                      <button className="text-gray-900 dark:text-white" onClick={()=>handleUpdateStatus(task._id, task.email)}>
                                        <img src={updateIcon} alt='update.svg' />
                                      </button>
                                      {showAlert && (
                                        <div className="alert alert-success" role="alert">
                                          Status updated successfully!
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <p className="text-gray-700 dark:text-gray-300 font-medium">Priority:</p>
                                      <p className="text-gray-900 dark:text-white">{task.priority}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-700 dark:text-gray-300 font-medium">DueDate:</p>
                                      <p className="text-gray-900 dark:text-white">{task.dueDate.slice(0, 10)}</p>
                                    </div>
                                    <div>
                                      <p className="text-gray-700 dark:text-gray-300 font-medium">Email:</p>
                                      <p className="text-gray-900 dark:text-white">{task.email}</p>
                                    </div>
                                  </div>
                                </div>
                              </Modal.Body>

                            </Modal>
                          </>
                        </div>
                      ) : (

                        <div className='flex gap-5'>
                          <button onClick={() => handleConfirmation(task._id, task.email)}><img src={deleteIcon} alt='delete' /></button>
                          <div>
                            {/* <>
                              <button className='mt-4' onClick={() => setOpenModal(true)}><img width={"60px"} src={edit} alt='edit' /></button>
                              <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                                <Modal.Header>Update Task info</Modal.Header>
                                <Modal.Body>
                               
                                </Modal.Body>
                              </Modal>
                            </> */}
                          </div>
                        </div>
                      )}
                    </Table.Cell>


                  </Table.Row>
                </Table.Body>
              ))
            }
          </Table>
          <Pagination itemsPerPage={itemsPerPage}
            totalItems={taskData?.tasks?.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;

