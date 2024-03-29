import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useContext } from 'react';
import './App.css';
import SignIn from './Pages/UserSignIn';
import SignUp from './Pages/UserSignUp';
import Home from './Pages/UserHome';
import AdminLogin from './Pages/AdminLogin';
import AdminHome from './Pages/AdminHome';
import UserDetails from './Pages/UserDetails';
import { EmailContext } from './App';
import ManagerHome from './Pages/ManagerHome';
import ViewManagerDetails from './components/ViewManagerDetails';
import ProjectDetails from './components/ProjectDetails';

const Body = () => {
  const { email ,adminLog} = useContext(EmailContext); // Use useContext correctly
 

  return (
    <div className='background '>
      <BrowserRouter>
        <Routes>
          {email ? (
            <>
              <Route path="/" element={<Navigate to="/Home" />} />
              <Route path="/Home" element={<Home />} />
              <Route path='/ManagerHome' element={<ManagerHome/>} />
              <Route path='/Projectdetails/:id' element={<ProjectDetails/>}/>
            </>
          ) : (
            <>
              <Route path="/" element={<SignUp />} />
              <Route path="/signIn" element={<SignIn />} />
              {adminLog ? (
                <>
                  <Route path="/AdminHome" element={<AdminHome />} />
                  <Route path="/adUserVisit/:email" element={<UserDetails />} />
                  <Route path='/viewManager/:id' element={<ViewManagerDetails/>}/>
                </>
              ) : (
                <Route path="/AdminLogin" element={<AdminLogin />} />
              )}
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Body;
