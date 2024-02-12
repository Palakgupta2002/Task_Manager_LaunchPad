import { useState, useEffect } from 'react'

const useGetAllUserData = (search, sortBy) => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/allUser/users')
        if (response.ok) {
          let data = await response.json()

          // Filter data based on search
          if (search) {
            data = data.filter((user) => {
              return user.username.toLowerCase().includes(search.toLowerCase())
            })
          }

          // Sort data based on sortBy
          if (sortBy === 'Asc') {
            data.sort((a, b) => (a.username > b.username ? 1 : -1))
          } else if (sortBy === 'Dsc') {
            data.sort((a, b) => (a.username < b.username ? 1 : -1))
          }

          setUserData(data)
        } else {
          console.log('There is some problem fetching users')
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [search, sortBy])

  return userData
}

export default useGetAllUserData
