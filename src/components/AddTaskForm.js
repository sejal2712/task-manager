import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddTaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskName) {
      alert('Task name is required!');
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName,
      description: taskDescription,
      priority,
      completed: false,
    };

    // Fetch existing tasks from local storage
    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = [...existingTasks, newTask];

    // Save updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    // Navigate to task list page
    navigate('/');
  };

  return (
    <div className="main-container">
      <div className="background-container" style={{ background: 'linear-gradient(#f47575, #9198e5)' }}>
        <div className="container mt-4" style={{ background: '#000', padding: '20px', borderRadius: '8px', paddingTop:'10px', width:'70%' }}>
          <h1 className="mb-4" style={{color:'white', textAlign:'center'}}>Add Task</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label" style={{color:'white'}}>Task Name</label>
              <input
                type="text"
                className="form-control"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{color:'white'}}>Task Description</label>
              <textarea
                className="form-control"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label" style={{color:'white'}}>Priority</label>
              <select
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label" style={{color: 'white'}}>Due Date</label>
              <input
                type="date"
                className="form-control"            
              />
            </div>
            <div className="d-flex justify-content-center mt-3">
            <button type="submit" className="btn mx-2" style={{backgroundColor: '#f47575', fontWeight:'bold'}}>Add Task</button>
            <Link to="/" className="btn mx-2" style={{backgroundColor: '#f47575', fontWeight:'bold'}}>Back to Task List</Link>
            </div>
            
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default AddTaskForm;
