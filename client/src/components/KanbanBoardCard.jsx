import React from 'react';
import "../App.css"


const KanbanBoardCard = ({task}) => {


  return (
    <div className='taskCardDiv'>

        <div className='flex justify-between '>
            <div>{task.title}</div>
            <div>user</div>
        </div>
        <div className='flex gap-4'>
            <div>{task.priority}</div>
            <div>description</div>
        </div>
    </div>
  )
}

export default KanbanBoardCard