import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { Sword, Shield, Zap, Code, Palette, Users, Brain, Lightbulb } from 'lucide-react';

const CharacterCreation: React.FC = () => {
  const [name, setName] = useState('');
  const [selectedFaction, setSelectedFaction] = useState('');
  const [error, setError] = useState('');

  const { updateUser } = useAuth();
  const { createCharacter } = useGame();
  const navigate = useNavigate();

  const factions = [
    {
      id: 'tech-forgers',
      name: 'Tech Forgers',
      description: 'Masters of code and digital innovation',
      icon: <Code className="w-8 h-8 sm:w-12 sm:h-12" />,
      color: 'from-cyan-400 to-blue-500',
      skills: ['Technical', 'Logic', 'Problem Solving'],
      careers: ['Software Engineer', 'Data Scientist', 'Cybersecurity Analyst']
    },
    {
      id: 'creative-artisans',
      name: 'Creative Artisans',
      description: 'Wielders of imagination and artistic vision',
      icon: <Palette className="w-8 h-8 sm:w-12 sm:h-12" />,
      color: 'from-purple-400 to-pink-500',
      skills: ['Creativity', 'Visual Design', 'Storytelling'],
      careers: ['UX Designer', 'Content Creator', 'Art Director']
    },
    {
      id: 'social-champions',
      name: 'Social Champions',
      description: 'Leaders who inspire and connect communities',
      icon: <Users className="w-8 h-8 sm:w-12 sm:h-12" />,
      color: 'from-green-400 to-teal-500',
      skills: ['Leadership', 'Communication', 'Empathy'],
      careers: ['Marketing Manager', 'HR Director', 'Social Worker']
    },
    {
      id: 'knowledge-seekers',
      name: 'Knowledge Seekers',
      description: 'Scholars who unlock the mysteries of learning',
      icon: <Brain className="w-8 h-8 sm:w-12 sm:h-12" />,
      color: 'from-orange-400 to-red-500',
      skills: ['Research', 'Analysis', 'Teaching'],
      careers: ['Research Scientist', 'Data Analyst', 'Professor']
    },
    {
      id: 'innovation-pioneers',
      name: 'Innovation Pioneers',
      description: 'Entrepreneurs who forge new paths',
      icon: <Lightbulb className="w-8 h-8 sm:w-12 sm:h-12" />,
      color: 'from-yellow-400 to-orange-500',
      skills: ['Innovation', 'Strategy', 'Risk Taking'],
      careers: ['Startup Founder', 'Product Manager', 'Consultant']
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter a character name');
      return;
    }

    if (!selectedFaction) {
      setError('Please select a faction');
      return;
    }

    createCharacter(name.trim(), selectedFaction);
    updateUser({ hasCharacter: true });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen py-6 sm:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-orange-400 bg-clip-text text-transparent font-orbitron">
            Create Your Character
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-inter px-4">
            Choose your path and begin your journey to career mastery. Each faction offers unique skills and career opportunities.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-12">
          {/* Character Name */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 font-orbitron flex items-center">
              <Sword className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-cyan-400" />
              Name Your Hero
            </h2>
            <div className="max-w-md">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white placeholder-slate-400 text-base sm:text-lg"
                placeholder="Enter your character name"
                maxLength={20}
              />
              <p className="text-slate-400 text-xs sm:text-sm mt-2">
                Choose a name that represents your career journey
              </p>
            </div>
          </div>

          {/* Faction Selection */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-xl sm:rounded-2xl p-4 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 font-orbitron flex items-center">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-purple-400" />
              Choose Your Faction
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {factions.map((faction) => (
                <div
                  key={faction.id}
                  className={`relative cursor-pointer transition-all duration-300 ${
                    selectedFaction === faction.id
                      ? 'ring-2 ring-purple-500 scale-105'
                      : 'hover:scale-102'
                  }`}
                  onClick={() => setSelectedFaction(faction.id)}
                >
                  <div className="bg-slate-800 border border-slate-700 rounded-lg sm:rounded-xl p-4 sm:p-6 h-full hover:border-purple-500 transition-colors duration-300">
                    <div className={`bg-gradient-to-br ${faction.color} rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-3 sm:mb-4 text-white`}>
                      {faction.icon}
                    </div>
                    
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-orbitron">
                      {faction.name}
                    </h3>
                    
                    <p className="text-slate-300 mb-3 sm:mb-4 font-inter text-sm sm:text-base">
                      {faction.description}
                    </p>
                    
                    <div className="mb-3 sm:mb-4">
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-400 mb-2">Key Skills:</h4>
                      <div className="flex flex-wrap gap-1">
                        {faction.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-slate-700 text-xs text-slate-300 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-400 mb-2">Sample Careers:</h4>
                      <ul className="text-xs text-slate-300 space-y-1">
                        {faction.careers.map((career, index) => (
                          <li key={index} className="flex items-center">
                            <Zap className="w-3 h-3 mr-1 text-cyan-400" />
                            {career}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {selectedFaction === faction.id && (
                      <div className="absolute top-2 right-2">
                        <div className="bg-purple-500 rounded-full p-1">
                          <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 text-red-300 text-center text-sm sm:text-base">
              {error}
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              className="inline-flex items-center px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-base sm:text-lg"
            >
              <Sword className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Begin Your Journey
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CharacterCreation;