import React, { useEffect, useState } from 'react';
import { Table } from "flowbite-react";
import { Link } from 'react-router-dom';

const ShowUser = ({setEmail,searchData}) => {
    const [user, setUser] = useState([]);
    const [filterUser,setFilterUser]=useState([])

    const fetchDataFun = async () => {
        try {
            const fetchAPI = await fetch("https://task-manager-launchpad.onrender.com/user/");
            if (fetchAPI.ok) {
                const jsonData = await fetchAPI.json()
                setUser(jsonData?.user)
                setFilterUser(jsonData?.user);
                console.log("successful data comes", jsonData.user)
            }
        }
        catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchDataFun()
    }, []);
    useEffect(() => {
        if (searchData) {
            const filteredData = user?.filter(manager => 
                manager?.UserUniqueID?.toLowerCase()?.includes(searchData.toLowerCase())
            );
            setFilterUser(filteredData);
        } else {
            setFilterUser(user);
        }
    }, [searchData, user]);


    return (
        <div className='bg-slate-700 '>
            <div className='flex justify-center m-2 text-white text-2xl'><h2>All Employee</h2></div>
            <Table>
                <Table.Head>
                    <Table.HeadCell>UserId</Table.HeadCell>
                    <Table.HeadCell>Email</Table.HeadCell>
                    <Table.HeadCell>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y bg-slate-600">
                    {/* Map over user data and render table rows */}
                    {filterUser?.map((ele) => (
                        <Table.Row key={ele.UserUniqueID} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {ele.UserUniqueID}
                            </Table.Cell>
                            <Table.Cell>{ele.email}</Table.Cell>
                           
                            <Table.Cell>
                                {/* <Link to={`/UserDetails/${ele.email}`}> */}
                                    <button onClick={()=>setEmail(ele.email)} className="text-blue-500 hover:text-blue-700">See Details</button>
                                {/* </Link> */}
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}

export default ShowUser;
