
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import React, { createContext, useState } from 'react';
import './App.css';
import SignIn from './Pages/UserSignIn';
import SignUp from './Pages/UserSignUp';
import Home from './Pages/UserHome';
import AdminLogin from './Pages/AdminLogin';

export const EmailContext = createContext();


function App() {
  const [email, setEmail] = useState('');
  return (
    <EmailContext.Provider value={{ email, setEmail }}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<SignUp/>} />
      <Route path='/signIn' element={<SignIn/>}/>
      <Route path='/Home' element={<Home/>}/>
      <Route path='/AdminLogin' element={<AdminLogin/>}/>
    </Routes>
    </BrowserRouter>
    </EmailContext.Provider>
  );
}

export default App;
