import React from 'react'
import TasksCard from './TasksCard'

const TaskMap = ({userData}) => {
  return (
    <div className='flex mt-8 gap-7 flex-wrap justify-center'>
        {
           userData && userData.tasks.map((ele)=>(
                <TasksCard tasks={ele} />
            ))

        }
    </div>
  )
}

export default TaskMap