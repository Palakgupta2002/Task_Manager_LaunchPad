import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import CreateProject from '../components/CreateProject'
import useManagerData from '../CustomHooks/GetManager'
import ProjectData from '../components/ProjectData'
import managerProfile from "../assest/ManagerProfile.png"
import Card from '../components/Card'

import "../App.css"

const ManagerHome = () => {
const Email = localStorage.getItem("Email"); 
const email= JSON.stringify(Email);
const unquotedEmail = email.substring(1, email.length - 1);
const [projectCount,setProjectCount]=useState(0)
const[taskCount,setTaskCount]=useState(0)


  const managerData = useManagerData(unquotedEmail)
  console.log(managerData,"hello")

  const [graphicalView, setGraphicalView] = useState(false)

  return (
    <div className=''>

      <Header />
     
      
         <div className='flex justify-between border-2 border-solid border-slate-300'>
         <div className='flex' >
                                <div><img className='h-32' src={managerProfile} alt='Profile photo'/></div>
                                <div className=''>
                                    <div className='text-2xl mt-10'>Welcome in  {managerData?.Musername} Dashboard</div>
                                </div>
                                <Card title={"Total Number of Projects"}count={projectCount} />
                               <Card title={"Total Number of Tasks"}count={taskCount} /> 
                            </div>
         <div className='mt-10'>
         <CreateProject />
         </div>
        </div>
    

      <ProjectData email={unquotedEmail}setProjectCount={setProjectCount} setTaskCount={setTaskCount}/>


    </div>
  )
}

export default ManagerHome