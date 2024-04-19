import React, { useContext } from 'react'
import UserData from '../CustomHooks/UserData'
import { EmailContext } from '../App';
import useUserData from '../CustomHooks/UserData';
import { Link } from 'react-router-dom';
import Profile from '../components/Profile';
import Header from '../components/Header';
import TaskMap from '../components/TaskMap';
import ChatFunctionality from '../components/ChatFunctionality';
import ShowUserDetails from '../components/ShowUserDetails';
import developer from "../assest/EmployeeProfile.png"
import hiiHand from "../assest/handHii.gif"
import Card from '../components/Card';

const Home = () => {
  // console.log(UserData,"hello")
  const Email = localStorage.getItem("Email"); 
  const email = JSON.stringify(Email);
  const unquotedEmail = email.substring(1, email.length - 1);

  const userData = useUserData(unquotedEmail);
  console.log(unquotedEmail,"hello userdata")
  return (
    <div>
   <Header/>
   <div className='flex'>
    <div ><img className='h-40' src={developer} alt='developerImage'/></div>
    <div><img className='h-40' src={hiiHand} alt='developerImage'/></div>
    <div className='mt-16 text-3xl'>Welcome   {userData?.username},How are you??</div>
    <Card title={"Total Number of Projects"} count={userData?.projects.length} />
   </div>
    <ShowUserDetails/>
     </div>
   
  )
}

export default Home