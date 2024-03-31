import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import KanbanBoardCard from './KanbanBoardCard';

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
    <div className="kanban-board flex justify-between m-9">
      <div className="column">
        <h3>To Do</h3>
        {groupedTasks?.todo?.map(task => (
          <div key={task._id} className="task">
            <KanbanBoardCard task={task} />
          </div>
        ))}
      </div>
      <div className="column">
        <h3>In Progress</h3>
        {groupedTasks?.inProgress?.map(task => (
          <div key={task._id} className="task border-2 border-solid border-neutral-400 p-5">
            {task.title}
            <p>Priority: {task.priority}</p>
          </div>
        ))}
      </div>
      <div className="column">
        <h3>Completed</h3>
        {groupedTasks?.completed?.map(task => (
          <div key={task._id} className="task border-2 border-solid border-neutral-400 p-5">
            {task.title}
            <p>Priority: {task.priority}</p>
          </div>
        ))}
      </div>
      <div className="column">
        <h3>Blocked</h3>
        {groupedTasks?.blocked?.map(task => (
          <div key={task._id} className="task border-2 border-solid border-neutral-400 p-5">
            {task.title}
            <p>Priority: {task.priority}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
