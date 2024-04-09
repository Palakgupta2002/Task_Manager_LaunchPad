import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './Pages/UserSignIn';
import SignUp from './Pages/UserSignUp';
import Home from './Pages/UserHome';
import AdminLogin from './Pages/AdminLogin';
import AdminHome from './Pages/AdminHome';
import UserDetails from './Pages/UserDetails';
import ManagerHome from './Pages/ManagerHome';
import ViewManagerDetails from './components/ViewManagerDetails';
import ProjectDetails from './components/ProjectDetails';

const Body = () => {
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem("Email"));
  const isadmin = localStorage.getItem("adminLog"); 

  const handleSignOut = () => {
    localStorage.removeItem("Email");
    localStorage.removeItem("token");
    setAuthenticated(false);
  };

  return (
    <div className='background'>
      <BrowserRouter>
        <Routes>
          {authenticated && isadmin==="false"  ? (
            <>
              <Route path="/" element={<Navigate to="/ManagerHome" />} />
              <Route path="/Home" element={<Home />} />
              <Route path='/ManagerHome' element={<ManagerHome />} />
              <Route path='/Projectdetails/:id' element={<ProjectDetails />} />
            </>
          ) : (
            <>
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/" element={<SignIn />} />
              <Route path="/AdminLogin" element={<AdminLogin />} />
              <Route path="/AdminHome" element={<AdminHome />} />
              <Route path="/adUserVisit/:email" element={<UserDetails />} />
              <Route path='/viewManager/:id' element={<ViewManagerDetails />} />
              <Route path='/Projectdetails/:id' element={<ProjectDetails />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Body;
