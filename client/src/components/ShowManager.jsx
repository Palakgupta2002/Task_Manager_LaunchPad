import React, { useEffect, useState } from 'react'
import ViewManagerDetails from './ViewManagerDetails';
import { Link } from 'react-router-dom';
import { Table } from 'flowbite-react';

const ShowManager = () => {
    const [managers, setManagers] = useState([]);

    const fetchManagers=async ()=>{
        try{
            const response=await fetch("http://localhost:5000/ManagerData/");
            if(!response.ok){
                throw new Error('Failed to fetch managers');
            }
            const data = await response.json();
            console.log(data)
            setManagers(data?.managers);
        }
        catch(error){
            console.error('Error fetching managers:', error);
        }

    }
    useEffect(() => {
        fetchManagers(); // Fetch managers when component mounts
      }, []);
  return (
    <div className=''>
    <h2 className='bg-blue-800 text-center text-white text-2xl'>All Managers</h2>
    {/* <table className=' w-full'>
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
    </table> */}.
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Address</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {/* <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {'Apple MacBook Pro 17"'}
            </Table.Cell>
            <Table.Cell>Sliver</Table.Cell>
            <Table.Cell>Laptop</Table.Cell>
            <Table.Cell>$2999</Table.Cell>  
          </Table.Row> */}
           {managers?.map(manager => (
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={manager?._id}>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{manager?.MUniqueID}</Table.Cell>
            <Table.Cell>{manager?.Musername}</Table.Cell>
            <Table.Cell>{manager?.Memail}</Table.Cell>
            <Table.Cell>
              <Link to={`/viewManager/${manager.Memail}`}>
                    <button className="text-blue-500 hover:text-blue-700">See Details</button>
                </Link>
            </Table.Cell>
          </Table.Row>
        ))}
        </Table.Body>
      </Table>
    </div>
    
  </div>
  )
}

export default ShowManager