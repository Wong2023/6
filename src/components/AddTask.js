import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [reminderTime, setReminderTime] = useState('12:00');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    const [hours, minutes] = reminderTime.split(':');
    const time = new Date();
    time.setHours(hours, minutes, 0, 0);
    
    onAdd(text, time);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        type="text"
        placeholder="Task description"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <label>
        Reminder time:
        <input
          type="time"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
          required
        />
      </label>
      <button type="submit">
        <FaPlus /> Add Task
      </button>
    </form>
  );
};

export default AddTask;