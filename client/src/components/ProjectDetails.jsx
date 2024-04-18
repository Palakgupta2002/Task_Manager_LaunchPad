import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useUserData from '../CustomHooks/UserData';
import { Button, Modal } from 'flowbite-react';
import AddTask from './AddTask';
import KanbanBoard from './KanbanBoard';
import HeaderAdmin from './HeaderAdmin';
import Header from './Header';
import emptyBoxImg from "../assest/unfortunately.png"
import { Div } from 'nunjucks/src/nodes';

const ProjectDetails = () => {
    const [projectData, setProjectData] = useState({});
    const [useremail, setuseremail] = useState(null)
    const [openModal, setOpenModal] = useState(false);
    const { id } = useParams();
    const userData = useUserData(useremail)
    const isadmin = localStorage.getItem("adminLog");

    console.log(typeof (admin), "'hello admin")
    

    console.log(userData, "hello userdata")
    const handleviewDetails = (email) => {
        setuseremail(email)
        setOpenModal(true)
    }
    let initials = '';
    if (userData && userData.username) {
        initials = userData.username.substring(0, 2).toUpperCase();
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/Project/getProjectDetails/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data.projectDetails[0], "Received project details");
                    console.log("hello")
                    // if (data.projectDetails && data.projectDetails.length > 0) {
                    //     setProjectData(data.projectDetails[0]);
                    // }
                    setProjectData(data.projectDetails[0]);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

        return () => {
            // Cleanup function if necessary
        };
    }, [id]);

    return (
        <div className='overflow-y-hidden'>
            {isadmin === "true" ? <HeaderAdmin /> : <Header />}
            <div className='flex border-b-2 border-solid border-slate-700'>
            <div className=' p-5'>
                    <div className='text-2xl'>Welcome,{projectData?.name} Project DashBoard</div>
                </div>
                {projectData && projectData.teamMembers && projectData.teamMembers.map((member, index) => (
                    <div className='flex'>
                        <div key={index}>{member}</div>
                        <Button onClick={() => handleviewDetails(member)}>view details</Button>

                        <>
                            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                                <Modal.Header>Employee Details</Modal.Header>
                                <Modal.Body>
                                    {userData && (
                                        <div className='flex justify-center items-center mt-3'>
                                            <div>
                                                <div >
                                                    <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center m-2">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-20 h-20 text-gray-600">
                                                            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="18" fill="currentColor">{initials}</text>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div>{userData.email}</div>
                                            </div>
                                            <AddTask email1={userData.email} projectId={projectData._id} />
                                        </div>
                                    )}
                                </Modal.Body>
                            </Modal>
                        </>

                    </div>
                ))}
               
            </div>

            {projectData.tasks && projectData?.tasks?.length > 0 ? (
                <KanbanBoard projectData={projectData} />
            ) : (
                <div className='flex justify-center h-auto'>
                    <div>
                        <div className='text-center text-2xl'>Sorry, We don't found any Result</div>
                        <img className='h-30' src={emptyBoxImg} alt="Sorry, We don't found any result" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;
