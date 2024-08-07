import React, { useState } from 'react';
import AdminPageUser from '../components/AdminPageUser';
import HeaderAdmin from '../components/HeaderAdmin';
import { Button } from 'flowbite-react';
import AddManager from '../components/AddManager';
import ShowManager from '../components/ShowManager';
import Piechart from '../components/PieChart';
import ShowUser from '../components/ShowUser';
import SignUp from './UserSignUp';
import teamImg from "../assest/team3.png"
import HiiHand from "../assest/handHii.gif"
import AdminProfile from "../assest/AdminProfile.png"
import AdminProjectUI from '../components/AdminProjectUI';


const AdminHome = () => {
    const [sortBy, setSortBy] = useState('');
    const [search, setSearch] = useState('');
    const [sortByMng, setSortByMng] = useState('');
    const [searchMng, setSearchMng] = useState('');
    const [isManager, setManager] = useState("false")
    const [email,setEmail]=useState(null)
    const [searchUser,setSearchUser]=useState('')


    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    };
    const handleSortChangeMng = (e) => {
        setSortByMng(e.target.value);
    };

    const handleChangeSearchMng = (e) => {
        setSearchMng(e.target.value);
    };
  
        const multicolorStyle = {
          backgroundImage: 'linear-gradient(45deg, #FF5733, #FFBD33, #33FF57, #337BFF)',
          WebkitBackgroundClip: 'text',
          color: 'transparent'
        }
       

    return (
        <div className=''>
            <div><HeaderAdmin /></div>
            <div className='md:flex justify-between m-4 gap-10 '>
                <div>
                    <div className='shadow-lg bg-slate-700 rounded-lg'>
                        <div className='flex justify-between px-5'>
                            <img src={HiiHand} className='h-28' alt='hii' />
                            <div className='text-xl md:text-2xl text-nowrap mt-10' style={multicolorStyle}>
                                Hii, Admin
                            </div>
                            <img src={AdminProfile} className='h-28' alt='AdminProfile' />
                        </div>
                    </div>
                    <div className='shadow-lg'>
                       <div>
                       <div className='flex m-5 justify-between h-10 gap-10'>
                    
                            <input onChange={(e)=>setSearchUser(e.target.value)} className='w-80' type='text' placeholder='Search here'/>
                          
                            <Button outline className='text-nowrap' onClick={() => setManager(!isManager)}>
                            {
                                isManager?"View Employees":"View Manager"
                            }
                            </Button>
                            <div>
                                {
                                    isManager?<AddManager/>:<SignUp/>
                                }
                            </div>
                            
                            </div>
                        
                           
                      
                            <div className=''>
                            {
                                isManager ? <ShowManager setEmail={setEmail} searchData={searchUser} /> : <ShowUser setEmail={setEmail} searchData={searchUser} />
                            }
                        </div>
                        </div>
                    </div>
                </div>
            <div className='w-full md:rounded-lg text-black w-1/2'>
            <AdminProjectUI searchData={searchUser}  isManager={isManager} email={email}/> 
            </div>
            </div>
        </div>
    );
};

export default AdminHome;
