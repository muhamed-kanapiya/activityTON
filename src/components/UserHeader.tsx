import React from 'react';
import WebApp from '@twa-dev/sdk';

const UserHeader: React.FC = () => {
  const user = WebApp.initDataUnsafe?.user || {
    first_name: "User",
    username: "username",
    photo_url: "https://via.placeholder.com/48"
  };

  const levelInfo = {
    name: "Productivity Master",
    level: 5,
    xp: 2500,
    nextLevel: 3000
  };

  return (
    <div className="user-header">
      <div className="user-info">
        <img 
          src={user.photo_url} 
          alt="Profile" 
          className="user-avatar"
        />
        <div className="user-details">
          <h2 className="user-name">{user.first_name}</h2>
          <div className="level-info">
            <span className="level-name">✨ {levelInfo.name}</span>
            <div className="level-progress">
              <div 
                className="level-progress-bar" 
                style={{ width: `${(levelInfo.xp / levelInfo.nextLevel) * 100}%` }}
              ></div>
            </div>
            <span className="level-stats">
              Level {levelInfo.level} • {levelInfo.xp}/{levelInfo.nextLevel} XP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
