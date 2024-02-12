import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EmailContext } from '../App';

const AdminLogin = () => {
  const { setAdminLog } = useContext(EmailContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    adminEmail: '',
    password: ''
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await fetch('http://localhost:5000/admin/Adlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Redirect or handle successful login
        setLoading(false)
        setAdminLog(true)
        navigate('/AdminHome')

        // console.log('Login successful');
      } else {
        // Handle failed login
        setErrorMessage("invalid username or password")
        setLoading(false)

        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      setErrorMessage("invalid username or password")
      setLoading(false)
      console.error('Error logging in:', error);
    }
    setLoading(false)

  };

  return (
    <div className="min-h-screen items-center flex pt-10 justify-center bg-gray-50  sm:px-6 lg:px-8">

      {/* <div className="max-w-md w-full space-y-8">
      <div className=" flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white ml-21">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
         Task Manager
        </div>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="adminEmail" className="sr-only">Admin Email</label>
              <input
                id="adminEmail"
                name="adminEmail"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Admin Email"
                value={formData.adminEmail}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign In
            </button>
          </div>
        </form>
      </div> */}
      <div>
        <div>
          <div className=" flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white ml-20">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            Task Manager
          </div>
        </div>
        <div>
          <div className="bg-white shadow-md rounded-md p-6">
            <div>
              <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 w-80">Admin </h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mt-5">
                  <label htmlFor="adminEmail" className="sr-only">Admin Email</label>
                  <input
                    id="adminEmail"
                    name="adminEmail"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full mt-6 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Admin Email"
                    value={formData.adminEmail}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full mt-6 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <h3 className='text-red-700 mt-2'>{errorMessage}</h3>
                <button type="submit" disabled={loading} className="group relative w-full flex justify-center mt-6 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {
                    loading ?
                      "Loading" : "Login"
                  }
                </button>
              </div>
            </form>
            <div className='flex justify-around mt-3 text-blue-600'>
              <Link to='/signIn'><h1>User login</h1></Link>
              <Link to='/'><h1>Sign up as user</h1></Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
