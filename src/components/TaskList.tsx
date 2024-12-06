import React, { useState } from 'react';
import WebApp from '@twa-dev/sdk';

type RepeatType = 'none' | 'daily' | 'weekly' | 'monthly';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  link?: string;
  dueDate?: string;
  category: string;
  repeat: RepeatType;
}

interface TaskFormData {
  text: string;
  link: string;
  dueDate: string;
  category: string;
  repeat: RepeatType;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskData, setNewTaskData] = useState<TaskFormData>({
    text: '',
    link: '',
    dueDate: '',
    category: '',
    repeat: 'none'
  });

  const categories = [
    'Work 💼',
    'Personal 🏠',
    'Shopping 🛒',
    'Health 🏥',
    'Study 📚',
    'Other 📌'
  ];

  const addTask = () => {
    if (newTaskData.text.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTaskData.text,
        completed: false,
        link: newTaskData.link,
        dueDate: newTaskData.dueDate,
        category: newTaskData.category,
        repeat: newTaskData.repeat
      }]);
      setNewTaskData({
        text: '',
        link: '',
        dueDate: '',
        category: '',
        repeat: 'none'
      });
      setShowAddForm(false);
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="task-list">
      <h2>My Tasks</h2>
      
      {!showAddForm ? (
        <button 
          className="add-task-button"
          onClick={() => setShowAddForm(true)}
        >
          + Add New Task
        </button>
      ) : (
        <div className="add-task-form">
          <input
            type="text"
            value={newTaskData.text}
            onChange={(e) => setNewTaskData({...newTaskData, text: e.target.value})}
            placeholder="Task description..."
            className="task-input"
          />
          
          <input
            type="url"
            value={newTaskData.link}
            onChange={(e) => setNewTaskData({...newTaskData, link: e.target.value})}
            placeholder="Add link (optional)"
            className="task-input"
          />
          
          <input
            type="datetime-local"
            value={newTaskData.dueDate}
            onChange={(e) => setNewTaskData({...newTaskData, dueDate: e.target.value})}
            className="task-input"
          />
          
          <select
            value={newTaskData.category}
            onChange={(e) => setNewTaskData({...newTaskData, category: e.target.value})}
            className="task-input"
          >
            <option value="">Select category</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          
          <select
            value={newTaskData.repeat}
            onChange={(e) => setNewTaskData({...newTaskData, repeat: e.target.value as RepeatType})}
            className="task-input"
          >
            <option value="none">No repeat</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          
          <div className="form-buttons">
            <button onClick={addTask} className="submit-button">Add Task</button>
            <button onClick={() => setShowAddForm(false)} className="cancel-button">Cancel</button>
          </div>
        </div>
      )}

      <div className="tasks">
        {tasks.map(task => (
          <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
            <div className="task-header">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className="task-text">{task.text}</span>
            </div>
            
            <div className="task-details">
              {task.category && (
                <span className="task-category">{task.category}</span>
              )}
              {task.dueDate && (
                <span className="task-due-date">
                  🕒 {new Date(task.dueDate).toLocaleString()}
                </span>
              )}
              {task.repeat !== 'none' && (
                <span className="task-repeat">
                  🔄 {task.repeat}
                </span>
              )}
              {task.link && (
                <a 
                  href={task.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="task-link"
                >
                  🔗 Link
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
