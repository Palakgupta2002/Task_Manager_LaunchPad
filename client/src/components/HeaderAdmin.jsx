import React from 'react';

const HeaderAdmin = () => {
  return (
    <div className='w-full flex justify-between bg-blue-300 text-grey p-4 shadow-lg'>
       <div className="flex items-center  text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
         Task Manager
        </div>
        <div className='flex gap-5 text-xl'>
            <div>Logout</div>
            <div>Profile</div>

        </div>
    </div>
  );
};

export default HeaderAdmin;
