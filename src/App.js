import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddTask from './components/AddTask';
import Task from './components/Task';
import Notification from './components/Notification';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [notification, setNotification] = useState(null);

  // Загрузка задач
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  // Сохранение задач
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // CRUD операции
  const addTask = (text, reminderTime) => {
    const newTask = {
      id: uuidv4(),
      text,
      completed: false,
      reminder: true,
      reminderTime: new Date(reminderTime).getTime()
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTask = (id, newText, newReminderTime) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, text: newText, reminderTime: newReminderTime } 
        : task
    ));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Проверка напоминаний
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date().getTime();
      tasks.forEach(task => {
        if (task.reminder && !task.completed && task.reminderTime <= now) {
          setNotification(task.text);
          // Отключаем напоминание после срабатывания
          setTasks(tasks.map(t => 
            t.id === task.id ? { ...t, reminder: false } : t
          ));
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Проверка каждую минуту
    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <div className="app">
      <h1>ToDo List with Time Reminders</h1>
      <AddTask onAdd={addTask} />
      
      <div className="task-list">
        {tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onUpdate={updateTask}
            onToggleComplete={toggleComplete}
          />
        ))}
      </div>
      
      {notification && (
        <Notification 
          message={`Reminder: ${notification}`}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default App;