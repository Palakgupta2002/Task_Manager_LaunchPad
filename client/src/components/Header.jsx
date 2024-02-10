
import { Button, Navbar, TextInput } from "flowbite-react"
import { useState } from "react";
import { Link,useLocation } from "react-router-dom"
import AddTask from "./AddTask";
// import { GoSearch} from "react-icons/go";
// import {FaMoon} from "react-icons/fa"
const Header = () => {
  const path=useLocation().pathname;
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <Navbar className="border-b-2 ">
        <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Task</span>
          Manager
        </Link>
       

        <div className="flex gap-2 md:order-2">
         <Link to="/">
         <Button outline gradientDuoTone="purpleToBlue">
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
          <Navbar.Link active={path==='/'} as={'div'}>
            <AddTask/>
          </Navbar.Link>
         </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Header