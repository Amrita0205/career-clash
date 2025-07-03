import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import Navigation from '../components/Navigation';
import { 
  Lock, Unlock, Star, DollarSign, TrendingUp, 
  Code, Palette, Users, Brain, Zap, Search, 
  Shield, Eye, Wand2, Gamepad2, Crown, Target,
  Sparkles, Flame, Award, Trophy
} from 'lucide-react';

const Careers: React.FC = () => {
  const { character, unlockCareer, addPoints, addExperience, unlockAchievement } = useGame();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!character) return null;

  const careers = [
    // From the images - Fantasy RPG Style Careers
    {
      id: 'codeforger',
      name: 'Codeforger',
      subtitle: 'Summoner / Controller',
      category: 'tech',
      description: 'A master of neural constructs, Codeforger summons cybernetic minions to obey commands with unwavering precision.',
      salary: '$120,000 - $250,000',
      growth: 'Explosive',
      requirements: { technical: 8, logic: 7, creativity: 5 },
      icon: <Shield className="w-6 h-6" />,
      rarity: 'legendary',
      skills: ['Neural Networks', 'AI Architecture', 'Cybernetic Control', 'System Summoning'],
      points: 500,
      unlockMessage: '🔥 LEGENDARY CAREER UNLOCKED! You have mastered the ancient art of code summoning!'
    },
    {
      id: 'brandmancer',
      name: 'Brandmancer',
      subtitle: 'Warden of Perception',
      category: 'creative',
      description: 'Conjures algorithmic holograms and analytics. Creates charts fueled by comments and likes through campaign magic.',
      salary: '$95,000 - $180,000',
      growth: 'Very High',
      requirements: { creativity: 7, social: 6, logic: 5 },
      icon: <Eye className="w-6 h-6" />,
      rarity: 'rare',
      skills: ['Strategy Casting', 'Social Domain Magic', 'Campaign Sorcery', 'Perception Manipulation'],
      points: 350,
      unlockMessage: '✨ RARE CAREER UNLOCKED! You wield the power of brand perception!'
    },
    {
      id: 'visuarch',
      name: 'Visuarch',
      subtitle: 'Reality Bender / Architect',
      category: 'creative',
      description: 'A paint-splattered illusionist who fashions environments with glowing brush and constructs holographic 3D forms.',
      salary: '$85,000 - $160,000',
      growth: 'High',
      requirements: { creativity: 8, technical: 5, logic: 4 },
      icon: <Wand2 className="w-6 h-6" />,
      rarity: 'rare',
      skills: ['Reality Manipulation', '3D Holography', 'Environmental Design', 'Illusion Crafting'],
      points: 300,
      unlockMessage: '🎨 RARE CAREER UNLOCKED! Reality bends to your artistic will!'
    },
    // Enhanced Traditional Careers with RPG Flair
    {
      id: 'data-wizard',
      name: 'Data Wizard',
      subtitle: 'Master of Digital Prophecy',
      category: 'tech',
      description: 'Weaves spells from raw data, predicting future trends and uncovering hidden patterns in the digital realm.',
      salary: '$110,000 - $220,000',
      growth: 'Mystical',
      requirements: { logic: 7, technical: 6, creativity: 4 },
      icon: <Brain className="w-6 h-6" />,
      rarity: 'uncommon',
      skills: ['Data Divination', 'Statistical Sorcery', 'Predictive Magic', 'Pattern Recognition'],
      points: 250,
      unlockMessage: '🔮 The data spirits have chosen you as their vessel!'
    },
    {
      id: 'ux-enchanter',
      name: 'UX Enchanter',
      subtitle: 'Weaver of User Dreams',
      category: 'creative',
      description: 'Crafts magical user experiences that captivate and delight, turning complex interfaces into intuitive journeys.',
      salary: '$85,000 - $150,000',
      growth: 'Enchanting',
      requirements: { creativity: 6, social: 5, technical: 4 },
      icon: <Sparkles className="w-6 h-6" />,
      rarity: 'common',
      skills: ['Experience Crafting', 'User Empathy', 'Interface Magic', 'Journey Mapping'],
      points: 150,
      unlockMessage: '✨ You have learned to weave user experiences like magic!'
    },
    {
      id: 'product-overlord',
      name: 'Product Overlord',
      subtitle: 'Commander of Digital Realms',
      category: 'leadership',
      description: 'Rules over product kingdoms, commanding armies of developers and designers to build digital empires.',
      salary: '$130,000 - $250,000',
      growth: 'Dominating',
      requirements: { leadership: 7, social: 6, logic: 5 },
      icon: <Crown className="w-6 h-6" />,
      rarity: 'uncommon',
      skills: ['Strategic Command', 'Team Leadership', 'Vision Casting', 'Market Conquest'],
      points: 300,
      unlockMessage: '👑 You have ascended to rule over product realms!'
    },
    // Hidden Legendary Careers
    {
      id: 'quantum-architect',
      name: 'Quantum Architect',
      subtitle: 'Builder of Impossible Realities',
      category: 'hidden',
      description: 'Designs systems that exist in multiple states simultaneously, architecting the impossible.',
      salary: '$200,000 - $400,000',
      growth: 'Quantum',
      requirements: { technical: 9, logic: 8, creativity: 7 },
      icon: <Target className="w-6 h-6" />,
      rarity: 'legendary',
      skills: ['Quantum Computing', 'Parallel Reality Design', 'Superposition Architecture', 'Entanglement Engineering'],
      points: 750,
      unlockMessage: '🌌 LEGENDARY! You have unlocked the secrets of quantum reality!'
    },
    {
      id: 'ai-whisperer',
      name: 'AI Whisperer',
      subtitle: 'Consciousness Shepherd',
      category: 'hidden',
      description: 'Communicates with artificial minds, guiding AI consciousness and ensuring ethical digital evolution.',
      salary: '$180,000 - $350,000',
      growth: 'Transcendent',
      requirements: { technical: 8, social: 7, logic: 6 },
      icon: <Brain className="w-6 h-6" />,
      rarity: 'legendary',
      skills: ['AI Psychology', 'Consciousness Guidance', 'Digital Ethics', 'Mind-Machine Interface'],
      points: 650,
      unlockMessage: '🤖 LEGENDARY! You can speak the language of artificial minds!'
    },
    {
      id: 'metaverse-god',
      name: 'Metaverse God',
      subtitle: 'Creator of Digital Universes',
      category: 'hidden',
      description: 'Builds entire virtual worlds, governing the laws of physics and reality in digital dimensions.',
      salary: '$250,000 - $500,000',
      growth: 'Divine',
      requirements: { creativity: 9, technical: 8, leadership: 7 },
      icon: <Gamepad2 className="w-6 h-6" />,
      rarity: 'legendary',
      skills: ['World Building', 'Reality Programming', 'Virtual Physics', 'Digital Governance'],
      points: 1000,
      unlockMessage: '🌟 LEGENDARY! You have achieved digital godhood!'
    },
    // More Diverse Careers
    {
      id: 'crypto-alchemist',
      name: 'Crypto Alchemist',
      subtitle: 'Transmuter of Digital Gold',
      category: 'tech',
      description: 'Transforms code into digital currency, mastering the ancient art of blockchain alchemy.',
      salary: '$140,000 - $300,000',
      growth: 'Volatile',
      requirements: { technical: 7, logic: 6, creativity: 4 },
      icon: <Flame className="w-6 h-6" />,
      rarity: 'rare',
      skills: ['Blockchain Mastery', 'Smart Contract Crafting', 'DeFi Sorcery', 'Token Economics'],
      points: 400,
      unlockMessage: '💰 You have mastered the art of digital alchemy!'
    },
    {
      id: 'growth-hacker',
      name: 'Growth Hacker',
      subtitle: 'Viral Spell Caster',
      category: 'creative',
      description: 'Casts viral spells that make products spread like wildfire across digital realms.',
      salary: '$90,000 - $170,000',
      growth: 'Viral',
      requirements: { creativity: 6, social: 6, logic: 5 },
      icon: <TrendingUp className="w-6 h-6" />,
      rarity: 'uncommon',
      skills: ['Viral Engineering', 'Growth Experimentation', 'User Acquisition', 'Conversion Optimization'],
      points: 200,
      unlockMessage: '📈 Your growth spells are spreading across the digital realm!'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Careers' },
    { id: 'tech', name: 'Tech Sorcery' },
    { id: 'creative', name: 'Creative Arts' },
    { id: 'leadership', name: 'Command & Control' },
    { id: 'hidden', name: 'Forbidden Paths' }
  ];

  const rarityColors = {
    common: 'from-slate-400 to-slate-500',
    uncommon: 'from-green-400 to-green-500',
    rare: 'from-blue-400 to-purple-500',
    legendary: 'from-purple-400 via-pink-500 to-orange-500'
  };

  const rarityGlow = {
    common: 'shadow-slate-500/20',
    uncommon: 'shadow-green-500/30',
    rare: 'shadow-blue-500/40',
    legendary: 'shadow-purple-500/50 animate-pulse'
  };

  const checkRequirements = (requirements: any) => {
    return Object.entries(requirements).every(([skill, required]) => 
      character.skills[skill as keyof typeof character.skills] >= (required as number)
    );
  };

  const isUnlocked = (careerId: string) => {
    return character.unlockedCareers.includes(careerId);
  };

  const canUnlock = (career: any) => {
    return checkRequirements(career.requirements) && !isUnlocked(career.id);
  };

  const handleUnlock = (career: any) => {
    unlockCareer(career.id);
    addPoints('career', career.points);
    addExperience(career.points);
    
    // Show unlock notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-lg shadow-lg z-50 animate-bounce';
    notification.innerHTML = `
      <div class="flex items-center space-x-2">
        <span class="text-2xl">🎉</span>
        <div>
          <div class="font-bold">${career.name} Unlocked!</div>
          <div class="text-sm">+${career.points} Career Points</div>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 4000);

    // Check for achievements
    if (character.unlockedCareers.length + 1 >= 5) {
      unlockAchievement('career-explorer');
    }
    if (career.rarity === 'legendary') {
      unlockAchievement('legend-seeker');
    }
  };

  const filteredCareers = careers.filter(career => {
    const matchesSearch = career.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         career.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || career.category === selectedCategory;
    
    // Hide hidden careers if requirements aren't met
    if (career.category === 'hidden' && !checkRequirements(career.requirements)) {
      return false;
    }
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 font-orbitron">
            Career Paths & Professions
          </h1>
          <p className="text-slate-300 font-inter">
            Unlock legendary careers through skill mastery and earn massive points
          </p>
        </div>

        {/* Points Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border border-purple-500 rounded-xl p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300 font-orbitron">
                {character.careerPoints.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400">Career Points</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border border-cyan-500 rounded-xl p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-300 font-orbitron">
                {character.totalPoints.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400">Total Points</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-900/50 to-teal-900/50 border border-green-500 rounded-xl p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300 font-orbitron">
                {character.unlockedCareers.length}
              </div>
              <div className="text-xs text-slate-400">Careers Unlocked</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border border-orange-500 rounded-xl p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-300 font-orbitron">
                {character.streak}
              </div>
              <div className="text-xs text-slate-400">Day Streak</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search legendary careers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-slate-400"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Career Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map(career => {
            const unlocked = isUnlocked(career.id);
            const canUnlockNow = canUnlock(career);
            const requirementsMet = checkRequirements(career.requirements);
            
            return (
              <div
                key={career.id}
                className={`bg-slate-900/50 border rounded-xl p-6 transition-all duration-300 ${
                  unlocked
                    ? `border-green-500 ${rarityGlow.legendary} shadow-lg`
                    : canUnlockNow
                    ? `border-purple-500 ${rarityGlow[career.rarity]} shadow-lg hover:scale-105`
                    : 'border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`bg-gradient-to-br ${rarityColors[career.rarity]} rounded-full p-2 text-white ${career.rarity === 'legendary' ? 'animate-pulse' : ''}`}>
                      {career.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white font-orbitron">
                        {career.name}
                      </h3>
                      <p className="text-xs text-slate-400 italic">
                        {career.subtitle}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${rarityColors[career.rarity]} text-white capitalize font-semibold`}>
                          {career.rarity}
                        </span>
                        <div className="flex items-center text-yellow-400">
                          <Star className="w-3 h-3 mr-1" />
                          <span className="text-xs font-bold">{career.points}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-2xl">
                    {unlocked ? (
                      <div className="flex items-center">
                        <Trophy className="w-6 h-6 text-yellow-400" />
                      </div>
                    ) : requirementsMet ? (
                      <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                    ) : (
                      <Lock className="w-6 h-6 text-slate-500" />
                    )}
                  </div>
                </div>

                <p className="text-slate-300 text-sm mb-4 font-inter">
                  {career.description}
                </p>

                {/* Salary and Growth */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-1 text-green-400">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm font-semibold">{career.salary}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-cyan-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">{career.growth}</span>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-slate-400 mb-2">Power Requirements:</h4>
                  <div className="space-y-1">
                    {Object.entries(career.requirements).map(([skill, required]) => {
                      const currentLevel = character.skills[skill as keyof typeof character.skills];
                      const met = currentLevel >= (required as number);
                      
                      return (
                        <div key={skill} className="flex justify-between items-center text-xs">
                          <span className={`capitalize ${met ? 'text-green-400' : 'text-slate-400'}`}>
                            {skill}
                          </span>
                          <span className={met ? 'text-green-400' : 'text-red-400'}>
                            {currentLevel}/{required}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-slate-400 mb-2">Legendary Abilities:</h4>
                  <div className="flex flex-wrap gap-1">
                    {career.skills.map((skill, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 bg-gradient-to-r ${rarityColors[career.rarity]} text-xs text-white rounded-full font-semibold`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                {unlocked ? (
                  <div className="bg-gradient-to-r from-green-900/20 to-teal-900/20 border border-green-500/30 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <Trophy className="w-4 h-4 text-yellow-400" />
                      <span className="text-green-400 text-sm font-semibold">Career Mastered!</span>
                    </div>
                  </div>
                ) : canUnlockNow ? (
                  <button
                    onClick={() => handleUnlock(career)}
                    className={`w-full py-3 bg-gradient-to-r ${rarityColors[career.rarity]} text-white font-bold rounded-lg hover:scale-105 transition-all duration-200 shadow-lg ${career.rarity === 'legendary' ? 'animate-pulse' : ''}`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Award className="w-4 h-4" />
                      <span>Unlock Career (+{career.points} pts)</span>
                    </div>
                  </button>
                ) : (
                  <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 text-center">
                    <span className="text-slate-400 text-sm">Develop skills to unlock</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredCareers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No careers found matching your criteria</p>
              <p className="text-sm">Try adjusting your search or category filter</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Careers;