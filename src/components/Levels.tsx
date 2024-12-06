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

interface LevelInfo {
  level: number;
  xpRequired: number;
  rewards: string[];
  title: string;
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
      emoji: "📋"
    }
  ];

  const levels: LevelInfo[] = [
    { 
      level: 1, 
      xpRequired: 0, 
      title: "Novice Organizer",
      rewards: ["Basic Task List 📝", "Daily Goals 🎯"]
    },
    { 
      level: 2, 
      xpRequired: 100, 
      title: "Task Apprentice",
      rewards: ["Custom Categories 📑", "Streak Counter 🔥", "Task Notes 📌"] 
    },
    { 
      level: 3, 
      xpRequired: 250, 
      title: "Efficiency Expert",
      rewards: ["Priority Levels ⭐", "Due Dates ⏰", "Task Tags 🏷️"] 
    },
    { 
      level: 4, 
      xpRequired: 500, 
      title: "Productivity Master",
      rewards: ["Task Templates 📋", "Statistics 📊", "Dark Theme 🌙"] 
    },
    { 
      level: 5, 
      xpRequired: 1000, 
      title: "Time Lord",
      rewards: ["Time Tracking ⏱️", "Custom Themes 🎨", "Export Data 📤"] 
    },
    { 
      level: 6, 
      xpRequired: 1750, 
      title: "Task Virtuoso",
      rewards: ["Subtasks 📑", "Task Sharing 🤝", "Rich Text Notes ✍️"] 
    },
    { 
      level: 7, 
      xpRequired: 2750, 
      title: "Productivity Sage",
      rewards: ["Task Dependencies 🔗", "Calendar View 📅", "Custom Views 🎯"] 
    },
    { 
      level: 8, 
      xpRequired: 4000, 
      title: "Efficiency Legend",
      rewards: ["Project Groups 📁", "Analytics Dashboard 📈", "Task Automation 🤖"] 
    },
    { 
      level: 9, 
      xpRequired: 5500, 
      title: "Task Grandmaster",
      rewards: ["Team Features 👥", "Advanced Search 🔍", "Custom Workflows ⚡"] 
    },
    { 
      level: 10, 
      xpRequired: 7500, 
      title: "Productivity Champion",
      rewards: ["Premium Badge 👑", "All Features ⭐", "Early Access 🚀"] 
    }
  ];

  const currentLevel = 2; // This would normally come from user data
  const currentXP = 150; // This would normally come from user data

  return (
    <div className="levels-container">
      <div className="level-progress">
        <h2>Level {currentLevel}</h2>
        <div className="level-title">{levels[currentLevel - 1].title}</div>
        <div className="xp-progress">
          <div className="xp-bar" style={{ 
            width: `${Math.min(100, (currentXP - levels[currentLevel - 1].xpRequired) / 
            (levels[currentLevel].xpRequired - levels[currentLevel - 1].xpRequired) * 100)}%` 
          }}></div>
        </div>
        <p>{currentXP} / {levels[currentLevel].xpRequired} XP</p>
      </div>

      <div className="levels-table">
        <h3>Level Progression</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Level</th>
                <th>Title</th>
                <th>XP</th>
                <th>Rewards</th>
              </tr>
            </thead>
            <tbody>
              {levels.map((level) => (
                <tr key={level.level} className={currentLevel === level.level ? 'current-level' : ''}>
                  <td>
                    <span className="level-badge">{level.level}</span>
                  </td>
                  <td>{level.title}</td>
                  <td>{level.xpRequired} XP</td>
                  <td>
                    {level.rewards.map((reward, index) => (
                      <span key={index} className="reward">{reward}</span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="achievements">
        <h3>Achievements</h3>
        {achievements.map((achievement) => (
          <div key={achievement.id} className="achievement-card">
            <span className="achievement-emoji">{achievement.emoji}</span>
            <div className="achievement-info">
              <h4>{achievement.title}</h4>
              <p>{achievement.description}</p>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                ></div>
              </div>
              <span className="progress-text">
                {achievement.progress}/{achievement.maxProgress}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Levels;
