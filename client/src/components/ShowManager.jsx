import React, { useEffect, useState } from 'react'
import ViewManagerDetails from './ViewManagerDetails';
import { Link } from 'react-router-dom';

const ShowManager = () => {
    const [managers, setManagers] = useState([]);

    const fetchManagers=async ()=>{
        try{
            const response=await fetch("http://localhost:5000/ManagerData/");
            if(!response.ok){
                throw new Error('Failed to fetch managers');
            }
            const data = await response.json();
            setManagers(data);
        }
        catch(error){
            console.error('Error fetching managers:', error);
        }

    }
    useEffect(() => {
        fetchManagers(); // Fetch managers when component mounts
      }, [managers]);
  return (
    <div className=''>
    <h2 className='bg-blue-800 text-center text-white text-2xl'>All Managers</h2>
    <table className=' w-full'>
      <thead className=' mt-4'>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {managers?.map(manager => (
          <tr  className='border-2 border-solid border-gray-700 text-center mt-5' key={manager?._id}>
            <td>{manager?.MUniqueID}</td>
            <td>{manager?.Musername}</td>
            <td>{manager?.Memail}</td>
            <td>
              <Link to={`/viewManager/${manager._id}`}>
                    <button className="text-blue-500 hover:text-blue-700">See Details</button>
                </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default ShowManager