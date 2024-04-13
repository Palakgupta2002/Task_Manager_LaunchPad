import React, { useEffect, useState } from 'react'
import { Table } from "flowbite-react";
import { useParams } from 'react-router-dom';

const ShowUserDetails = () => {
    const [user, setUser] = useState([])
    const { email } = useParams();
    const fetchApiFun = async () => {
        try {
            const fetchApi = await fetch(`http://localhost:5000/user/users/${email}`)
            if (fetchApi.ok) {
                const apiJson = await fetchApi.json();
                setUser(apiJson)
                console.log(apiJson, "hello");
            }

        } catch (err) {
            console.error(err)
        }
    }
    useEffect(() => {
        fetchApiFun()
    }, [])
    return (
        <div className="overflow-x-auto">
            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>Project Name</Table.HeadCell>
                    <Table.HeadCell>Description</Table.HeadCell>
                    <Table.HeadCell>Start Date</Table.HeadCell>
                    <Table.HeadCell>End Date</Table.HeadCell>
                    <Table.HeadCell>Priority</Table.HeadCell>
                    <Table.HeadCell>Team Members</Table.HeadCell>
                    <Table.HeadCell>Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        user && user?.projects?.map((ele,index)=>(
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {ele.name}
                        </Table.Cell>
                        <Table.Cell>{ele.description}</Table.Cell>
                        <Table.Cell>{ele.startDate.slice(0,10)}</Table.Cell>
                        <Table.Cell>{ele.endDate}</Table.Cell>
                        <Table.Cell>{ele.priority}</Table.Cell>
                        <Table.Cell>{ele.teamMembers}</Table.Cell>
                        <Table.Cell>See deatils</Table.Cell>

                    </Table.Row>

                        ))
                    }
                </Table.Body>
            </Table>
        </div>
    )
}

export default ShowUserDetails