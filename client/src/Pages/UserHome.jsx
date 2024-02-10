import React, { useContext } from 'react'
import UserData from '../CustomHooks/UserData'
import { EmailContext } from '../App';
import useUserData from '../CustomHooks/UserData';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import Header from '../components/Header';
import TaskMap from '../components/TaskMap';

const Home = () => {
  console.log(UserData,"hello")
  const { email } = useContext(EmailContext); 
  const userData = useUserData(email);
  console.log(userData,"hello")
  return (
    <div>
   <Header/>
     <div>
      <TaskMap userData={userData} />
     </div>
    </div>
  )
}

export default Home