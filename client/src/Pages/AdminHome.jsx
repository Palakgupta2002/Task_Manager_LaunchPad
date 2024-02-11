import React from 'react'
import AdminPageUser from '../components/AdminPageUser'
import HeaderAdmin from '../components/HeaderAdmin'
// import { FaBeer } from "react-icons/fa";
const AdminHome = () => {
  return (
    <div>
      <HeaderAdmin />
      <div className='flex p-5 gap-6'>
        <div className='relative'>
          <input
            type='text'
            className='w-full border border-gray-300 rounded-lg py-2 px-4 outline-none shadow-sm'
            placeholder='Search...'
          />
          <button className='absolute right-0 top-0 h-full px-4 text-gray-600 focus:outline-none'>
           {/* <FaBeer/> */}
           search
          </button>
        </div>

        <div>select option</div>
      </div>
      <div>
        <AdminPageUser />
      </div>
    </div>
  )
}

export default AdminHome