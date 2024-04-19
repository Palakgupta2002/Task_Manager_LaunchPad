import { Button } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const TaskForm = ({ setOpenModal, email,projectId}) => {
  console.log(projectId,"hello project id")
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: new Date(),
    email: email,
    status1:'todo'
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dueDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch(`http://localhost:5000/task/${email}/${projectId.id}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data,"hello data")
      
      if (res.ok) {
        setFormData({});
        setLoading(false);
        
      } else {
        setErrorMessage(data.message);
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
  

  return (
    <div className="bg-white rounded-lg p-6 md:p-8 lg:p-10">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm md:text-base lg:text-lg font-medium text-gray-700" htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm md:text-base lg:text-lg font-medium text-gray-700" htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm md:text-base lg:text-lg font-medium text-gray-700" htmlFor="priority">Priority:</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm md:text-base lg:text-lg font-medium text-gray-700" htmlFor="priority">Status:</label>
          <select
            id="status1"
            name="status1"
            value={formData.status}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {/* 'todo', 'completed', 'in progress', 'blocked' */}
            <option value="todo">Todo</option>
            <option value="in progress">in progress</option>
            <option value="completed">completed</option>
            <option value="blocked">blocked</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm md:text-base lg:text-lg font-medium text-gray-700" htmlFor="dueDate">Due Date:</label>
          <DatePicker
            selected={formData.dueDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            required
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Add Task</button>
          <button className="bg-red-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" onClick={() => setOpenModal(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
