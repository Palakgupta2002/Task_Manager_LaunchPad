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
import ShowUserDetails from './components/ShowUserDetails';

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
          {authenticated ? (
            <>
              <Route key='/Home' path="/" element={<Navigate to="/Home" />} />
              <Route key='/Home/:email' path="/Home/:email" element={<Home />} />
              <Route  key='/ManagerHome' path='/ManagerHome' element={<ManagerHome/>} />
              <Route key='/Projectdetails/:id' path='/Projectdetails/:id' element={<ProjectDetails/>}/>
              <Route key='/UserDetails/:email' path='/UserDetails/:email' element={<ShowUserDetails/>} />
            </>
          ) : (
            <>
              <Route key='/SignUp' path="/SignUp" element={<SignUp />} />
              <Route key='/' path="/" element={<SignIn />} />
              {isadmin ? (
                <>
                  <Route key='/AdminHome' path="/AdminHome" element={<AdminHome />} />
                  <Route key='/adUserVisit/:email' path="/adUserVisit/:email" element={<UserDetails />} />
                  <Route key='/viewManager/:id' path='/viewManager/:id' element={<ViewManagerDetails/>}/>
                  <Route key='/Projectdetails/:id' path='/Projectdetails/:id' element={<ProjectDetails/>}/>
                  <Route key='/UserDetails/:email' path='/UserDetails/:email' element={<ShowUserDetails/>} />
                </>
              ) : (
                <Route key='/AdminLogin' path="/AdminLogin" element={<AdminLogin/>} />
              )}
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Body;
