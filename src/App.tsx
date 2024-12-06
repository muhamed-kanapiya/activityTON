import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
          {/* Temporarily redirect root to tasks */}
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/levels" element={<Levels />} />
        </Routes>
      </main>
      <BottomMenu />
    </div>
  );
};

function App() {
  const basename = process.env.PUBLIC_URL || '/';

  return (
    <Router basename={basename}>
      <AppContent />
    </Router>
  );
}

export default App;
