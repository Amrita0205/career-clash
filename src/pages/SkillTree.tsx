import React from 'react';
import { useGame } from '../contexts/GameContext';
import Navigation from '../components/Navigation';
import { Zap, Brain, Palette, Users, Code, TrendingUp, Plus, Star, Crown, Flame } from 'lucide-react';

const SkillTree: React.FC = () => {
  const { character, updateSkill, addExperience, addPoints, unlockAchievement } = useGame();

  if (!character) return null;

  const skillData = {
    logic: {
      name: 'Logic',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-blue-400 to-cyan-500',
      description: 'Master of analytical thinking and problem-solving',
      careers: ['Data Wizard', 'Quantum Architect', 'AI Whisperer'],
      pointsPerLevel: 25
    },
    creativity: {
      name: 'Creativity',
      icon: <Palette className="w-6 h-6" />,
      color: 'from-purple-400 to-pink-500',
      description: 'Wielder of innovation and artistic expression',
      careers: ['Visuarch', 'Brandmancer', 'Metaverse God'],
      pointsPerLevel: 25
    },
    leadership: {
      name: 'Leadership',
      icon: <Users className="w-6 h-6" />,
      color: 'from-green-400 to-teal-500',
      description: 'Commander of teams and strategic vision',
      careers: ['Product Overlord', 'Metaverse God', 'Growth Hacker'],
      pointsPerLevel: 30
    },
    technical: {
      name: 'Technical',
      icon: <Code className="w-6 h-6" />,
      color: 'from-orange-400 to-red-500',
      description: 'Engineer of digital realms and systems',
      careers: ['Codeforger', 'Quantum Architect', 'Crypto Alchemist'],
      pointsPerLevel: 30
    },
    social: {
      name: 'Social',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-indigo-400 to-purple-500',
      description: 'Master of communication and influence',
      careers: ['Brandmancer', 'AI Whisperer', 'Growth Hacker'],
      pointsPerLevel: 20
    }
  };

  const handleSkillIncrease = (skill: keyof typeof character.skills) => {
    const currentLevel = character.skills[skill];
    if (currentLevel >= 10) return;

    const pointsAwarded = skillData[skill].pointsPerLevel;
    
    updateSkill(skill, 1);
    addExperience(pointsAwarded * 2);
    addPoints('skill', pointsAwarded);
    
    // Show skill up notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 left-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white p-4 rounded-lg shadow-lg z-50 animate-bounce';
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <span class="text-2xl">⚡</span>
        <div>
          <div class="font-bold">${skillData[skill].name} Level Up!</div>
          <div class="text-sm">+${pointsAwarded} Skill Points</div>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);

    // Check for achievements
    if (currentLevel + 1 >= 5) {
      unlockAchievement('skill-master');
    }
    if (currentLevel + 1 >= 8) {
      unlockAchievement('skill-grandmaster');
    }
  };

  const canUpgradeSkill = (currentLevel: number) => {
    return currentLevel < 10;
  };

  const getSkillTitle = (level: number) => {
    if (level >= 10) return 'Grandmaster';
    if (level >= 8) return 'Master';
    if (level >= 5) return 'Expert';
    if (level >= 3) return 'Adept';
    return 'Novice';
  };

  const getSkillTitleColor = (level: number) => {
    if (level >= 10) return 'text-purple-400';
    if (level >= 8) return 'text-orange-400';
    if (level >= 5) return 'text-cyan-400';
    if (level >= 3) return 'text-green-400';
    return 'text-slate-400';
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 font-orbitron">
            Power Development
          </h1>
          <p className="text-slate-300 font-inter">
            Master your abilities to unlock legendary careers and earn massive points
          </p>
        </div>

        {/* Skill Points Display */}
        <div className="bg-gradient-to-r from-cyan-900/50 to-purple-900/50 border border-cyan-500 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white font-orbitron">Skill Points Earned</h2>
              <p className="text-slate-300">Power up your abilities to unlock new possibilities</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-orbitron">
                {character.skillPoints.toLocaleString()}
              </div>
              <div className="text-slate-400">Total Skill Points</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {Object.entries(character.skills).map(([skillKey, level]) => {
            const skill = skillData[skillKey as keyof typeof skillData];
            const progressPercentage = (level / 10) * 100;
            const skillTitle = getSkillTitle(level);
            const titleColor = getSkillTitleColor(level);
            
            return (
              <div key={skillKey} className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:border-purple-500 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`bg-gradient-to-br ${skill.color} rounded-full p-3 text-white group-hover:scale-110 transition-transform duration-300`}>
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white font-orbitron">
                        {skill.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <p className="text-slate-400 text-sm">
                          Level {level}/10
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${skill.color} text-white font-semibold ${titleColor}`}>
                          {skillTitle}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {canUpgradeSkill(level) && (
                    <button
                      onClick={() => handleSkillIncrease(skillKey as keyof typeof character.skills)}
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white p-3 rounded-full hover:from-cyan-600 hover:to-purple-700 transform hover:scale-110 transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  )}
                  
                  {level >= 10 && (
                    <div className="text-purple-400 animate-pulse">
                      <Crown className="w-8 h-8" />
                    </div>
                  )}
                </div>

                <p className="text-slate-300 text-sm mb-4 font-inter">
                  {skill.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-slate-400 mb-2">
                    <span>Power Level</span>
                    <span>+{skill.pointsPerLevel} pts per level</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${skill.color} h-4 rounded-full transition-all duration-500 relative`}
                      style={{ width: `${progressPercentage}%` }}
                    >
                      {level >= 5 && (
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      )}
                    </div>
                  </div>
                  <div className="text-center mt-1">
                    <span className={`text-lg font-bold ${titleColor} font-orbitron`}>
                      {progressPercentage.toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Related Careers */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-slate-400 mb-2">Unlocks Careers:</h4>
                  <div className="space-y-1">
                    {skill.careers.map((career, index) => (
                      <div key={index} className="flex items-center text-xs text-slate-300">
                        <Zap className="w-3 h-3 mr-1 text-cyan-400" />
                        {career}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skill Bonuses */}
                {level >= 3 && (
                  <div className="mb-2 p-3 bg-gradient-to-r from-green-900/20 to-teal-900/20 border border-green-500/30 rounded-lg">
                    <div className="text-xs text-green-400 font-semibold mb-1 flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Adept Bonus Active!
                    </div>
                    <div className="text-xs text-slate-300">
                      +{Math.floor(level / 3) * 10}% career matching bonus
                    </div>
                  </div>
                )}

                {level >= 5 && (
                  <div className="mb-2 p-3 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg">
                    <div className="text-xs text-cyan-400 font-semibold mb-1 flex items-center">
                      <Zap className="w-3 h-3 mr-1" />
                      Expert Mastery Unlocked!
                    </div>
                    <div className="text-xs text-slate-300">
                      Unlocks rare career paths
                    </div>
                  </div>
                )}

                {level >= 8 && (
                  <div className="mb-2 p-3 bg-gradient-to-r from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-lg">
                    <div className="text-xs text-orange-400 font-semibold mb-1 flex items-center">
                      <Flame className="w-3 h-3 mr-1" />
                      Master Level Achieved!
                    </div>
                    <div className="text-xs text-slate-300">
                      Unlocks legendary careers
                    </div>
                  </div>
                )}

                {level >= 10 && (
                  <div className="p-3 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg">
                    <div className="text-xs text-purple-400 font-semibold mb-1 flex items-center">
                      <Crown className="w-3 h-3 mr-1" />
                      Grandmaster Status!
                    </div>
                    <div className="text-xs text-slate-300">
                      Maximum power achieved! Unlocks hidden careers
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Enhanced Skill Combination Hints */}
        <div className="mt-12 bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4 font-orbitron flex items-center">
            <Crown className="w-6 h-6 mr-3 text-purple-400" />
            Legendary Career Combinations
          </h2>
          <p className="text-slate-300 mb-6 font-inter">
            Master specific skill combinations to unlock the most powerful and highest-paying career paths
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Crown className="w-5 h-5 text-purple-400 mr-2" />
                <div className="text-purple-400 font-semibold">Metaverse God</div>
              </div>
              <div className="text-sm text-slate-300 mb-2">
                Requires: Creativity (9+) + Technical (8+) + Leadership (7+)
              </div>
              <div className="text-xs text-purple-300 mb-1">
                💰 Salary: $250K - $500K
              </div>
              <div className="text-xs text-yellow-400">
                ⭐ 1000 Career Points
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Brain className="w-5 h-5 text-cyan-400 mr-2" />
                <div className="text-cyan-400 font-semibold">Quantum Architect</div>
              </div>
              <div className="text-sm text-slate-300 mb-2">
                Requires: Technical (9+) + Logic (8+) + Creativity (7+)
              </div>
              <div className="text-xs text-cyan-300 mb-1">
                💰 Salary: $200K - $400K
              </div>
              <div className="text-xs text-yellow-400">
                ⭐ 750 Career Points
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-900/30 to-teal-900/30 border border-green-500/50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Code className="w-5 h-5 text-green-400 mr-2" />
                <div className="text-green-400 font-semibold">Codeforger</div>
              </div>
              <div className="text-sm text-slate-300 mb-2">
                Requires: Technical (8+) + Logic (7+) + Creativity (5+)
              </div>
              <div className="text-xs text-green-300 mb-1">
                💰 Salary: $120K - $250K
              </div>
              <div className="text-xs text-yellow-400">
                ⭐ 500 Career Points
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-500/50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Palette className="w-5 h-5 text-orange-400 mr-2" />
                <div className="text-orange-400 font-semibold">Brandmancer</div>
              </div>
              <div className="text-sm text-slate-300 mb-2">
                Requires: Creativity (7+) + Social (6+) + Logic (5+)
              </div>
              <div className="text-xs text-orange-300 mb-1">
                💰 Salary: $95K - $180K
              </div>
              <div className="text-xs text-yellow-400">
                ⭐ 350 Career Points
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Users className="w-5 h-5 text-indigo-400 mr-2" />
                <div className="text-indigo-400 font-semibold">AI Whisperer</div>
              </div>
              <div className="text-sm text-slate-300 mb-2">
                Requires: Technical (8+) + Social (7+) + Logic (6+)
              </div>
              <div className="text-xs text-indigo-300 mb-1">
                💰 Salary: $180K - $350K
              </div>
              <div className="text-xs text-yellow-400">
                ⭐ 650 Career Points
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border border-yellow-500/50 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Flame className="w-5 h-5 text-yellow-400 mr-2" />
                <div className="text-yellow-400 font-semibold">Crypto Alchemist</div>
              </div>
              <div className="text-sm text-slate-300 mb-2">
                Requires: Technical (7+) + Logic (6+) + Creativity (4+)
              </div>
              <div className="text-xs text-yellow-300 mb-1">
                💰 Salary: $140K - $300K
              </div>
              <div className="text-xs text-yellow-400">
                ⭐ 400 Career Points
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillTree;