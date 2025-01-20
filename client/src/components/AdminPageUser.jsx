import React from 'react';
import useGetAllUserData from '../CustomHooks/GetAllUser';
import UsersCard from './UsersCard';
import Piechart from './PieChart';

const AdminPageUser = ({search,sortBy}) => {
    const userData = useGetAllUserData(search, sortBy);
 
    return (
        <div className='flex flex-wrap m-8 gap-5'>
            {
                userData && userData.map((ele)=>(
                    <UsersCard key={ele.id} user={ele} />
                ))
            }
            
        </div>
    );
};

export default AdminPageUser;
