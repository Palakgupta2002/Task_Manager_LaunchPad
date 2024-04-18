import React, { useEffect, useState } from 'react'
import ViewManagerDetails from './ViewManagerDetails';
import { Link } from 'react-router-dom';
import { Table } from 'flowbite-react';

const ShowManager = ({setEmail}) => {
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
    <div className='' style={{ maxHeight: '300px', overflowY: 'auto' }}>
    <h2 className='bg-slate-700 text-center text-white text-2xl'>All Managers</h2>
    
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
           {managers?.map(manager => (
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={manager?._id}>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{manager?.MUniqueID}</Table.Cell>
            
            <Table.Cell>{manager?.Memail}</Table.Cell>
            <Table.Cell>
              {/* <Link to={`/viewManager/${manager.Memail}`}> */}
                    <button onClick={()=>setEmail(manager.Memail)} className="text-blue-500 hover:text-blue-700">See Details</button>
                {/* </Link> */}
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