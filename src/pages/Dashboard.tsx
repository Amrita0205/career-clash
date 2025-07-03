import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import Navigation from '../components/Navigation';
import { 
  Sword, Shield, Star, Trophy, Zap, Target, 
  TrendingUp, Users, BookOpen, Award, Crown,
  Flame, Sparkles, Brain, Eye
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { character, updateStreak } = useGame();

  useEffect(() => {
    if (character) {
      updateStreak();
    }
  }, [character, updateStreak]);

  if (!character) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">No Character Found</h2>
          <Link
            to="/character-creation"
            className="px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm sm:text-base"
          >
            Create Character
          </Link>
        </div>
      </div>
    );
  }

  const totalSkillPoints = Object.values(character.skills).reduce((sum, skill) => sum + skill, 0);
  const experienceToNextLevel = 1000 - (character.experience % 1000);
  const currentLevelProgress = (character.experience % 1000) / 1000 * 100;

  const quickActions = [
    {
      title: 'Master Skills',
      description: 'Train your abilities and unlock new powers',
      icon: <Zap className="w-5 h-5 sm:w-6 sm:h-6" />,
      link: '/skills',
      color: 'from-cyan-500 to-blue-600',
      points: `+${character.skillPoints} pts`
    },
    {
      title: 'Unlock Careers',
      description: 'Discover legendary professions',
      icon: <Target className="w-5 h-5 sm:w-6 sm:h-6" />,
      link: '/careers',
      color: 'from-purple-500 to-pink-600',
      points: `+${character.careerPoints} pts`
    },
    {
      title: 'Epic Quests',
      description: 'Complete missions and challenges',
      icon: <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />,
      link: '/quests',
      color: 'from-green-500 to-teal-600',
      points: `+${character.questPoints} pts`
    },
    {
      title: 'Battle Arena',
      description: 'Compete in skill-based duels',
      icon: <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />,
      link: '/games',
      color: 'from-orange-500 to-red-600',
      points: `+${character.battlePoints} pts`
    }
  ];

  const achievements = [
    {
      id: 'first-career',
      name: 'Career Pioneer',
      description: 'Unlock your first career',
      icon: <Star className="w-4 h-4 sm:w-5 sm:h-5" />,
      unlocked: character.unlockedCareers.length >= 1
    },
    {
      id: 'skill-master',
      name: 'Skill Master',
      description: 'Reach level 5 in any skill',
      icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5" />,
      unlocked: Object.values(character.skills).some(skill => skill >= 5)
    },
    {
      id: 'legend-seeker',
      name: 'Legend Seeker',
      description: 'Unlock a legendary career',
      icon: <Crown className="w-4 h-4 sm:w-5 sm:h-5" />,
      unlocked: character.achievements.includes('legend-seeker')
    },
    {
      id: 'streak-warrior',
      name: 'Streak Warrior',
      description: 'Maintain a 7-day streak',
      icon: <Flame className="w-4 h-4 sm:w-5 sm:h-5" />,
      unlocked: character.streak >= 7
    }
  ];

  const getStreakMessage = () => {
    if (character.streak === 0) return "Start your journey today!";
    if (character.streak < 3) return "Building momentum...";
    if (character.streak < 7) return "On fire! Keep it up!";
    if (character.streak < 14) return "Legendary streak!";
    return "Unstoppable force!";
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Welcome Header with Points */}
        <div className="mb-6 sm:mb-8 bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 font-orbitron">
                Welcome back, {character.name}!
              </h1>
              <p className="text-slate-300 font-inter mb-2 text-sm sm:text-base">
                {character.faction.replace('-', ' ')} • Level {character.level} Adventurer
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm space-y-1 sm:space-y-0">
                <div className="flex items-center text-yellow-400">
                  <Flame className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span>{character.streak} day streak</span>
                </div>
                <span className="hidden sm:inline text-slate-400">•</span>
                <span className="text-cyan-400">{getStreakMessage()}</span>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <div className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text font-orbitron">
                {character.totalPoints.toLocaleString()}
              </div>
              <div className="text-slate-400 text-xs sm:text-sm">Total Points</div>
            </div>
          </div>
        </div>

        {/* Enhanced Character Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border border-cyan-500 rounded-lg sm:rounded-xl p-3 sm:p-6">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div className="text-cyan-400">
                <Star className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="text-right">
                <div className="text-lg sm:text-2xl font-bold text-white font-orbitron">
                  Level {character.level}
                </div>
                <div className="text-cyan-400 text-xs sm:text-sm">
                  {experienceToNextLevel} XP to next
                </div>
              </div>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-1.5 sm:h-2">
              <div
                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                style={{ width: `${currentLevelProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500 rounded-lg sm:rounded-xl p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="text-purple-400">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="text-right">
                <div className="text-lg sm:text-2xl font-bold text-white font-orbitron">
                  {totalSkillPoints}
                </div>
                <div className="text-purple-400 text-xs sm:text-sm">Skill Power</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900/50 to-teal-900/50 border border-green-500 rounded-lg sm:rounded-xl p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="text-green-400">
                <Target className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="text-right">
                <div className="text-lg sm:text-2xl font-bold text-white font-orbitron">
                  {character.unlockedCareers.length}
                </div>
                <div className="text-green-400 text-xs sm:text-sm">Careers Mastered</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border border-orange-500 rounded-lg sm:rounded-xl p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="text-orange-400">
                <Award className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="text-right">
                <div className="text-lg sm:text-2xl font-bold text-white font-orbitron">
                  {character.achievements.length}
                </div>
                <div className="text-orange-400 text-xs sm:text-sm">Achievements</div>
              </div>
            </div>
          </div>
        </div>

        {/* Points Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-cyan-400 font-bold text-sm sm:text-lg font-orbitron">
              {character.skillPoints.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400">Skill Points</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-purple-400 font-bold text-sm sm:text-lg font-orbitron">
              {character.careerPoints.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400">Career Points</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-green-400 font-bold text-sm sm:text-lg font-orbitron">
              {character.questPoints.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400">Quest Points</div>
          </div>
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3 sm:p-4 text-center">
            <div className="text-orange-400 font-bold text-sm sm:text-lg font-orbitron">
              {character.battlePoints.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400">Battle Points</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 font-orbitron">
            Power Up Your Journey
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="group bg-slate-900/50 border border-slate-700 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className={`bg-gradient-to-br ${action.color} rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-3 sm:mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                  {action.icon}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 font-orbitron">
                  {action.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm font-inter mb-2">
                  {action.description}
                </p>
                <div className="text-xs text-cyan-400 font-semibold">
                  {action.points}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 font-orbitron">
            Legendary Achievements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-3 sm:p-4 rounded-lg border transition-all duration-300 ${
                  achievement.unlocked
                    ? 'bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500 shadow-yellow-500/20 shadow-lg'
                    : 'bg-slate-900/50 border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className={`p-1.5 sm:p-2 rounded-full ${
                    achievement.unlocked
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                      : 'bg-slate-700 text-slate-400'
                  }`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className={`font-bold text-xs sm:text-sm font-orbitron ${
                      achievement.unlocked ? 'text-yellow-400' : 'text-slate-400'
                    }`}>
                      {achievement.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Overview */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg sm:rounded-xl p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 font-orbitron flex items-center">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-purple-400" />
            Power Levels
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {Object.entries(character.skills).map(([skill, level]) => (
              <div key={skill} className="text-center">
                <div className="text-sm sm:text-lg font-bold text-white mb-2 capitalize font-orbitron">
                  {skill}
                </div>
                <div className="relative">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-slate-700"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${level * 17.6} 176`}
                      className={`${level >= 8 ? 'text-purple-400' : level >= 5 ? 'text-cyan-400' : 'text-green-400'} transition-all duration-500`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg sm:text-xl font-bold text-white font-orbitron">{level}</span>
                  </div>
                </div>
                <div className="mt-2">
                  {level >= 8 && <div className="text-xs text-purple-400">Master</div>}
                  {level >= 5 && level < 8 && <div className="text-xs text-cyan-400">Expert</div>}
                  {level < 5 && <div className="text-xs text-slate-400">Novice</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;