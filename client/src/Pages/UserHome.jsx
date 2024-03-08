import React, { useContext } from 'react'
import UserData from '../CustomHooks/UserData'
import { EmailContext } from '../App';
import useUserData from '../CustomHooks/UserData';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import Header from '../components/Header';
import TaskMap from '../components/TaskMap';
import ChatFunctionality from '../components/ChatFunctionality';

const Home = () => {
  // console.log(UserData,"hello")
  const { email } = useContext(EmailContext); 
  const userData = useUserData(email);
  return (
    <div>
   <Header/>
     <div className='flex'>
     <div className='flex h-fit '>
      {/* <TaskMap userData={userData} /> */}
      {userData?.username}
     </div>
     {/* <div className='border-2 border-solid border-red-500 p-10'>
        <ChatFunctionality/>
        </div> */}
     </div>
    </div>
  )
}

export default Home