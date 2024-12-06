import React from 'react';
import WebApp from '@twa-dev/sdk';

interface Achievement {
  id: number;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  emoji: string;
}

const Levels: React.FC = () => {
  const achievements: Achievement[] = [
    {
      id: 1,
      title: "Task Master",
      description: "Complete 10 tasks",
      progress: 3,
      maxProgress: 10,
      emoji: "🏆"
    },
    {
      id: 2,
      title: "Productivity Pro",
      description: "Complete tasks 3 days in a row",
      progress: 1,
      maxProgress: 3,
      emoji: "🔥"
    },
    {
      id: 3,
      title: "Early Bird",
      description: "Complete a task before 9 AM",
      progress: 0,
      maxProgress: 1,
      emoji: "🌅"
    },
    {
      id: 4,
      title: "Weekend Warrior",
      description: "Complete 5 tasks on weekend",
      progress: 2,
      maxProgress: 5,
      emoji: "⚡"
    },
    {
      id: 5,
      title: "Perfect Planner",
      description: "Create 3 custom task lists",
      progress: 1,
      maxProgress: 3,
      emoji: "📝"
    }
  ];

  const calculateProgress = (progress: number, max: number) => {
    return (progress / max) * 100;
  };

  return (
    <div className="levels-container">
      <h2 className="section-title">🎯 Achievements</h2>
      <div className="achievements-list">
        {achievements.map(achievement => (
          <div key={achievement.id} className="achievement-card">
            <div className="achievement-header">
              <span className="achievement-emoji">{achievement.emoji}</span>
              <h3>{achievement.title}</h3>
            </div>
            <p>{achievement.description}</p>
            <div className="progress-bar">
              <div 
                className="progress"
                style={{ width: `${calculateProgress(achievement.progress, achievement.maxProgress)}%` }}
              />
            </div>
            <span className="progress-text">
              {achievement.progress} / {achievement.maxProgress}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Levels;
