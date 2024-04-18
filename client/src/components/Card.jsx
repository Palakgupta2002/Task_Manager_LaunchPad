import React from 'react';

const Card = ({ title, count }) => {
    return (
        <div className="rounded-lg bg-white shadow-lg p-6 mx-4 my-4 flex justify-between items-center">
            <div>
                <p className="text-lg font-semibold">{title}</p>
                <p className="text-gray-500">Count: {count}</p>
            </div>
            <div className="flex items-center justify-center bg-gray-200 rounded-full h-12 w-12">
                <svg className="h-6 w-6 text-gray-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M9 5l7 7-7 7"></path>
                </svg>
            </div>
        </div>
    );
};

export default Card;
