import React from 'react';
import "../App.css"
import high from "../assest/high1.svg"
import low from "../assest/low1.svg"
import medium from "../assest/medium1.svg"

const KanbanBoardCard = ({task}) => {
  function ProfilePhoto(name) {
    const words = name.split(" ");
    const firstTwoLetters = words.map(word => word.slice(0, 2).toUpperCase()).join("");
    return firstTwoLetters;
  }

  const PriorityPic = (priority) => {
    switch (priority) {
        case 'high':
           return high;
        case 'medium':
            return medium;
        case 'low':
            return low;
        default:
            return null; 
    }
  }

  return (
    <div className='kanbanCard'>

        <div className='flex justify-between '>
            <div>{task.title}</div>
            <div className='profilePhoto'>{ProfilePhoto(task?.email)}</div>
        </div>
        <div className='flex gap-4'>
            <div> <img width={"20px"} src={PriorityPic(task.priority)} alt={task.priority} /></div>
            <div>description</div>
        </div>
    </div>
  )
}

export default KanbanBoardCard;
