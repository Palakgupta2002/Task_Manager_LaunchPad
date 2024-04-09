import React, { useState } from 'react';
import useGetAllUserData from '../CustomHooks/GetAllUser';
import { Button, Label, Radio } from 'flowbite-react';


const ProjectForm = () => {
 
const emailjson = localStorage.getItem("Email"); 
const email = JSON.stringify(emailjson);
const unquotedEmail = email.substring(1, email.length - 1);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: 'High',
    teamMembers: [],
    notes: '',
    managerName: unquotedEmail
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {

      if (checked) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: [...prevFormData[name], value],
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: prevFormData[name].filter((id) => id !== value),
        }));
      }
    } else {

      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/Project/CreateProject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data, "hello")

    } catch (error) {

    }

    console.log(formData);
  };
  const userData = useGetAllUserData();
  console.log(userData, "hello user")
  const handleUserClick = (userId) => {
  };

  return (
    <form onSubmit={handleSubmit} className=" flex flex-wrap justify-center border-2 border-solid border-gray-400 p-10 shadow-lg rounded-lg ">
     
    <div>
    <div className='font-bold flex justify-center text-3xl text-blue-700 underline'><div> Create Project</div> </div> 
    <div>
        <label htmlFor="name" className="block mb-2">Project Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mb-4" />
      </div>
      <div>
        <label htmlFor="description" className="block mb-2">Description:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" cols="50" required className="w-full p-2 border border-gray-300 rounded mb-4"></textarea>
      </div>

      <div>
        <label htmlFor="startDate" className="block mb-2">Start Date:</label>
        <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mb-4" />
      </div>

      <div>
      <label htmlFor="endDate" className="block mb-2">End Date:</label>
      <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mb-4" />
      </div>

      <div>
      <label htmlFor="priority" className="block mb-2">Priority:</label>
      <select id="priority" name="priority" value={formData.priority} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded mb-4">
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      </div>

      <div>
      <label htmlFor="teamMembers" className="block mb-2">Team Members:</label>
      <div className="flex flex-wrap gap-5">
        {userData && userData.map((user) => (
          <div key={user._id} className="flex items-center justify-between ">
            <div className=''>
              <input
                type="checkbox"
                id={user.id}
                name="teamMembers"
                value={user.email}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label htmlFor={user.id} className="ml-2">{user.username}</label>
            </div>
            <div>
              <Button outline type="button" onClick={() => handleUserClick()} className="mt-2">
                View User Details
              </Button>
            </div>
          </div>
        ))}
      </div>
      </div>

      <div>
      <label htmlFor="notes" className="block mb-2">Notes:</label>
      <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows="4" cols="50" className="w-full p-2 border border-gray-300 rounded mb-4"></textarea>

     </div>
     <input type="submit" value="Create Project" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer" />
    </div>
     
    </form>
  );
};

export default ProjectForm;
