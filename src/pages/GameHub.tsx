import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import Navigation from '../components/Navigation';
import BattleArena from '../components/BattleArena';
import MiniGames from '../components/MiniGames';
import AchievementSystem from '../components/AchievementSystem';
import { 
  Sword, Gamepad2, Trophy, Target, Zap, 
  Users, Brain, Crown, Star, Award
} from 'lucide-react';

const GameHub: React.FC = () => {
  const { character } = useGame();
  const [activeTab, setActiveTab] = useState<'battle' | 'minigames' | 'achievements'>('battle');

  if (!character) return null;

  const tabs = [
    {
      id: 'battle' as const,
      name: 'Battle Arena',
      icon: <Sword className="w-5 h-5" />,
      description: 'Challenge opponents in skill-based duels',
      color: 'from-red-500 to-orange-600'
    },
    {
      id: 'minigames' as const,
      name: 'Training Games',
      icon: <Gamepad2 className="w-5 h-5" />,
      description: 'Master skills through engaging mini-games',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'achievements' as const,
      name: 'Achievements',
      icon: <Trophy className="w-5 h-5" />,
      description: 'Track your legendary accomplishments',
      color: 'from-yellow-500 to-orange-600'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 font-orbitron">
            Game Hub
          </h1>
          <p className="text-slate-300 font-inter">
            Challenge yourself and earn rewards through battles, games, and achievements
          </p>
        </div>

        {/* Game Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-red-900/50 to-orange-900/50 border border-red-500 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="text-red-400">
                <Sword className="w-8 h-8" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white font-orbitron">
                  {character.battlePoints.toLocaleString()}
                </div>
                <div className="text-red-400 text-sm">Battle Points</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="text-purple-400">
                <Gamepad2 className="w-8 h-8" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white font-orbitron">
                  {character.skillPoints.toLocaleString()}
                </div>
                <div className="text-purple-400 text-sm">Skill Points</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border border-yellow-500 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="text-yellow-400">
                <Trophy className="w-8 h-8" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white font-orbitron">
                  {character.achievements.length}
                </div>
                <div className="text-yellow-400 text-sm">Achievements</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border border-cyan-500 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="text-cyan-400">
                <Star className="w-8 h-8" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white font-orbitron">
                  {character.totalPoints.toLocaleString()}
                </div>
                <div className="text-cyan-400 text-sm">Total Points</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-200 ${
                activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-lg transform scale-105`
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {tab.icon}
              <div className="text-left">
                <div className="font-bold">{tab.name}</div>
                <div className="text-xs opacity-75">{tab.description}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-slate-900/30 border border-slate-700 rounded-xl p-8">
          {activeTab === 'battle' && <BattleArena />}
          {activeTab === 'minigames' && <MiniGames />}
          {activeTab === 'achievements' && <AchievementSystem />}
        </div>
      </div>
    </div>
  );
};

export default GameHub;