import TaskList from './components/TaskList';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  
  useEffect(() => {
    fetch('http://localhost:8086/api/tasks')
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const handleUpdate = (taskId) => {
    
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
  
    
    setTasks(updatedTasks);
  
    
    fetch(`http://localhost:8086/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed: !tasks.find((task) => task.id === taskId).completed }),
    });
  };

  const handleDelete = (taskId) => {
    
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
  
    
    setTasks(updatedTasks);
  
    
    fetch(`http://localhost:8086/api/tasks/${taskId}`, {
      method: 'DELETE',
    });
  };

  const handleCreate = () => {
    
    const newTaskObject = {
      title: newTask,
      description: '', 
      dueDate: '',     
      completed: false,
    };
  
    
    fetch('http://localhost:8086/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTaskObject),
    })
      .then((response) => response.json())
      .then((data) => {
        
        setTasks([...tasks, data]);
  
        setNewTask('');
      });
  };
  
  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskList tasks={tasks} onUpdate={handleUpdate} onDelete={handleDelete} />
      <div>
        <input
          type="text"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleCreate}>Add Task</button>
      </div>
    </div>
  );
}

export default App;
