import { Button } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { EmailContext } from '../App';
import { useContext } from 'react';

const HeaderAdmin = () => {
  const {setAdminLog} =useContext(EmailContext)
  const handleEmailValue=()=>{
   
     setAdminLog(false)
}
  return (
    <div className='w-full flex justify-between bg-blue-300 text-grey p-4 shadow-lg'>
       <Link to="/AdminHome">
       <div className="flex items-center  text-2xl font-semibold text-gray-900 dark:text-white">
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
