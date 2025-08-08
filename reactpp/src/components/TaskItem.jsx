import React, { useState } from 'react';

const TaskItem = ({ task, onDelete, onToggleDone, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    onEdit(task.id, newText);
    setIsEditing(false);
  };

  return (
    <li className={`task-item ${task.done ? 'done' : ''}`}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggleDone(task.id)}
      />
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <span>{task.text}</span>
      )}
      {isEditing ? (
        <button onClick={handleEdit}>Enregistrer</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Modifier</button>
      )}
      <button onClick={() => onDelete(task.id)}>Supprimer</button>
    </li>
  );
};

export default TaskItem;
