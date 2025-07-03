import React from 'react';
import { useGame } from '../contexts/GameContext';
import Navigation from '../components/Navigation';
import { 
  BookOpen, Star, Clock, Trophy, Target, 
  Code, Users, Lightbulb, TrendingUp, CheckCircle,
  Zap, Crown, Flame, Award, Sparkles
} from 'lucide-react';

const Quests: React.FC = () => {
  const { character, completeQuest, updateSkill, addExperience, addPoints, unlockAchievement } = useGame();

  if (!character) return null;

  const quests = [
    {
      id: 'first-code',
      title: 'First Lines of Code',
      description: 'Complete a basic programming challenge to understand the fundamentals of digital sorcery',
      category: 'Technical',
      difficulty: 'Beginner',
      duration: '15 minutes',
      rewards: {
        experience: 150,
        skills: { technical: 1, logic: 1 },
        points: 100
      },
      requirements: {},
      icon: <Code className="w-6 h-6" />,
      tasks: [
        'Learn about variables and data types',
        'Write your first "Hello World" spell',
        'Complete a simple calculation challenge',
        'Debug a broken code fragment'
      ]
    },
    {
      id: 'design-thinking',
      title: 'Creative Vision Quest',
      description: 'Master the art of user-centered design through mystical exercises and creative challenges',
      category: 'Creative',
      difficulty: 'Beginner',
      duration: '30 minutes',
      rewards: {
        experience: 200,
        skills: { creativity: 2, social: 1 },
        points: 150
      },
      requirements: {},
      icon: <Lightbulb className="w-6 h-6" />,
      tasks: [
        'Channel user personas from the digital realm',
        'Map the journey of a thousand users',
        'Craft wireframes with mystical precision',
        'Present your vision to the design council'
      ]
    },
    {
      id: 'team-leadership',
      title: 'Command the Digital Legion',
      description: 'Lead virtual armies and master the art of team coordination in simulated battlefields',
      category: 'Leadership',
      difficulty: 'Intermediate',
      duration: '45 minutes',
      rewards: {
        experience: 300,
        skills: { leadership: 2, social: 2 },
        points: 250
      },
      requirements: { social: 3, leadership: 2 },
      icon: <Users className="w-6 h-6" />,
      tasks: [
        'Conduct a war council meeting',
        'Resolve conflicts between faction members',
        'Create battle strategies and timelines',
        'Inspire your team to victory'
      ]
    },
    {
      id: 'data-divination',
      title: 'Data Divination Mastery',
      description: 'Peer into the crystal ball of data and extract prophetic insights from digital realms',
      category: 'Technical',
      difficulty: 'Intermediate',
      duration: '60 minutes',
      rewards: {
        experience: 400,
        skills: { logic: 3, technical: 2 },
        points: 350
      },
      requirements: { logic: 4, technical: 3 },
      icon: <TrendingUp className="w-6 h-6" />,
      tasks: [
        'Cleanse corrupted datasets with purification spells',
        'Perform statistical divination rituals',
        'Create mystical data visualizations',
        'Present prophecies to the data council'
      ]
    },
    {
      id: 'startup-conquest',
      title: 'Startup Empire Building',
      description: 'Forge a business empire from nothing and present your vision to the investor dragons',
      category: 'Leadership',
      difficulty: 'Advanced',
      duration: '90 minutes',
      rewards: {
        experience: 600,
        skills: { creativity: 2, leadership: 3, social: 2 },
        points: 500
      },
      requirements: { creativity: 5, leadership: 4, social: 4 },
      icon: <Target className="w-6 h-6" />,
      tasks: [
        'Identify a problem plaguing the digital realm',
        'Craft an innovative solution with magical properties',
        'Summon financial projections from the void',
        'Face the dragon investors in epic pitch battle'
      ]
    },
    {
      id: 'ai-ethics-trial',
      title: 'The Great AI Ethics Trial',
      description: 'Navigate the treacherous waters of AI consciousness and make decisions that shape digital destiny',
      category: 'Technical',
      difficulty: 'Advanced',
      duration: '75 minutes',
      rewards: {
        experience: 550,
        skills: { logic: 3, social: 2, technical: 2 },
        points: 450
      },
      requirements: { logic: 6, technical: 5, social: 4 },
      icon: <Star className="w-6 h-6" />,
      tasks: [
        'Judge AI bias cases in the digital court',
        'Craft ethical guidelines for artificial minds',
        'Debate with AI consciousness representatives',
        'Present your verdict to the tech council'
      ]
    },
    // New Epic Quests
    {
      id: 'metaverse-creation',
      title: 'Forge a Digital Universe',
      description: 'Create an entire metaverse realm with its own laws of physics and digital inhabitants',
      category: 'Creative',
      difficulty: 'Legendary',
      duration: '120 minutes',
      rewards: {
        experience: 1000,
        skills: { creativity: 3, technical: 3, leadership: 2 },
        points: 750
      },
      requirements: { creativity: 7, technical: 6, leadership: 5 },
      icon: <Crown className="w-6 h-6" />,
      tasks: [
        'Design the fundamental laws of your universe',
        'Create diverse digital ecosystems',
        'Program AI inhabitants with unique personalities',
        'Establish governance systems for your realm',
        'Launch your universe to the public'
      ]
    },
    {
      id: 'quantum-breakthrough',
      title: 'Quantum Computing Breakthrough',
      description: 'Solve impossible problems using quantum algorithms and reshape computational reality',
      category: 'Technical',
      difficulty: 'Legendary',
      duration: '100 minutes',
      rewards: {
        experience: 900,
        skills: { technical: 4, logic: 3 },
        points: 700
      },
      requirements: { technical: 8, logic: 7 },
      icon: <Zap className="w-6 h-6" />,
      tasks: [
        'Master quantum superposition principles',
        'Design quantum algorithms for real problems',
        'Simulate quantum entanglement effects',
        'Present breakthrough to quantum council'
      ]
    }
  ];

  const difficultyColors = {
    'Beginner': 'from-green-400 to-green-500',
    'Intermediate': 'from-yellow-400 to-orange-500',
    'Advanced': 'from-red-400 to-red-500',
    'Legendary': 'from-purple-400 via-pink-500 to-orange-500'
  };

  const difficultyGlow = {
    'Beginner': 'shadow-green-500/20',
    'Intermediate': 'shadow-orange-500/30',
    'Advanced': 'shadow-red-500/40',
    'Legendary': 'shadow-purple-500/50 animate-pulse'
  };

  const categoryColors = {
    'Technical': 'from-blue-400 to-cyan-500',
    'Creative': 'from-purple-400 to-pink-500',
    'Leadership': 'from-green-400 to-teal-500'
  };

  const canStartQuest = (quest: any) => {
    return Object.entries(quest.requirements).every(([skill, required]) => 
      character.skills[skill as keyof typeof character.skills] >= (required as number)
    );
  };

  const isCompleted = (questId: string) => {
    return character.completedQuests.includes(questId);
  };

  const handleStartQuest = (quest: any) => {
    // Simulate quest completion after a short delay
    const completionTime = quest.difficulty === 'Legendary' ? 4000 : 
                          quest.difficulty === 'Advanced' ? 3000 : 2000;
    
    // Show quest start notification
    const startNotification = document.createElement('div');
    startNotification.className = 'fixed top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg shadow-lg z-50';
    startNotification.innerHTML = `
      <div class="flex items-center space-x-2">
        <span class="text-2xl">⚔️</span>
        <div>
          <div class="font-bold">Quest Started!</div>
          <div class="text-sm">${quest.title}</div>
        </div>
      </div>
    `;
    document.body.appendChild(startNotification);
    
    setTimeout(() => {
      document.body.removeChild(startNotification);
    }, 2000);

    setTimeout(() => {
      completeQuest(quest.id);
      addExperience(quest.rewards.experience);
      addPoints('quest', quest.rewards.points);
      
      // Update skills
      Object.entries(quest.rewards.skills).forEach(([skill, points]) => {
        updateSkill(skill as keyof typeof character.skills, points as number);
      });

      // Show completion notification
      const notification = document.createElement('div');
      notification.className = `fixed top-4 right-4 bg-gradient-to-r ${difficultyColors[quest.difficulty]} text-white p-4 rounded-lg shadow-lg z-50 animate-bounce`;
      notification.innerHTML = `
        <div class="flex items-center space-x-2">
          <span class="text-2xl">🏆</span>
          <div>
            <div class="font-bold">Quest Complete!</div>
            <div class="text-sm">+${quest.rewards.points} Quest Points</div>
            <div class="text-sm">+${quest.rewards.experience} XP</div>
          </div>
        </div>
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 4000);

      // Check for achievements
      if (character.completedQuests.length + 1 >= 3) {
        unlockAchievement('quest-master');
      }
      if (quest.difficulty === 'Legendary') {
        unlockAchievement('legend-slayer');
      }
    }, completionTime);
  };

  const availableQuests = quests.filter(quest => !isCompleted(quest.id));
  const completedQuests = quests.filter(quest => isCompleted(quest.id));

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 font-orbitron">
            Epic Career Quests
          </h1>
          <p className="text-slate-300 font-inter">
            Embark on legendary missions to master skills and earn massive points
          </p>
        </div>

        {/* Enhanced Quest Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border border-cyan-500 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="text-cyan-400">
                <BookOpen className="w-8 h-8" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white font-orbitron">
                  {availableQuests.length}
                </div>
                <div className="text-cyan-400 text-sm">Available Quests</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900/50 to-teal-900/50 border border-green-500 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="text-green-400">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white font-orbitron">
                  {completedQuests.length}
                </div>
                <div className="text-green-400 text-sm">Completed</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="text-purple-400">
                <Star className="w-8 h-8" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white font-orbitron">
                  {character.questPoints.toLocaleString()}
                </div>
                <div className="text-purple-400 text-sm">Quest Points</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 border border-orange-500 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="text-orange-400">
                <Trophy className="w-8 h-8" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white font-orbitron">
                  {Math.round((completedQuests.length / quests.length) * 100)}%
                </div>
                <div className="text-orange-400 text-sm">Completion Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Quests */}
        {availableQuests.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 font-orbitron">
              Available Epic Quests
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableQuests.map(quest => {
                const canStart = canStartQuest(quest);
                
                return (
                  <div
                    key={quest.id}
                    className={`bg-slate-900/50 border rounded-xl p-6 transition-all duration-300 ${
                      canStart
                        ? `border-purple-500 ${difficultyGlow[quest.difficulty]} shadow-lg hover:scale-105`
                        : 'border-slate-700 opacity-75'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`bg-gradient-to-br ${categoryColors[quest.category]} rounded-full p-2 text-white`}>
                          {quest.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-white font-orbitron">
                            {quest.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${difficultyColors[quest.difficulty]} text-white font-semibold ${quest.difficulty === 'Legendary' ? 'animate-pulse' : ''}`}>
                              {quest.difficulty}
                            </span>
                            <span className="text-xs text-slate-400 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {quest.duration}
                            </span>
                            <div className="flex items-center text-yellow-400">
                              <Star className="w-3 h-3 mr-1" />
                              <span className="text-xs font-bold">{quest.rewards.points}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-300 text-sm mb-4 font-inter">
                      {quest.description}
                    </p>

                    {/* Tasks */}
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-slate-400 mb-2">Epic Tasks:</h4>
                      <ul className="space-y-1">
                        {quest.tasks.map((task, index) => (
                          <li key={index} className="text-xs text-slate-300 flex items-center">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"></div>
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Enhanced Rewards */}
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-slate-400 mb-2">Legendary Rewards:</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center text-yellow-400">
                          <Star className="w-3 h-3 mr-1" />
                          {quest.rewards.experience} XP
                        </div>
                        <div className="flex items-center text-purple-400">
                          <Award className="w-3 h-3 mr-1" />
                          {quest.rewards.points} Points
                        </div>
                        {Object.entries(quest.rewards.skills).map(([skill, points]) => (
                          <div key={skill} className="flex items-center text-cyan-400">
                            <Sparkles className="w-3 h-3 mr-1" />
                            +{points} {skill}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Requirements */}
                    {Object.keys(quest.requirements).length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-slate-400 mb-2">Power Requirements:</h4>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(quest.requirements).map(([skill, required]) => {
                            const currentLevel = character.skills[skill as keyof typeof character.skills];
                            const met = currentLevel >= (required as number);
                            
                            return (
                              <span
                                key={skill}
                                className={`text-xs px-2 py-1 rounded-full ${
                                  met ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                                }`}
                              >
                                {skill}: {currentLevel}/{required}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    {canStart ? (
                      <button
                        onClick={() => handleStartQuest(quest)}
                        className={`w-full py-3 bg-gradient-to-r ${difficultyColors[quest.difficulty]} text-white font-bold rounded-lg hover:scale-105 transition-all duration-200 shadow-lg ${quest.difficulty === 'Legendary' ? 'animate-pulse' : ''}`}
                      >
                        <div className="flex items-center justify-center space-x-2">
                          <Trophy className="w-4 h-4" />
                          <span>Begin Epic Quest</span>
                        </div>
                      </button>
                    ) : (
                      <div className="w-full py-3 bg-slate-800 border border-slate-600 rounded-lg text-center">
                        <span className="text-slate-400 text-sm">Power requirements not met</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Completed Quests */}
        {completedQuests.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 font-orbitron">
              Conquered Quests
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedQuests.map(quest => (
                <div
                  key={quest.id}
                  className="bg-slate-900/30 border border-green-500/30 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="text-green-400">
                        {quest.icon}
                      </div>
                      <h3 className="font-bold text-white text-sm font-orbitron">
                        {quest.title}
                      </h3>
                    </div>
                    <Trophy className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-slate-400 text-xs">
                      Completed • +{quest.rewards.points} Points
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${difficultyColors[quest.difficulty]} text-white`}>
                      {quest.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {availableQuests.length === 0 && completedQuests.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-slate-400 opacity-50" />
            <h3 className="text-lg font-bold text-slate-400 mb-2">No quests available</h3>
            <p className="text-slate-500">Check back later for new epic challenges!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quests;