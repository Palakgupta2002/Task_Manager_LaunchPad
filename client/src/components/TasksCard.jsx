import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import deletetask from '../CustomHooks/deleteTask';
import { useContext } from 'react';
import { EmailContext } from '../App';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TaskCard = ({ tasks }) => {
  const { adminLog, email } = useContext(EmailContext);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    title: tasks.title,
    description: tasks.description,
    priority: tasks.priority,
    dueDate: new Date(tasks.dueDate),
    email: email
  });



  const handleComplete = async () => {
    try {
      // Call the API to update the task's completion status
      const response = await fetch(`http://localhost:5000/updateTask/${email}/tasks/${tasks._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: true // Toggle the completion status
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update task completion status');
      }

      // If the API call is successful, refresh the task data or update the UI
    } catch (error) {
      console.error('Error updating task completion status:', error);
      // Handle error if needed
    }
  };

  const handleTask = async () => {
    try {
      await deletetask({ email: tasks.email, taskId: tasks._id });
      // Task deleted successfully, you can perform any additional actions here if needed
    } catch (error) {
      // Handle any errors that occurred during task deletion
      console.error('Error deleting task:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle change in date picker
  const handleDateChange = (date) => {
    setFormData({ ...formData, dueDate: date });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:5000/updateTask/${tasks._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      // Handle success response here
      console.log('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
      // Handle error
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 w-fit">
      <h3 className="text-lg font-semibold mb-2">{tasks.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{tasks.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <input
            type="checkbox"
            id={`task-${tasks.id}`}
            checked={tasks.completed}
            className="mr-2"
            onChange={handleComplete} // Toggle modal on checkbox change
          />
          <label htmlFor={`task-${tasks._id}`} className="text-sm text-gray-700">
            Completed
          </label>
        </div>
        {adminLog ? (
          <button className="text-sm text-red-600 hover:text-red-700 focus:outline-none" onClick={handleTask}>
            Delete
          </button>
        ) : (
          ''
        )}
        <>
          <button onClick={() => setOpenModal(true)}>edit</button>
          <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
          
              <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title:</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description:</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    rows="4"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label htmlFor="dueDate" className="block text-gray-700 font-bold mb-2">Due Date:</label>
                  <DatePicker
                    selected={formData.dueDate}
                    onChange={handleDateChange}
                    dateFormat="MM/dd/yyyy"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="priority">Priority:</label>
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
                <div className="flex justify-center gap-4">
                  <Button color="success" type="submit">Update</Button>
                  <Button color="gray" onClick={() => setOpenModal(false)}>Cancel</Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </>
      </div>
    </div>
  );
};

export default TaskCard;
