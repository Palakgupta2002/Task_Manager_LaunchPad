import React from 'react';

const ProgessCard = ({ Cardcolor, countOfStatus, typeOfStaus }) => {
  return (
    <div className='w-32 h-20 rounded-lg border-1 border-solid border-gray-500 shadow-md flex flex-col justify-center items-center' style={{ backgroundColor: Cardcolor }}>
      <h2 className="text-white font-bold text-lg">{countOfStatus}</h2>
      <h3 className="text-white text-sm">{typeOfStaus}</h3>
    </div>
  );
}

export default ProgessCard;
