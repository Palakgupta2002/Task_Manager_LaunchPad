import React from 'react'

const UserChat = ({ user }) => {
  return (
    <div className='border-2 border-solid border-gray-400 mt-5 px-3 flex justify-between gap-6'>
       <h2 className="text-lg font-semibold text-gray-700">{user.username}</h2>
       <h2 className="text-lg font-semibold text-blue-700">chat</h2>
    </div>
  )
}

export default UserChat