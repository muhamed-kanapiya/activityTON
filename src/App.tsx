import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Onboarding from './components/Onboarding';
import TaskList from './components/TaskList';
import Levels from './components/Levels';
import BottomMenu from './components/BottomMenu';
import UserHeader from './components/UserHeader';
import './App.css';

const AppContent = () => {
  const location = useLocation();
  const showHeader = location.pathname !== '/';

  return (
    <div className="App">
      <main className="main-content">
        {showHeader && <UserHeader />}
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/levels" element={<Levels />} />
        </Routes>
      </main>
      <BottomMenu />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
