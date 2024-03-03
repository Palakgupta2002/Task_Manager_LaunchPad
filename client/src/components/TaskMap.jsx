import React from 'react';
import TasksCard from './TasksCard';

const TaskMap = ({ userData }) => {
  return (
    <div className='flex mt-8 gap-7 flex-wrap justify-center border-2 border-solid border-red-200'>
      {userData && userData.tasks.length > 0 ? (
        userData.tasks.map((ele) => <TasksCard key={ele._id} tasks={ele} />)
      ) : (
        <p>No tasks added yet.</p>
      )}
    </div>
  );
};

export default TaskMap;
