import { Button } from 'flowbite-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HeaderAdmin = () => {
  const navigate=useNavigate()
  
  const handleEmailValue=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("adminLog");
    localStorage.removeItem("userLog");
    window.location.reload();
    navigate('/')
   
}
  return (
    <div className='w-full flex justify-between bg-gray-800 text-grey p-4 shadow-lg'>
       <Link to="/AdminHome">
       <div className="flex items-center  text-2xl font-semibold text-white dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
         Task Manager
        </div>
       </Link>
        <div className='flex gap-5 text-xl'>
        <Link to="/AdminLogin">
         <Button outline gradientDuoTone="purpleToBlue" onClick={handleEmailValue}>
            Sign out
          </Button>
          </Link>
          
        </div>
    </div>
  );
};

export default HeaderAdmin;
