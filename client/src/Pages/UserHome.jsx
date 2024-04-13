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
    <ShowUserDetails/>
     </div>
   
  )
}

export default Home