import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import Navigation from '../components/Navigation';
import PersonalityTest from '../components/PersonalityTest';
import { 
  User, Mail, Calendar, Star, Trophy, Target, 
  Download, Share2, Edit3, Brain, Heart, Zap,
  Crown, Shield, Sword, Award, Flame
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { character } = useGame();
  const [showPersonalityTest, setShowPersonalityTest] = useState(false);
  const [personalityResult, setPersonalityResult] = useState<any>(null);

  if (!user || !character) return null;

  const handlePersonalityComplete = (result: any) => {
    setPersonalityResult(result);
    setShowPersonalityTest(false);
  };

  const exportProfile = () => {
    const profileData = {
      user: {
        username: user.username,
        email: user.email
      },
      character: {
        name: character.name,
        faction: character.faction,
        level: character.level,
        experience: character.experience,
        skills: character.skills,
        totalPoints: character.totalPoints,
        unlockedCareers: character.unlockedCareers,
        achievements: character.achievements,
        streak: character.streak
      },
      personalityResult,
      exportDate: new Date().toISOString()
    };

    const dataStr = JSON.stringify(profileData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `career-clash-profile-${character.name}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const shareProfile = async () => {
    const shareData = {
      title: `${character.name}'s Career Clash Profile`,
      text: `Check out my Career Clash progress! Level ${character.level} ${character.faction.replace('-', ' ')} with ${character.totalPoints} total points and ${character.unlockedCareers.length} careers unlocked!`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      alert('Profile link copied to clipboard!');
    }
  };

  const getFactionColor = (faction: string) => {
    switch (faction) {
      case 'tech-forgers': return 'from-cyan-400 to-blue-500';
      case 'creative-artisans': return 'from-purple-400 to-pink-500';
      case 'social-champions': return 'from-green-400 to-teal-500';
      case 'knowledge-seekers': return 'from-orange-400 to-red-500';
      case 'innovation-pioneers': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getSkillIcon = (skill: string) => {
    switch (skill) {
      case 'logic': return <Brain className="w-4 h-4" />;
      case 'creativity': return <Heart className="w-4 h-4" />;
      case 'leadership': return <Crown className="w-4 h-4" />;
      case 'technical': return <Zap className="w-4 h-4" />;
      case 'social': return <User className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  if (showPersonalityTest) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <button
              onClick={() => setShowPersonalityTest(false)}
              className="text-slate-400 hover:text-white transition-colors duration-200"
            >
              ← Back to Profile
            </button>
          </div>
          <PersonalityTest onComplete={handlePersonalityComplete} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 font-orbitron">
            Profile & Resume
          </h1>
          <p className="text-slate-300 font-inter">
            Your complete career journey and achievements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2 space-y-8">
            {/* Character Overview */}
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white font-orbitron">
                  Character Overview
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={shareProfile}
                    className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-200"
                    title="Share Profile"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={exportProfile}
                    className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-200"
                    title="Export Profile"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-slate-400 text-sm">Character Name</div>
                      <div className="text-white font-semibold">{character.name}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-slate-400 text-sm">Faction</div>
                      <div className={`bg-gradient-to-r ${getFactionColor(character.faction)} bg-clip-text text-transparent font-semibold capitalize`}>
                        {character.faction.replace('-', ' ')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Star className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-slate-400 text-sm">Level</div>
                      <div className="text-white font-semibold">{character.level}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-slate-400 text-sm">Total Points</div>
                      <div className="text-white font-semibold">{character.totalPoints.toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-slate-400 text-sm">Careers Unlocked</div>
                      <div className="text-white font-semibold">{character.unlockedCareers.length}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Flame className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-slate-400 text-sm">Current Streak</div>
                      <div className="text-white font-semibold">{character.streak} days</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills Breakdown */}
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 font-orbitron">
                Skill Mastery
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(character.skills).map(([skill, level]) => (
                  <div key={skill} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getSkillIcon(skill)}
                        <span className="text-white font-semibold capitalize">{skill}</span>
                      </div>
                      <span className="text-slate-400">{level}/10</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(level / 10) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 font-orbitron">
                Recent Achievements
              </h2>
              
              {character.achievements.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {character.achievements.slice(0, 6).map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg">
                      <Award className="w-5 h-5 text-yellow-400" />
                      <span className="text-white font-semibold">{achievement}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-slate-400 opacity-50" />
                  <p className="text-slate-400">No achievements yet. Start your journey to earn your first badge!</p>
                </div>
              )}
            </div>

            {/* Personality Results */}
            {personalityResult && (
              <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6 font-orbitron">
                  Personality Profile
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-purple-400 mb-2">
                      {personalityResult.name}
                    </h3>
                    <p className="text-slate-300">{personalityResult.description}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Strengths</h4>
                    <div className="flex flex-wrap gap-2">
                      {personalityResult.strengths.map((strength: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm">
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Recommended Careers</h4>
                    <div className="flex flex-wrap gap-2">
                      {personalityResult.recommendedCareers.map((career: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-cyan-900/30 text-cyan-300 rounded-full text-sm">
                          {career}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Info */}
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 font-orbitron">
                Account Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="text-slate-400 text-xs">Email</div>
                    <div className="text-white text-sm">{user.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <User className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="text-slate-400 text-xs">Username</div>
                    <div className="text-white text-sm">{user.username}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <div>
                    <div className="text-slate-400 text-xs">Last Active</div>
                    <div className="text-white text-sm">
                      {new Date(character.lastActive).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 font-orbitron">
                Quick Stats
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Experience</span>
                  <span className="text-white font-semibold">{character.experience.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Skill Points</span>
                  <span className="text-cyan-400 font-semibold">{character.skillPoints.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Career Points</span>
                  <span className="text-purple-400 font-semibold">{character.careerPoints.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Quest Points</span>
                  <span className="text-green-400 font-semibold">{character.questPoints.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Battle Points</span>
                  <span className="text-red-400 font-semibold">{character.battlePoints.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 font-orbitron">
                Profile Actions
              </h3>
              
              <div className="space-y-3">
                {!personalityResult && (
                  <button
                    onClick={() => setShowPersonalityTest(true)}
                    className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Brain className="w-4 h-4" />
                      <span>Take Personality Test</span>
                    </div>
                  </button>
                )}
                
                <button
                  onClick={exportProfile}
                  className="w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-200"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export Resume</span>
                  </div>
                </button>
                
                <button
                  onClick={shareProfile}
                  className="w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all duration-200"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Share2 className="w-4 h-4" />
                    <span>Share Profile</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;