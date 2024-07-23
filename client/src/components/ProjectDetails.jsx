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
    const isUser = localStorage.getItem("userLog");

   


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
                const response = await fetch(`https://task-manager-launchpad.onrender.com/Project/getProjectDetails/${id}`);
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
    const getRandomColor = () => {
        const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'purple'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    return (
        <div className='overflow-y-hidden'>
            {isadmin === "true" ? <HeaderAdmin /> : <Header />}
            <div className='flex  border-b-2 border-solid border-slate-700 justify-between'>
                <div className=' p-5'>
                    <div className='text-2xl'>Welcome,{projectData?.name} Project DashBoard</div>
                </div>
                <div className='md:mt-5 flex justify-end' >
                    {projectData && projectData.teamMembers && projectData.teamMembers.map((member, index) => (
                        <div key={index}>

                            <button onClick={() => handleviewDetails(member)}>
                                <div  className='h-10 w-10 border-solid border-2 border-white text-white rounded-3xl flex justify-center' style={{ backgroundColor: getRandomColor() }}>
                                    <h2>{member.slice(0, 2)}</h2>
                                </div>
                            </button>


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
                                                {isUser==="true"?"":<AddTask email1={userData.email} projectId={projectData._id} />}
                                            </div>
                                        )}
                                    </Modal.Body>
                                </Modal>
                            </>

                        </div>
                    ))}
                </div>

            </div>

            {projectData?.tasks && projectData?.tasks?.length > 0 ? (
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
