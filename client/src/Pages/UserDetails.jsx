import React from 'react';
import { useParams } from 'react-router-dom';
import useUserData from '../CustomHooks/UserData';
import TaskCard from '../components/TasksCard';
import TaskMap from '../components/TaskMap';
import HeaderAdmin from '../components/HeaderAdmin';

const UserDetails = () => {
    const { email } = useParams();
    const userData = useUserData(email);

    return (
        <div>
            {/* Render user details here */}
            <HeaderAdmin/>
            {userData && (
                <div>
                    <h2>{userData.username}</h2>
                    <p>{userData.email}</p>
                    
                </div>
            )}
            <TaskMap userData={userData}/>
        </div>
    );
};

export default UserDetails;
