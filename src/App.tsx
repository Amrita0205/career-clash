import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import CharacterCreation from './pages/CharacterCreation';
import Dashboard from './pages/Dashboard';
import SkillTree from './pages/SkillTree';
import Careers from './pages/Careers';
import Quests from './pages/Quests';
import Leaderboard from './pages/Leaderboard';
import GameHub from './pages/GameHub';
import Profile from './pages/Profile';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthProvider>
      <GameProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/character-creation" element={<CharacterCreation />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/skills" element={<SkillTree />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/quests" element={<Quests />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/games" element={<GameHub />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;