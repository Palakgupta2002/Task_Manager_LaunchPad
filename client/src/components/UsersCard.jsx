// UsersCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const UsersCard = ({ user }) => {
    const initials = user.username.substring(0, 2).toUpperCase();

    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 w-fit">
            <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-600">
                        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="currentColor">{initials}</text>
                    </svg>
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">{user.username}</h2>
                    <p className="text-sm text-gray-600">{user.email}</p>
                </div>
            </div>
            <Link to={`/adUserVisit/${user.email}`}>
                <button className="text-blue-500 hover:text-blue-700">See Details</button>
            </Link>
        </div>
    );
};

export default UsersCard;
