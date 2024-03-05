import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderAdmin from './HeaderAdmin';

const ViewManagerDetails = () => {
    const [manager, setManager] = useState(null);
    const { id } = useParams(); 

    useEffect(() => {
        const getManager = async () => {
            try {
                const response = await fetch(`http://localhost:5000/ManagerData/getOneManager/${id}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch manager')
                }
                const data = await response.json();
                setManager(data);
            } catch (error) {
                console.error('Error fetching manager:', error);
            }
        };
        getManager();
    }, [id]); 

    return (
        <div>
            <HeaderAdmin/>
            {manager && (
                <div>
                    <h2>Manager Details</h2>
                    <p>ID: {manager.MUniqueID}</p>
                    <p>Name: {manager.Musername}</p>
                    <p>Email: {manager.Memail}</p>
                    
                </div>
            )}
        </div>
    );
};

export default ViewManagerDetails;
