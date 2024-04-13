import React, { useState } from 'react';
import AdminPageUser from '../components/AdminPageUser';
import HeaderAdmin from '../components/HeaderAdmin';
import { Button } from 'flowbite-react';
import AddManager from '../components/AddManager';
import ShowManager from '../components/ShowManager';
import Piechart from '../components/PieChart';
import ShowUser from '../components/ShowUser';
import SignUp from './UserSignUp';

const AdminHome = () => {
  const [sortBy, setSortBy] = useState('');
  const [search, setSearch] = useState('');


  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <HeaderAdmin />


      <div className='w-full border-2px border-solid border-red-700 flex justify-center gap-10 mt-10 shadow-lg overflow-hidden '>
        <div className='border-2 border-solid border-gray-200 rounded-lg'>
          <div className='flex p-5 gap-6'>
            <div className='relative'>
              <input
                type='text'
                className='w-full border border-gray-300 rounded-lg py-2 px-4 outline-none shadow-sm'
                placeholder='Search...'
                value={search}
                onChange={handleChangeSearch}
              />

            </div>

            <div>
              <select
                className='border border-gray-300 rounded-lg py-2 px-4 outline-none shadow-sm'
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value=''>Sort By Name</option>
                <option value='Asc'>Ascending</option>
                <option value='Dsc'>Descending</option>

              </select>

            </div>
            <div><AddManager /></div>
          </div>
          <ShowManager />

        </div>
        <div className='border-2 border-solid border-gray-200 rounded-lg'>
          <div className='flex p-5 gap-6'>
            <div className='relative'>
              <input
                type='text'
                className='w-full border border-gray-300 rounded-lg py-2 px-4 outline-none shadow-sm'
                placeholder='Search...'
                value={search}
                onChange={handleChangeSearch}
              />

            </div>

            <div>
              <select
                className='border border-gray-300 rounded-lg py-2 px-4 outline-none shadow-sm'
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value=''>Sort By Name</option>
                <option value='Asc'>Ascending</option>
                <option value='Dsc'>Descending</option>

              </select>

            </div>
            <div><SignUp /></div>
          </div>
          <ShowUser/>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
