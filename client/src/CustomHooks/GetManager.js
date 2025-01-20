import { useEffect, useState } from 'react'

const useManagerData = (email) => {
  const [userData, setUserData] = useState(null) // State to store user data
 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/ManagerData/getOneManager/${email}`,
        )
        if (response.ok) {
          const data = await response.json()
          setUserData(data) 
        } else {
          console.error('Error fetching user data:', response.status)
          
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
       
      }
    }
    email !== null && fetchUserData()
  }, [email]) 
  return userData
}

export default useManagerData
