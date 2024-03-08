import React, { useContext } from 'react'
import Header from '../components/Header'
import CreateProject from '../components/CreateProject'
import { EmailContext } from '../App'
import useManagerData from '../CustomHooks/GetManager'
import ProjectData from '../components/ProjectData'

const ManagerHome = () => {
  const {email} =useContext(EmailContext)
 const managerData=  useManagerData(email)
 console.log(managerData,"hello i am manager")
  return (
    <div>
        <Header/>
        <CreateProject/>
        {managerData?.Memail}<br/>
        sorting fun 
        analysing project progress (than goes in project see details and they can see a project name all task and whose they are assign which one task and how much numbers are task is completed and they can see a project )
        <ProjectData email={email}/>
    </div>
  )
}

export default ManagerHome