import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';

const Onboarding: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < 3) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/tasks');
    }
  };

  return (
    <div className="onboarding-container">
      {currentSlide === 1 && (
        <div className="onboarding-slide">
          <h2>Welcome to ActivityTON</h2>
          <p className="subtitle">Organize and Achieve</p>
          <img src="./assets/gif/Achieve.gif" alt="onboarding image" />
          <div className="slide-bottom">
            <p className="description">
              Create custom to-do lists or pick from ready-made templates to get things done your way!
            </p>
            <button className="next-btn" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}

      {currentSlide === 2 && (
        <div className="onboarding-slide">
          <h2>Earn Achievements</h2>
          <p className="subtitle">Complete & Earn Rewards</p>
          <img src="./assets/gif/Compete.gif" alt="onboarding image" />
          <div className="slide-bottom">
            <p className="description">
              Finish tasks, unlock achievements, and level up your productivity game with fun rewards!
            </p>
            <button className="next-btn" onClick={handleNext}>Next</button>
          </div>
        </div>
      )}

      {currentSlide === 3 && (
        <div className="onboarding-slide">
          <h2>Stay Motivated</h2>
          <p className="subtitle">Boost Your Productivity</p>
          <img src="./assets/gif/Fire.gif" alt="onboarding image" />
          <div className="slide-bottom">
            <p className="description">
              Track your progress, stay focused, and get rewarded for reaching new goals every day.
            </p>
            <button className="next-btn" onClick={handleNext}>Begin Your Journey</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
