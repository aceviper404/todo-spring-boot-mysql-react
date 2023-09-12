import React from 'react';

const Task = ({ task, onUpdate, onDelete }) => {
  return (
    <div className="task">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onUpdate(task.id)}
      />
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};

export default Task;
