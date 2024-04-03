import React, { useContext, useState } from 'react'
import Header from '../components/Header'
import CreateProject from '../components/CreateProject'
import { EmailContext } from '../App'
import useManagerData from '../CustomHooks/GetManager'
import ProjectData from '../components/ProjectData'
import filter from "../assest/filter.svg"
import "../App.css"
import { Button, Dropdown } from 'flowbite-react'
import ExampleComponent from '../components/Pagination'

const ManagerHome = () => {
  const { email } = useContext(EmailContext)
  const managerData = useManagerData(email)
  const [showFilter, setShowFilter] = useState(true)
  const [search, setSearch] = useState(true)
  const [priorityText, setPriorityText] = useState("All")
  const [orderText, setOrderText] = useState("Ascending")
  const [searchText, setSearchText] = useState(null)
  const [graphicalView, setGraphicalView] = useState(false)

  return (
    <div className=''>
      <Header setGraphicalView={setGraphicalView} graphicalView={graphicalView} />
      {/* {managerData?.Memail}<br/>
        sorting fun 
        analysing project progress (than goes in project see details and they can see a project name all task and whose they are assign which one task and how much numbers are task is completed and they can see a project ) */}
      <div className='flex justify-between m-10'>
        <div className='flex gap-10'>

          <div onClick={() => setShowFilter(!showFilter)} className='flex gap-4 text-lg font-bold text-blue-800' ><img className='-mt-4' width={"20px"} src={filter} alt='filterImage' /> <h2>Filter</h2></div>
          {
            showFilter ? "" :
              <div className='flex gap-10'>
                <div>
                  <Dropdown label={`${priorityText}`}>
                    <Dropdown.Item onClick={() => setPriorityText("All")}>All</Dropdown.Item>
                    <Dropdown.Item onClick={() => setPriorityText("High")}>High</Dropdown.Item>
                    <Dropdown.Item onClick={() => setPriorityText("Medium")}>Medium</Dropdown.Item>
                    <Dropdown.Item onClick={() => setPriorityText("Low")}>Low</Dropdown.Item>
                  </Dropdown>
                </div>
                <div>
                  <Dropdown label={`${orderText}`}>
                    <Dropdown.Item onClick={() => setOrderText("asc")}>Ascending</Dropdown.Item>
                    <Dropdown.Item onClick={() => setOrderText("desc")}>Descending</Dropdown.Item>
                  </Dropdown>

                </div>
              </div>
          }

          <div className='text-lg font-bold text-blue-800' onClick={() => setSearch(!search)}>Search</div>
          {
            search ? "" : <div className=''><input onChange={(e) => setSearchText(e.target.value)} type='text' placeholder='Search' /></div>
          }
        </div>
        <div className='flex gap-3'>
          <CreateProject />
          <Button onClick={() => setGraphicalView(!graphicalView)}>{!graphicalView ? "Table" : "Graph"}</Button>
        </div>
      </div>

      <ProjectData email={email} priorityText={priorityText} orderText={orderText} searchText={searchText} />


    </div>
  )
}

export default ManagerHome