
import { Button, Navbar, TextInput } from "flowbite-react"
import { useState } from "react";
import { Link,useLocation } from "react-router-dom"
import { EmailContext } from "../App";
import { useContext } from "react";

// import { GoSearch} from "react-icons/go";
// import {FaMoon} from "react-icons/fa"
const Header = () => {

const  {setEmail}=useContext(EmailContext)
const handleEmailValue=()=>{
  setEmail("")
}
  const path=useLocation().pathname;
  return (
    <div>
      <Navbar className="border-b-2 ">
       
      <Link to="/Home">
      <div className="flex items-center  text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
         Task Manager
        </div>
      </Link>
        <div className="flex gap-2 md:order-2">
         <Link to="/">
         <Button outline gradientDuoTone="purpleToBlue" onClick={handleEmailValue}>
            Sign out
          </Button>
         </Link>
         <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
          <Navbar.Link active={path==='/Home'} as={'div'}>
            <Link to='/Home'>
              Home
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path==='/about'} as={'div'}>
            <Link to='/about'>
              Profile
            </Link>
          </Navbar.Link>
         </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header