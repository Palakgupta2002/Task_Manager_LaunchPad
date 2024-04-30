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
        <div className='overflow-hidden '>
            <div><HeaderAdmin /></div>
            <div className='flex justify-between m-4 gap-10 overflow-hidden'>
                <div>
                    <div className='shadow-lg bg-slate-700 rounded-lg'>
                        <div className='flex justify-between px-5'>
                            <img src={HiiHand} className='h-28' alt='hii' />
                            <div className='text-2xl text-nowrap mt-10' style={multicolorStyle}>
                                Hii, Admin
                            </div>
                            <img src={AdminProfile} className='h-28' alt='AdminProfile' />
                        </div>
                    </div>
                    <div className='shadow-lg'>
                       <div>
                       <div className='flex m-5 justify-between h-10 gap-10'>
                    
                            <input className='w-80' type='text' placeholder='Search'/>
                          
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
                        
                           
                      
                            <div className='overflow-hidden'>
                            {
                                isManager ? <ShowManager setEmail={setEmail} /> : <ShowUser setEmail={setEmail} />
                            }
                        </div>
                        </div>
                    </div>
                </div>
            <div className='rounded-lg text-black w-1/2'>
            <AdminProjectUI isManager={isManager} email={email}/> 
            </div>
            </div>
        </div>
    );
};

export default AdminHome;
