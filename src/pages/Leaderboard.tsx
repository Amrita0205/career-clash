import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import Navigation from '../components/Navigation';
import { Trophy, Star, Users, TrendingUp, Medal, Crown } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const { character } = useGame();
  const [selectedCategory, setSelectedCategory] = useState('level');

  if (!character) return null;

  // Mock leaderboard data - in a real app, this would come from an API
  const leaderboardData = {
    level: [
      { id: '1', name: 'CodeMaster_Alex', level: 15, experience: 14250, faction: 'tech-forgers' },
      { id: '2', name: 'DesignWizard_Sam', level: 13, experience: 12800, faction: 'creative-artisans' },
      { id: '3', name: 'TeamLeader_Jordan', level: 12, experience: 11900, faction: 'social-champions' },
      { id: '4', name: 'DataNinja_Riley', level: 11, experience: 10750, faction: 'knowledge-seekers' },
      { id: '5', name: 'InnovatePro_Casey', level: 10, experience: 9850, faction: 'innovation-pioneers' },
      { id: '6', name: character.name, level: character.level, experience: character.experience, faction: character.faction },
      { id: '7', name: 'TechGuru_Morgan', level: 9, experience: 8900, faction: 'tech-forgers' },
      { id: '8', name: 'CreativeCore_Blake', level: 8, experience: 7800, faction: 'creative-artisans' },
      { id: '9', name: 'SocialStar_Avery', level: 8, experience: 7650, faction: 'social-champions' },
      { id: '10', name: 'LogicLord_Quinn', level: 7, experience: 6900, faction: 'knowledge-seekers' },
    ],
    careers: [
      { id: '1', name: 'CareerExplorer_Max', careersUnlocked: 25, faction: 'innovation-pioneers' },
      { id: '2', name: 'PathFinder_Taylor', careersUnlocked: 22, faction: 'social-champions' },
      { id: '3', name: 'JobHunter_Drew', careersUnlocked: 20, faction: 'tech-forgers' },
      { id: '4', name: 'OpportunitySeeker_Lou', careersUnlocked: 18, faction: 'creative-artisans' },
      { id: '5', name: character.name, careersUnlocked: character.unlockedCareers.length, faction: character.faction },
      { id: '6', name: 'VocationVoyager_Sage', careersUnlocked: 15, faction: 'knowledge-seekers' },
      { id: '7', name: 'ProfessionPro_River', careersUnlocked: 14, faction: 'tech-forgers' },
      { id: '8', name: 'FieldFinder_Rowan', careersUnlocked: 12, faction: 'creative-artisans' },
      { id: '9', name: 'WorkWise_Phoenix', careersUnlocked: 11, faction: 'social-champions' },
      { id: '10', name: 'TradeTracker_Sage', careersUnlocked: 10, faction: 'innovation-pioneers' },
    ],
    skills: [
      { id: '1', name: 'SkillMaster_Kai', totalSkills: 45, faction: 'knowledge-seekers' },
      { id: '2', name: 'AbilityAce_Nova', totalSkills: 42, faction: 'tech-forgers' },
      { id: '3', name: 'TalentTitan_Sage', totalSkills: 40, faction: 'creative-artisans' },
      { id: '4', name: 'ExpertElite_Zara', totalSkills: 38, faction: 'social-champions' },
      { id: '5', name: character.name, totalSkills: Object.values(character.skills).reduce((sum, skill) => sum + skill, 0), faction: character.faction },
      { id: '6', name: 'ProficiencyPro_Lane', totalSkills: 35, faction: 'innovation-pioneers' },
      { id: '7', name: 'MasteryMaven_Brook', totalSkills: 33, faction: 'tech-forgers' },
      { id: '8', name: 'CompetenceKing_Jesse', totalSkills: 31, faction: 'creative-artisans' },
      { id: '9', name: 'CapabilityChamp_Sage', totalSkills: 29, faction: 'social-champions' },
      { id: '10', name: 'AdeptnessAce_Storm', totalSkills: 27, faction: 'knowledge-seekers' },
    ]
  };

  const factionNames = {
    'tech-forgers': 'Tech Forgers',
    'creative-artisans': 'Creative Artisans',
    'social-champions': 'Social Champions',
    'knowledge-seekers': 'Knowledge Seekers',
    'innovation-pioneers': 'Innovation Pioneers'
  };

  const factionColors = {
    'tech-forgers': 'from-cyan-400 to-blue-500',
    'creative-artisans': 'from-purple-400 to-pink-500',
    'social-champions': 'from-green-400 to-teal-500',
    'knowledge-seekers': 'from-orange-400 to-red-500',
    'innovation-pioneers': 'from-yellow-400 to-orange-500'
  };

  const categories = [
    { id: 'level', name: 'Level & XP', icon: <Star className="w-5 h-5" /> },
    { id: 'careers', name: 'Careers Unlocked', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'skills', name: 'Total Skills', icon: <Users className="w-5 h-5" /> },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-400" />;
      default:
        return <span className="text-slate-400 font-bold text-lg">#{rank}</span>;
    }
  };

  const getCurrentData = () => {
    const data = leaderboardData[selectedCategory as keyof typeof leaderboardData];
    return data.sort((a, b) => {
      switch (selectedCategory) {
        case 'level':
          return b.level - a.level || b.experience - a.experience;
        case 'careers':
          return b.careersUnlocked - a.careersUnlocked;
        case 'skills':
          return b.totalSkills - a.totalSkills;
        default:
          return 0;
      }
    });
  };

  const currentData = getCurrentData();
  const userRank = currentData.findIndex(player => player.name === character.name) + 1;

  const getStatValue = (player: any) => {
    switch (selectedCategory) {
      case 'level':
        return `Level ${player.level} (${player.experience.toLocaleString()} XP)`;
      case 'careers':
        return `${player.careersUnlocked} careers unlocked`;
      case 'skills':
        return `${player.totalSkills} total skill points`;
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 font-orbitron">
            Leaderboards
          </h1>
          <p className="text-slate-300 font-inter">
            See how you rank against other career explorers
          </p>
        </div>

        {/* User's Current Rank */}
        <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-purple-500 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">
                {getRankIcon(userRank)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white font-orbitron">
                  Your Rank: #{userRank}
                </h2>
                <p className="text-slate-300">
                  {getStatValue(currentData.find(p => p.name === character.name))}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className={`bg-gradient-to-r ${factionColors[character.faction]} rounded-full px-4 py-2 text-white font-semibold text-sm`}>
                {factionNames[character.faction]}
              </div>
            </div>
          </div>
        </div>

        {/* Category Selection */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {category.icon}
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-xl font-bold text-white font-orbitron flex items-center">
              <Trophy className="w-6 h-6 mr-3 text-yellow-400" />
              {categories.find(c => c.id === selectedCategory)?.name} Rankings
            </h2>
          </div>
          
          <div className="divide-y divide-slate-700">
            {currentData.slice(0, 10).map((player, index) => {
              const rank = index + 1;
              const isCurrentUser = player.name === character.name;
              
              return (
                <div
                  key={player.id}
                  className={`p-6 transition-all duration-200 ${
                    isCurrentUser
                      ? 'bg-purple-900/20 border-l-4 border-purple-500'
                      : 'hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 flex justify-center">
                        {getRankIcon(rank)}
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className={`font-bold ${isCurrentUser ? 'text-purple-300' : 'text-white'} font-orbitron`}>
                              {player.name}
                            </h3>
                            {isCurrentUser && (
                              <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                                You
                              </span>
                            )}
                          </div>
                          <p className="text-slate-400 text-sm">
                            {getStatValue(player)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`bg-gradient-to-r ${factionColors[player.faction]} rounded-full px-3 py-1 text-white text-xs font-semibold`}>
                      {factionNames[player.faction]}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Faction Rankings */}
        <div className="mt-12 bg-slate-900/50 border border-slate-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6 font-orbitron flex items-center">
            <Users className="w-6 h-6 mr-3 text-cyan-400" />
            Faction Performance
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(factionNames).map(([factionId, factionName]) => {
              const factionPlayers = currentData.filter(p => p.faction === factionId);
              const avgRank = factionPlayers.length > 0 
                ? Math.round(factionPlayers.reduce((sum, p) => sum + (currentData.indexOf(p) + 1), 0) / factionPlayers.length)
                : 0;
              
              return (
                <div
                  key={factionId}
                  className={`bg-slate-800 border rounded-lg p-4 ${
                    character.faction === factionId ? 'border-purple-500' : 'border-slate-600'
                  }`}
                >
                  <div className={`bg-gradient-to-r ${factionColors[factionId]} rounded-full w-12 h-12 flex items-center justify-center mb-3 text-white`}>
                    <Trophy className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-white text-sm mb-1 font-orbitron">
                    {factionName}
                  </h3>
                  <p className="text-slate-400 text-xs">
                    Avg Rank: #{avgRank}
                  </p>
                  <p className="text-slate-400 text-xs">
                    Members: {factionPlayers.length}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;