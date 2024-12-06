import React, { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { taskDatabase, PresetTask } from '../data/taskDatabase';
import { calculateLevel, calculateProgress, Level } from '../data/levels';

type RepeatType = 'none' | 'daily' | 'weekly' | 'monthly';

interface Task extends Omit<PresetTask, 'description'> {
  completed: boolean;
  lastCompleted?: Date;
  dueDate?: string;
}

interface TaskFormData {
  text: string;
  link: string;
  dueDate: string;
  category: string;
  repeat: RepeatType;
  points: number;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [points, setPoints] = useState(0);
  const [currentLevel, setCurrentLevel] = useState<Level>(calculateLevel(0));
  const [newTaskData, setNewTaskData] = useState<TaskFormData>({
    text: '',
    link: '',
    dueDate: '',
    category: '',
    repeat: 'none',
    points: 50
  });

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedPoints = localStorage.getItem('points');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    if (savedPoints) {
      const pointsValue = parseInt(savedPoints);
      setPoints(pointsValue);
      setCurrentLevel(calculateLevel(pointsValue));
    }
  }, []);

  // Save tasks to localStorage when they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('points', points.toString());
  }, [tasks, points]);

  const addTask = () => {
    if (newTaskData.text.trim()) {
      setTasks([...tasks, {
        id: Date.now().toString(),
        text: newTaskData.text,
        completed: false,
        link: newTaskData.link,
        dueDate: newTaskData.dueDate,
        category: newTaskData.category,
        repeat: newTaskData.repeat,
        points: newTaskData.points
      }]);
      setNewTaskData({
        text: '',
        link: '',
        dueDate: '',
        category: '',
        repeat: 'none',
        points: 50
      });
      setShowAddForm(false);
    }
  };

  const addPresetTask = (presetTask: PresetTask) => {
    const existingTask = tasks.find(task => task.id === presetTask.id);
    if (!existingTask) {
      setTasks([...tasks, { ...presetTask, completed: false }]);
    }
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const now = new Date();
        const lastCompleted = task.lastCompleted ? new Date(task.lastCompleted) : null;
        
        // Check if task can be completed again based on repeat type
        let canComplete = true;
        if (task.completed && task.repeat !== 'none') {
          if (!lastCompleted) canComplete = true;
          else {
            switch (task.repeat) {
              case 'daily':
                canComplete = now.getDate() !== lastCompleted.getDate();
                break;
              case 'weekly':
                const weekDiff = Math.floor((now.getTime() - lastCompleted.getTime()) / (1000 * 60 * 60 * 24 * 7));
                canComplete = weekDiff >= 1;
                break;
              case 'monthly':
                canComplete = now.getMonth() !== lastCompleted.getMonth();
                break;
            }
          }
        }

        if (canComplete) {
          if (!task.completed) {
            setPoints(prev => {
              const newPoints = prev + task.points;
              setCurrentLevel(calculateLevel(newPoints));
              return newPoints;
            });
          }
          return { 
            ...task, 
            completed: !task.completed,
            lastCompleted: !task.completed ? now : task.lastCompleted 
          };
        }
      }
      return task;
    }));
  };

  const categories = Array.from(new Set(taskDatabase.map(task => task.category)));

  return (
    <div className="task-list">
      <div className="level-info">
        <h2>Level {currentLevel.level}: {currentLevel.title}</h2>
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ width: `${calculateProgress(points, currentLevel)}%` }}
          ></div>
        </div>
        <p className="points">Points: {points}</p>
      </div>

      <div className="tasks-container">
        <div className="tasks-section">
          <h3>📋 Task Templates</h3>
          <div className="preset-tasks">
            {categories.map(category => (
              <div key={category} className="category-section">
                <h4>{category}</h4>
                <div className="category-tasks">
                  {taskDatabase
                    .filter(task => task.category === category)
                    .map(task => (
                      <div key={task.id} className="preset-task">
                        <div className="preset-task-header">
                          <span>{task.text}</span>
                          <span className="points-badge">+{task.points}pts</span>
                        </div>
                        {task.description && (
                          <p className="task-description">{task.description}</p>
                        )}
                        <button 
                          onClick={() => addPresetTask(task)}
                          disabled={tasks.some(t => t.id === task.id)}
                          className="add-preset-task-button"
                        >
                          {tasks.some(t => t.id === task.id) ? '✓ Added to My Tasks' : '+ Add to My Tasks'}
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="tasks-section">
          <div className="section-header">
            <h3>✨ My Active Tasks</h3>
            <button 
              className="action-button"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              {showAddForm ? 'Cancel' : '+ Custom Task'}
            </button>
          </div>

          {showAddForm && (
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
              
              <input
                type="number"
                value={newTaskData.points}
                onChange={(e) => setNewTaskData({...newTaskData, points: parseInt(e.target.value)})}
                placeholder="Points"
                className="task-input"
                min="1"
                max="1000"
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

          <div className="active-tasks">
            {tasks.map(task => (
              <div key={task.id} className={`task ${task.completed ? 'completed' : ''}`}>
                <div className="task-header">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                  />
                  <span className="task-text">{task.text}</span>
                  <span className="points-badge">+{task.points}pts</span>
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
      </div>
    </div>
  );
};

export default TaskList;
