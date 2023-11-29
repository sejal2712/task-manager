import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    // Save updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
    // Save updated tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    
    <div className="main-container">
      <div className="background-container" >
        <header className="mb-4 text-center task-manager-header">
          <h1 className="heading-main">Task Manager</h1>
        </header>
        <div className="container mt-4" style={{ background: '#000', padding: '20px', borderRadius: '8px', width: '65%' }}>
          <h1 className="mb-4 text-center" style={{color: 'white'}}>Tasks List</h1>
          <ul className="list-group">
            {tasks.map(task => (
              <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center" style={{background:'linear-gradient(#f47575, #9198e5)' , borderColor:'black', color:'white', fontSize:'large', fontWeight:'bold', paddingBottom:'20px'}}>
                <div>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleComplete(task.id)}
                    className="me-3"
                  />
                  <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.name}</span>
                </div>
                <div>
                  <button onClick={() => handleDelete(task.id)} className="btn btn-danger me-2">Delete</button>
                  <Link to={`/edit/${task.id}`} className="btn btn-primary">Edit</Link>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-center mt-3">
            <Link to="/add" className="btn " style={{backgroundColor: '#f47575', fontWeight:'bold'}}>Add Task</Link>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default TaskList;
