import { useState } from 'react';
import { FaBell, FaBellSlash, FaTrash, FaCheck, FaEdit, FaSave } from 'react-icons/fa';

const Task = ({ task, onDelete, onUpdate, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editTime, setEditTime] = useState(
    new Date(task.reminderTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  const handleUpdate = () => {
    const [hours, minutes] = editTime.split(':');
    const reminderTime = new Date();
    reminderTime.setHours(hours, minutes, 0, 0);
    
    onUpdate(task.id, editText, reminderTime.getTime());
    setIsEditing(false);
  };

  return (
    <div className={`task ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <input
            type="time"
            value={editTime}
            onChange={(e) => setEditTime(e.target.value)}
          />
          <button onClick={handleUpdate}>
            <FaSave /> Save
          </button>
        </div>
      ) : (
        <>
          <div className="task-content">
            <h3>{task.text}</h3>
            <p>
              Reminder at: {new Date(task.reminderTime).toLocaleTimeString()}
            </p>
          </div>
          <div className="task-actions">
            <button onClick={() => onToggleComplete(task.id)}>
              <FaCheck /> {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => setIsEditing(true)}>
              <FaEdit /> Edit
            </button>
            <button onClick={() => onDelete(task.id)}>
              <FaTrash /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;