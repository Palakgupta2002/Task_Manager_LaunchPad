import React from 'react';

const KanbanHeader = () => {
  const arr = ["kanban", "list", "Table", "timeline"];
  const arr1=["serach","filter","New Task"]

  const renderItems = () => {
    return arr.map((ele) => <div key={ele}>{ele}</div>);
  };
  const renderItems1=()=>{
    return arr1.map((ele) => <div key={ele}>{ele}</div>);
  }

  return (
    <div className='kanban-board mb-5 py-5 flex justify-between px-3'>
      <div className='flex gap-5'>{renderItems()}</div>
      <div className='flex gap-5'>{renderItems1()}</div>
    </div>
  );
};

export default KanbanHeader;
