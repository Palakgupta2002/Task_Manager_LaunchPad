import { useState, useEffect } from "react";

const useGetAllUserData = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/allUser/users");
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                } else {
                    console.log("There is some problem fetching users");
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [userData]);

    return userData;
};

export default useGetAllUserData;
