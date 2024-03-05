import React, { useState } from 'react';
import AdminPageUser from '../components/AdminPageUser';
import HeaderAdmin from '../components/HeaderAdmin';
import { Button } from 'flowbite-react';
import AddManager from '../components/AddManager';
import ShowManager from '../components/ShowManager';

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
        <div><AddManager/></div>
      </div>
      {/* <div>
        <AdminPageUser search={search} sortBy={sortBy} />
      </div> */}
     <div className='w-full border-2px border-solid border-red-700'>
     <ShowManager/>
     </div>
    </div>
  );
};

export default AdminHome;
