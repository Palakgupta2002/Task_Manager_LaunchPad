import React from 'react'
import useGetAllUserData from '../CustomHooks/GetAllUser';
import UserChat from './UserChat';

const ChatFunctionality = () => {
    const userData = useGetAllUserData();
  return (
    <div>
        {
                userData && userData.map((ele)=>(
                    <UserChat key={ele.id} user={ele} />
                ))
            }
            
    </div>
  )
}

export default ChatFunctionality