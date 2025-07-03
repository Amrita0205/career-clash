import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { Sword, Shield, Star, Users, Trophy, Zap } from 'lucide-react';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { character } = useGame();

  const features = [
    {
      icon: <Sword className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Epic Quests",
      description: "Embark on career discovery missions across multiple domains"
    },
    {
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Skill Mastery",
      description: "Develop your abilities through engaging mini-games and challenges"
    },
    {
      icon: <Star className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Hidden Careers",
      description: "Unlock rare and high-paying professions through unique skill combinations"
    },
    {
      icon: <Users className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Diverse Paths",
      description: "Explore careers across all industries with inclusive representation"
    },
    {
      icon: <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Achievements",
      description: "Earn badges and climb leaderboards as you progress"
    },
    {
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Real Impact",
      description: "Connect with mentors and real career opportunities"
    }
  ];

  const getActionButton = () => {
    if (!isAuthenticated) {
      return (
        <Link
          to="/auth"
          className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg hover:from-cyan-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
        >
          <Sword className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
          Begin Your Quest
        </Link>
      );
    }

    if (!character) {
      return (
        <Link
          to="/character-creation"
          className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
        >
          <Shield className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
          Create Character
        </Link>
      );
    }

    return (
      <Link
        to="/dashboard"
        className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-lg hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base"
      >
        <Star className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
        Continue Adventure
      </Link>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3861959/pexels-photo-3861959.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop')] bg-cover bg-center opacity-10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="text-center">
            <div className="mb-6 sm:mb-8">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
                <div className="relative bg-slate-900 rounded-full p-3 sm:p-4 border-2 border-purple-500">
                  <Sword className="w-8 h-8 sm:w-12 sm:h-12 text-cyan-400" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-orange-400 bg-clip-text text-transparent font-orbitron">
              CAREER CLASH
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 mb-6 sm:mb-8 max-w-3xl mx-auto font-inter px-4">
              Embark on an epic RPG adventure to discover your perfect career path. 
              Master skills, unlock hidden professions, and forge your destiny in the realm of possibilities.
            </p>
            
            <div className="mb-8 sm:mb-12">
              {getActionButton()}
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-slate-400">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-cyan-400 font-orbitron">500+</div>
                <div className="text-sm">Career Paths</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-400 font-orbitron">50+</div>
                <div className="text-sm">Hidden Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-400 font-orbitron">10K+</div>
                <div className="text-sm">Players</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 sm:py-16 lg:py-24 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-orbitron">
              Forge Your Destiny
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto px-4">
              Discover the features that make Career Clash the ultimate platform for career exploration
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-slate-900/50 border border-slate-700 rounded-xl p-4 sm:p-6 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-cyan-400 mb-4 group-hover:text-purple-400 transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-orbitron">
                  {feature.title}
                </h3>
                <p className="text-slate-300 font-inter text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-orbitron">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 mb-6 sm:mb-8 font-inter">
            Join thousands of adventurers who have discovered their perfect career through the power of gamification
          </p>
          {getActionButton()}
        </div>
      </div>
    </div>
  );
};

export default HomePage;