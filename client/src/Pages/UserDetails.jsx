import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useUserData from '../CustomHooks/UserData';
import TaskMap from '../components/TaskMap';
import HeaderAdmin from '../components/HeaderAdmin';
import AddTask from "../components/AddTask";


const UserDetails = () => {
    const param= useParams();
    
    const userData = useUserData(param?.email); 
   
    let initials = '';
    if (userData && userData.username) {
        initials = userData.username.substring(0, 2).toUpperCase();
    }

    return (
        <div>
            <HeaderAdmin />
            
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
                </div>
            )}
            <div className='flex justify-center items-center text-3xl mt-6'><h1> All Tasks</h1></div>
            {userData?.email && <AddTask email1={userData.email} />}
            <TaskMap userData={userData} />
        </div>
    );
};

export default UserDetails;
