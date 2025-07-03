import React from 'react';
import { useGame } from '../contexts/GameContext';
import { 
  Trophy, Star, Crown, Flame, Target, Users, 
  Zap, Award, Shield, Sword, Brain, Heart
} from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: string;
  points: number;
  requirement: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

const AchievementSystem: React.FC = () => {
  const { character } = useGame();

  if (!character) return null;

  const achievements: Achievement[] = [
    // Career Achievements
    {
      id: 'first-career',
      name: 'Career Pioneer',
      description: 'Unlock your first career path',
      icon: <Star className="w-6 h-6" />,
      rarity: 'common',
      category: 'Career',
      points: 100,
      requirement: 'Unlock 1 career',
      unlocked: character.unlockedCareers.length >= 1,
      progress: character.unlockedCareers.length,
      maxProgress: 1
    },
    {
      id: 'career-explorer',
      name: 'Career Explorer',
      description: 'Unlock 5 different career paths',
      icon: <Target className="w-6 h-6" />,
      rarity: 'rare',
      category: 'Career',
      points: 250,
      requirement: 'Unlock 5 careers',
      unlocked: character.unlockedCareers.length >= 5,
      progress: character.unlockedCareers.length,
      maxProgress: 5
    },
    {
      id: 'career-master',
      name: 'Career Master',
      description: 'Unlock 10 different career paths',
      icon: <Crown className="w-6 h-6" />,
      rarity: 'epic',
      category: 'Career',
      points: 500,
      requirement: 'Unlock 10 careers',
      unlocked: character.unlockedCareers.length >= 10,
      progress: character.unlockedCareers.length,
      maxProgress: 10
    },
    {
      id: 'legend-seeker',
      name: 'Legend Seeker',
      description: 'Unlock a legendary career',
      icon: <Crown className="w-6 h-6" />,
      rarity: 'legendary',
      category: 'Career',
      points: 1000,
      requirement: 'Unlock any legendary career',
      unlocked: character.achievements.includes('legend-seeker'),
      progress: character.achievements.includes('legend-seeker') ? 1 : 0,
      maxProgress: 1
    },

    // Skill Achievements
    {
      id: 'skill-novice',
      name: 'Skill Novice',
      description: 'Reach level 3 in any skill',
      icon: <Zap className="w-6 h-6" />,
      rarity: 'common',
      category: 'Skills',
      points: 100,
      requirement: 'Reach level 3 in any skill',
      unlocked: Object.values(character.skills).some(skill => skill >= 3),
      progress: Math.max(...Object.values(character.skills)),
      maxProgress: 3
    },
    {
      id: 'skill-master',
      name: 'Skill Master',
      description: 'Reach level 5 in any skill',
      icon: <Brain className="w-6 h-6" />,
      rarity: 'rare',
      category: 'Skills',
      points: 300,
      requirement: 'Reach level 5 in any skill',
      unlocked: Object.values(character.skills).some(skill => skill >= 5),
      progress: Math.max(...Object.values(character.skills)),
      maxProgress: 5
    },
    {
      id: 'skill-grandmaster',
      name: 'Skill Grandmaster',
      description: 'Reach level 8 in any skill',
      icon: <Crown className="w-6 h-6" />,
      rarity: 'epic',
      category: 'Skills',
      points: 750,
      requirement: 'Reach level 8 in any skill',
      unlocked: Object.values(character.skills).some(skill => skill >= 8),
      progress: Math.max(...Object.values(character.skills)),
      maxProgress: 8
    },
    {
      id: 'skill-legend',
      name: 'Skill Legend',
      description: 'Reach maximum level (10) in any skill',
      icon: <Crown className="w-6 h-6" />,
      rarity: 'legendary',
      category: 'Skills',
      points: 1500,
      requirement: 'Reach level 10 in any skill',
      unlocked: Object.values(character.skills).some(skill => skill >= 10),
      progress: Math.max(...Object.values(character.skills)),
      maxProgress: 10
    },
    {
      id: 'well-rounded',
      name: 'Well Rounded',
      description: 'Reach level 5 in all skills',
      icon: <Shield className="w-6 h-6" />,
      rarity: 'epic',
      category: 'Skills',
      points: 1000,
      requirement: 'Reach level 5 in all skills',
      unlocked: Object.values(character.skills).every(skill => skill >= 5),
      progress: Object.values(character.skills).filter(skill => skill >= 5).length,
      maxProgress: 5
    },

    // Quest Achievements
    {
      id: 'quest-starter',
      name: 'Quest Starter',
      description: 'Complete your first quest',
      icon: <Sword className="w-6 h-6" />,
      rarity: 'common',
      category: 'Quests',
      points: 100,
      requirement: 'Complete 1 quest',
      unlocked: character.completedQuests.length >= 1,
      progress: character.completedQuests.length,
      maxProgress: 1
    },
    {
      id: 'quest-master',
      name: 'Quest Master',
      description: 'Complete 3 quests',
      icon: <Trophy className="w-6 h-6" />,
      rarity: 'rare',
      category: 'Quests',
      points: 300,
      requirement: 'Complete 3 quests',
      unlocked: character.completedQuests.length >= 3,
      progress: character.completedQuests.length,
      maxProgress: 3
    },
    {
      id: 'legend-slayer',
      name: 'Legend Slayer',
      description: 'Complete a legendary quest',
      icon: <Crown className="w-6 h-6" />,
      rarity: 'legendary',
      category: 'Quests',
      points: 1000,
      requirement: 'Complete any legendary quest',
      unlocked: character.achievements.includes('legend-slayer'),
      progress: character.achievements.includes('legend-slayer') ? 1 : 0,
      maxProgress: 1
    },

    // Social Achievements
    {
      id: 'streak-warrior',
      name: 'Streak Warrior',
      description: 'Maintain a 7-day activity streak',
      icon: <Flame className="w-6 h-6" />,
      rarity: 'rare',
      category: 'Social',
      points: 400,
      requirement: 'Maintain 7-day streak',
      unlocked: character.streak >= 7,
      progress: character.streak,
      maxProgress: 7
    },
    {
      id: 'dedication',
      name: 'Dedication',
      description: 'Maintain a 30-day activity streak',
      icon: <Heart className="w-6 h-6" />,
      rarity: 'epic',
      category: 'Social',
      points: 1000,
      requirement: 'Maintain 30-day streak',
      unlocked: character.streak >= 30,
      progress: character.streak,
      maxProgress: 30
    },

    // Battle Achievements
    {
      id: 'first-victory',
      name: 'First Victory',
      description: 'Win your first battle',
      icon: <Sword className="w-6 h-6" />,
      rarity: 'common',
      category: 'Battle',
      points: 150,
      requirement: 'Win 1 battle',
      unlocked: character.battlePoints > 0,
      progress: character.battlePoints > 0 ? 1 : 0,
      maxProgress: 1
    },
    {
      id: 'giant-slayer',
      name: 'Giant Slayer',
      description: 'Defeat a hard difficulty opponent',
      icon: <Crown className="w-6 h-6" />,
      rarity: 'epic',
      category: 'Battle',
      points: 750,
      requirement: 'Defeat hard opponent',
      unlocked: character.achievements.includes('giant-slayer'),
      progress: character.achievements.includes('giant-slayer') ? 1 : 0,
      maxProgress: 1
    },

    // Point Achievements
    {
      id: 'point-collector',
      name: 'Point Collector',
      description: 'Earn 1,000 total points',
      icon: <Star className="w-6 h-6" />,
      rarity: 'common',
      category: 'Points',
      points: 200,
      requirement: 'Earn 1,000 points',
      unlocked: character.totalPoints >= 1000,
      progress: character.totalPoints,
      maxProgress: 1000
    },
    {
      id: 'point-master',
      name: 'Point Master',
      description: 'Earn 5,000 total points',
      icon: <Trophy className="w-6 h-6" />,
      rarity: 'rare',
      category: 'Points',
      points: 500,
      requirement: 'Earn 5,000 points',
      unlocked: character.totalPoints >= 5000,
      progress: character.totalPoints,
      maxProgress: 5000
    },
    {
      id: 'point-legend',
      name: 'Point Legend',
      description: 'Earn 10,000 total points',
      icon: <Crown className="w-6 h-6" />,
      rarity: 'legendary',
      category: 'Points',
      points: 1500,
      requirement: 'Earn 10,000 points',
      unlocked: character.totalPoints >= 10000,
      progress: character.totalPoints,
      maxProgress: 10000
    }
  ];

  const rarityColors = {
    common: 'from-gray-400 to-gray-500',
    rare: 'from-blue-400 to-blue-500',
    epic: 'from-purple-400 to-purple-500',
    legendary: 'from-yellow-400 via-orange-500 to-red-500'
  };

  const rarityGlow = {
    common: 'shadow-gray-500/20',
    rare: 'shadow-blue-500/30',
    epic: 'shadow-purple-500/40',
    legendary: 'shadow-yellow-500/50 animate-pulse'
  };

  const categories = [...new Set(achievements.map(a => a.category))];
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const totalPoints = unlockedAchievements.reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="space-y-8">
      {/* Achievement Stats */}
      <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-purple-500 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white font-orbitron">
              {unlockedAchievements.length}
            </div>
            <div className="text-slate-400">Unlocked</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 font-orbitron">
              {totalPoints.toLocaleString()}
            </div>
            <div className="text-slate-400">Achievement Points</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 font-orbitron">
              {Math.round((unlockedAchievements.length / achievements.length) * 100)}%
            </div>
            <div className="text-slate-400">Completion</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 font-orbitron">
              {unlockedAchievements.filter(a => a.rarity === 'legendary').length}
            </div>
            <div className="text-slate-400">Legendary</div>
          </div>
        </div>
      </div>

      {/* Achievement Categories */}
      {categories.map(category => {
        const categoryAchievements = achievements.filter(a => a.category === category);
        const unlockedInCategory = categoryAchievements.filter(a => a.unlocked).length;
        
        return (
          <div key={category} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white font-orbitron">
                {category} Achievements
              </h3>
              <div className="text-slate-400">
                {unlockedInCategory}/{categoryAchievements.length}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryAchievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`bg-slate-900/50 border rounded-xl p-6 transition-all duration-300 ${
                    achievement.unlocked
                      ? `border-green-500 ${rarityGlow[achievement.rarity]} shadow-lg`
                      : 'border-slate-700 opacity-75'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`bg-gradient-to-br ${rarityColors[achievement.rarity]} rounded-full p-3 text-white ${achievement.rarity === 'legendary' ? 'animate-pulse' : ''}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white font-orbitron">
                        {achievement.name}
                      </h4>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${rarityColors[achievement.rarity]} text-white capitalize font-semibold`}>
                          {achievement.rarity}
                        </span>
                        <div className="flex items-center text-yellow-400">
                          <Star className="w-3 h-3 mr-1" />
                          <span className="text-xs font-bold">{achievement.points}</span>
                        </div>
                      </div>
                    </div>
                    {achievement.unlocked && (
                      <div className="text-green-400">
                        <Trophy className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  <p className="text-slate-300 text-sm mb-4">
                    {achievement.description}
                  </p>

                  <div className="space-y-2">
                    <div className="text-xs text-slate-400">
                      {achievement.requirement}
                    </div>
                    
                    {achievement.maxProgress && achievement.maxProgress > 1 && (
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Progress</span>
                          <span className={achievement.unlocked ? 'text-green-400' : 'text-slate-400'}>
                            {Math.min(achievement.progress || 0, achievement.maxProgress)}/{achievement.maxProgress}
                          </span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${
                              achievement.unlocked 
                                ? 'from-green-400 to-green-500' 
                                : rarityColors[achievement.rarity]
                            } h-2 rounded-full transition-all duration-500`}
                            style={{ 
                              width: `${Math.min(((achievement.progress || 0) / achievement.maxProgress) * 100, 100)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {achievement.unlocked && (
                    <div className="mt-4 p-3 bg-gradient-to-r from-green-900/20 to-teal-900/20 border border-green-500/30 rounded-lg">
                      <div className="flex items-center justify-center space-x-2">
                        <Trophy className="w-4 h-4 text-yellow-400" />
                        <span className="text-green-400 text-sm font-semibold">Achievement Unlocked!</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AchievementSystem;