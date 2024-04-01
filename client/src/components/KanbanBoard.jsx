import React, { useEffect, useState } from 'react';
import "../App.css"
import { useParams } from 'react-router-dom';
import KanbanBoardCard from './KanbanBoardCard';
import todo from "../assest/todo.svg"
import progress from "../assest/in-progress.svg"
import blocked from "../assest/blocked.svg"
import complete from "../assest/completed.svg"
import plus from "../assest/plus.svg"
import KanabanHeader from './KanabanHeader';

const KanbanBoard = () => {
  const { id } = useParams();
  const [taskData, setTaskData] = useState([]);
  const [groupedTasks, setGroupedTasks] = useState({});

  const fetchTaskData = async () => {
    try {
      const fetchApi = await fetch(`http://localhost:5000/task/${id}`);
      const jsonData = await fetchApi.json();
      setTaskData(jsonData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, [taskData.tasks]);

  useEffect(() => {
    function groupData() {
      const newGroupedTasks = {};
      if (taskData.tasks) {
        if (taskData.tasks.some(task => task.status1 === 'todo')) {
          newGroupedTasks.todo = taskData.tasks.filter(task => task.status1 === 'todo');
        }
        if (taskData.tasks.some(task => task.status1 === 'in progress')) {
          newGroupedTasks.inProgress = taskData.tasks.filter(task => task.status1 === 'in progress');
        }
        if (taskData.tasks.some(task => task.status1 === 'completed')) {
          newGroupedTasks.completed = taskData.tasks.filter(task => task.status1 === 'completed');
        }
        if (taskData.tasks.some(task => task.status1 === 'blocked')) {
          newGroupedTasks.blocked = taskData.tasks.filter(task => task.status1 === 'blocked');
        }
      }
      setGroupedTasks(newGroupedTasks);
    }
    groupData();
  }, [taskData]);

  return (
   <div className='w-fit m-9'>
    <KanabanHeader/>
     <div className="kanban-board overflow-visible flex justify-between boxshadow p-11">
      <div className="column">
       <div className=' kanbanClmHdr flex justify-between'>
        <div className='flex gap-2'>
          <img src={todo} alt='todo' width={"20px"} />
          <div>todo</div>
          <div>{groupedTasks?.todo?.length || 0}</div>
        </div>
        <img src={plus} alt='Add' width={"20px"} />
       </div>
        {groupedTasks?.todo?.map(task => (
          <div key={task._id} className="task mt-5 p-5">
            <KanbanBoardCard task={task} />
          </div>
        ))}
      </div>
      <div className="column  w-fit">
      <div className='kanbanClmHdr  flex justify-between'>
        <div className='flex gap-2'>
        <img src={progress} alt='progress' width={"20px"} />
          <div>In progress</div>
          <div>{groupedTasks?.inProgress?.length || 0}</div>
        </div>
        <img src={plus} alt='add' width={"20px"} />
       </div>
        {groupedTasks?.inProgress?.map(task => (
          <div key={task._id} className="task  mt-5 p-5">
          <KanbanBoardCard task={task} />
          </div>
        ))}
      </div>
      <div className="column">
      <div className='kanbanClmHdr flex justify-between'>
        <div className='flex gap-2'>
        <img src={complete} alt='complete' width={"20px"} />
          <div>Priority</div>
          <div>{groupedTasks?.priority?.length || 0}</div>
        </div>
        <img src={plus} alt='add' width={"20px"} />
       </div>
        {groupedTasks?.completed?.map(task => (
          <div key={task._id} className="task  mt-5 p-5">
           <KanbanBoardCard task={task} />
          </div>
        ))}
      </div>
      <div className="column">
      <div className='kanbanClmHdr flex gap-5'>
        <div className='flex gap-2'>
        <img src={blocked} alt='blocked' width={"20px"} />
          <div>Blocked</div>
          <div>{groupedTasks?.blocked?.length || 0}</div>
        </div>
        <img src={plus} alt='add' width={"20px"} />
       </div>
        {groupedTasks?.blocked?.map(task => (
          <div key={task._id} className="task  mt-5 p-5">
            <KanbanBoardCard task={task} />
          </div>
        ))}
      </div>
    </div>
   </div>
  );
};

export default KanbanBoard;
