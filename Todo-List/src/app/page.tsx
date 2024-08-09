"use client"
import React, { useState } from 'react'

const Page = () => {
  const [title, setTitle] = useState(""); // Use camelCase for state setters
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]); // Initialize mainTask state

  const submitHandler = (e) => {
    e.preventDefault();
    setMainTask([...mainTask, { title, desc }]); // Update mainTask state
    setTitle(""); // Clear the input fields after adding a task
    setDesc("");
    console.log(mainTask);
  };

  const deleteHandler = (i) => {
    const updatedTasks = mainTask.filter((_, index) => index !== i); // Filter out the task to be deleted
    setMainTask(updatedTasks); // Update the state with the remaining tasks
  };

  let renderTask = <h2>No Task Available</h2>;
  
  if (mainTask.length > 0) {
    renderTask = mainTask.map((t, i) => {
      return (
        <li key={i} className='flex items-center justify-between mb-8'>
          <div className='flex items-center justify-between mb-5 w-2/3'>
            <h5 className='text-2x1 font-semibold'>{t.title}</h5>
            <h6 className='text-x1 font-semibold'>{t.desc}</h6>
          </div>
          <button 
            onClick={() => deleteHandler(i)}
            className='bg-red-500 text-white px-4 py-2 rounded font-bold'>
            Delete
          </button>
        </li>
      );
    });
  }

  return (
    <>
      <h1 className='bg-black text-white p-5 text-5x1 font-bold text-center'>AQSA's Todo List</h1>
      <form onSubmit={submitHandler}>
        <input 
          type="text" 
          className='text-2x1 border-zinc-800 border-4 m-8 px-4 py-2'
          placeholder='Enter Title here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /> 
        <input 
          type="text" 
          className='text-2x1 border-zinc-800 border-4 m-8 px-4 py-2'
          placeholder='Enter Description here'
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        /> 
        <button className='bg-black text-white px-4 py-3 text-2x1 font-bold rounded m-5'>
          Add Task
        </button>
      </form>
      <hr />
      <div className="p-8 bg-slate-200">
        <ul>
          {renderTask}
        </ul>
      </div>
    </>
  )
}

export default Page;
