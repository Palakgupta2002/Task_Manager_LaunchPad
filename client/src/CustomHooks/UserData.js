import { useEffect, useState } from 'react';

const useUserData = (email) => {
  const [userData, setUserData] = useState(null); // State to store user data


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/users/${email}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data); // Set user data in state
        } else {
          console.error('Error fetching user data:', response.status);
          // Handle error case if needed
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle error case if needed
      }
    };

    // Fetch user data immediately when email changes
    fetchUserData();
  }, [userData]); // Ensure email is included in the dependency array
  return userData;
};

export default useUserData;
