import React from 'react';
import { Sword, Shield, Zap } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
            <div className="relative bg-slate-900 rounded-full p-6 border-2 border-purple-500">
              <Sword className="w-16 h-16 text-cyan-400 animate-spin" />
            </div>
          </div>
        </div>
        
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-orange-400 bg-clip-text text-transparent font-orbitron">
          CAREER CLASH
        </h1>
        
        <p className="text-xl text-slate-300 mb-8 font-inter">
          Forging Your Path to Victory
        </p>
        
        <div className="flex justify-center space-x-4 mb-8">
          <div className="flex items-center space-x-2 text-slate-400">
            <Shield className="w-5 h-5 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span>Loading Factions</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-400">
            <Zap className="w-5 h-5 animate-bounce" style={{ animationDelay: '200ms' }} />
            <span>Initializing Skills</span>
          </div>
        </div>
        
        <div className="w-64 h-2 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;