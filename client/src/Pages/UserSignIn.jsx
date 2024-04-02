import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EmailContext } from '../App';
import UiImage from "../assest/toolfrontend.png"

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Access setEmail function from EmailContext
  const { setEmail } = useContext(EmailContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMessage(null);
      
      const uniqueId = document.getElementById("unique-id").value;
      const email = document.getElementById("email").value;
      const password = formData.password;
    
      let apiUrl = '';
      let bodyData = {};
    
      if (uniqueId.includes("manager")) {
        apiUrl = `http://localhost:5000/ManagerData/login`;
        bodyData = { Memail: email, Mpassword: password };
      } else if (uniqueId.includes("user")) {
        apiUrl = 'http://localhost:5000/login/signIn'; 
        bodyData = { email, password };
      } else {
        setErrorMessage("Invalid unique id");
        setLoading(false);
        return;
      }
    
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });
    
      const data = await res.json();
      if (res.ok) {
        // Handle success
        setEmail(email);
       if(uniqueId.includes("user"))
       {
        navigate('/Home');
       }
       else{
        navigate('/ManagerHome')
       }
        console.log('Sign-in successful');
        alert("Sign In successfully");
      } else {
        // Handle error
        setErrorMessage(data.message);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
      setLoading(false);
    }
  };
  
  
  

  return (
    <div className="mt-20">
       <div className=" flex justify-center items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white ">
          <img className="w-8 h-8 " src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Task Manager
        </div>
    <div className='flex justify-center  '>
    <div>
        <div className='bg-white shadow-md rounded-md  max-w-md mx-auto p-6'>
          <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="unique-id" className="block text-sm font-medium text-gray-700">Unique id:</label>
              <input
                type="text"
                id="unique-id"
                name="unique-id"
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:text-black"
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>
          </form>
          <div className=''>
            <Link to="/AdminLogin">
              <button className='text-blue-600'>
                Login as Admin
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className='shadow-md'>
        <img src={UiImage} alt='uiImage'/>
      </div>
    </div>

    </div>
  );
};

export default SignIn;
