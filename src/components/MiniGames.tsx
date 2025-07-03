import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { 
  Code, Palette, Users, Brain, Lightbulb, 
  Timer, Star, Trophy, Zap, Target, CheckCircle
} from 'lucide-react';

interface MiniGame {
  id: string;
  name: string;
  description: string;
  skill: keyof typeof import('../contexts/GameContext').Character.prototype.skills;
  icon: React.ReactNode;
  color: string;
  duration: number;
  points: number;
}

const MiniGames: React.FC = () => {
  const { character, updateSkill, addExperience, addPoints } = useGame();
  const [selectedGame, setSelectedGame] = useState<MiniGame | null>(null);
  const [gamePhase, setGamePhase] = useState<'selection' | 'playing' | 'result'>('selection');
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [gameData, setGameData] = useState<any>(null);

  const miniGames: MiniGame[] = [
    {
      id: 'code-debug',
      name: 'Code Debugger',
      description: 'Find and fix bugs in code snippets',
      skill: 'technical',
      icon: <Code className="w-6 h-6" />,
      color: 'from-cyan-400 to-blue-500',
      duration: 60,
      points: 100
    },
    {
      id: 'color-match',
      name: 'Color Harmony',
      description: 'Create beautiful color combinations',
      skill: 'creativity',
      icon: <Palette className="w-6 h-6" />,
      color: 'from-purple-400 to-pink-500',
      duration: 45,
      points: 80
    },
    {
      id: 'team-builder',
      name: 'Team Builder',
      description: 'Assemble the perfect team for projects',
      skill: 'leadership',
      icon: <Users className="w-6 h-6" />,
      color: 'from-green-400 to-teal-500',
      duration: 90,
      points: 120
    },
    {
      id: 'logic-puzzle',
      name: 'Logic Circuits',
      description: 'Solve complex logical problems',
      skill: 'logic',
      icon: <Brain className="w-6 h-6" />,
      color: 'from-orange-400 to-red-500',
      duration: 75,
      points: 110
    },
    {
      id: 'social-network',
      name: 'Social Connector',
      description: 'Build networks and connections',
      skill: 'social',
      icon: <Lightbulb className="w-6 h-6" />,
      color: 'from-indigo-400 to-purple-500',
      duration: 50,
      points: 90
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gamePhase === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gamePhase === 'playing') {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gamePhase]);

  const startGame = (game: MiniGame) => {
    setSelectedGame(game);
    setGamePhase('playing');
    setTimeLeft(game.duration);
    setScore(0);
    initializeGameData(game);
  };

  const initializeGameData = (game: MiniGame) => {
    switch (game.id) {
      case 'code-debug':
        setGameData({
          bugs: generateCodeBugs(),
          foundBugs: []
        });
        break;
      case 'color-match':
        setGameData({
          targetColor: generateRandomColor(),
          userColor: { r: 128, g: 128, b: 128 },
          attempts: 0
        });
        break;
      case 'team-builder':
        setGameData({
          projects: generateProjects(),
          currentProject: 0,
          teamMembers: generateTeamMembers(),
          selectedTeam: []
        });
        break;
      case 'logic-puzzle':
        setGameData({
          circuits: generateLogicCircuits(),
          currentCircuit: 0,
          solutions: []
        });
        break;
      case 'social-network':
        setGameData({
          people: generatePeople(),
          connections: [],
          targetConnections: 5
        });
        break;
    }
  };

  const generateCodeBugs = () => [
    { id: 1, code: 'if (x = 5) { return true; }', bug: 'Assignment instead of comparison', line: 1 },
    { id: 2, code: 'for (let i = 0; i < array.lenght; i++) {}', bug: 'Typo in length', line: 1 },
    { id: 3, code: 'function add(a, b) { return a + b }', bug: 'Missing semicolon', line: 1 },
    { id: 4, code: 'const arr = [1, 2, 3,]; console.log(arr[3]);', bug: 'Accessing undefined index', line: 1 }
  ];

  const generateRandomColor = () => ({
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256)
  });

  const generateProjects = () => [
    { name: 'Mobile App', skills: ['technical', 'creativity'], teamSize: 3 },
    { name: 'Marketing Campaign', skills: ['creativity', 'social'], teamSize: 4 },
    { name: 'Data Analysis', skills: ['logic', 'technical'], teamSize: 2 }
  ];

  const generateTeamMembers = () => [
    { id: 1, name: 'Alex', skills: ['technical', 'logic'], experience: 5 },
    { id: 2, name: 'Sam', skills: ['creativity', 'social'], experience: 3 },
    { id: 3, name: 'Jordan', skills: ['leadership', 'social'], experience: 7 },
    { id: 4, name: 'Casey', skills: ['technical', 'creativity'], experience: 4 },
    { id: 5, name: 'Riley', skills: ['logic', 'leadership'], experience: 6 }
  ];

  const generateLogicCircuits = () => [
    { inputs: [true, false], gate: 'AND', expected: false },
    { inputs: [true, true], gate: 'OR', expected: true },
    { inputs: [false], gate: 'NOT', expected: true }
  ];

  const generatePeople = () => [
    { id: 1, name: 'Alice', interests: ['tech', 'music'] },
    { id: 2, name: 'Bob', interests: ['sports', 'tech'] },
    { id: 3, name: 'Carol', interests: ['art', 'music'] },
    { id: 4, name: 'Dave', interests: ['sports', 'travel'] },
    { id: 5, name: 'Eve', interests: ['tech', 'art'] }
  ];

  const endGame = () => {
    setGamePhase('result');
    if (!selectedGame || !character) return;

    const skillPoints = Math.floor(score / 20);
    const experiencePoints = score * 2;

    updateSkill(selectedGame.skill, skillPoints);
    addExperience(experiencePoints);
    addPoints('skill', score);
  };

  const resetGame = () => {
    setGamePhase('selection');
    setSelectedGame(null);
    setScore(0);
    setTimeLeft(0);
    setGameData(null);
  };

  if (!character) return null;

  if (gamePhase === 'selection') {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 font-orbitron">
            Skill Training Arena
          </h2>
          <p className="text-slate-300">
            Master your abilities through engaging mini-games
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {miniGames.map(game => (
            <div
              key={game.id}
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:border-purple-500 transition-all duration-300 cursor-pointer group"
              onClick={() => startGame(game)}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`bg-gradient-to-br ${game.color} rounded-full p-3 text-white group-hover:scale-110 transition-transform duration-300`}>
                  {game.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-orbitron">
                    {game.name}
                  </h3>
                  <p className="text-slate-400 text-sm capitalize">
                    {game.skill} Training
                  </p>
                </div>
              </div>

              <p className="text-slate-300 text-sm mb-4">
                {game.description}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Duration:</span>
                  <span className="text-white">{game.duration}s</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Max Points:</span>
                  <span className="text-yellow-400">{game.points}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Current Level:</span>
                  <span className="text-cyan-400">
                    {character.skills[game.skill]}/10
                  </span>
                </div>
              </div>

              <button className="w-full mt-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 group-hover:scale-105">
                Start Training
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (gamePhase === 'playing' && selectedGame) {
    return (
      <div className="max-w-4xl mx-auto">
        {/* Game Header */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className={`bg-gradient-to-br ${selectedGame.color} rounded-full p-3 text-white`}>
                {selectedGame.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white font-orbitron">
                  {selectedGame.name}
                </h2>
                <p className="text-slate-400">Score: {score}</p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center space-x-2 text-slate-400">
                <Timer className="w-5 h-5" />
                <span className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Game Content */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8">
          {selectedGame.id === 'code-debug' && gameData && (
            <CodeDebugGame 
              data={gameData} 
              onScore={(points) => setScore(score + points)}
              onUpdate={setGameData}
            />
          )}
          
          {selectedGame.id === 'color-match' && gameData && (
            <ColorMatchGame 
              data={gameData} 
              onScore={(points) => setScore(score + points)}
              onUpdate={setGameData}
            />
          )}
          
          {selectedGame.id === 'team-builder' && gameData && (
            <TeamBuilderGame 
              data={gameData} 
              onScore={(points) => setScore(score + points)}
              onUpdate={setGameData}
            />
          )}
          
          {selectedGame.id === 'logic-puzzle' && gameData && (
            <LogicPuzzleGame 
              data={gameData} 
              onScore={(points) => setScore(score + points)}
              onUpdate={setGameData}
            />
          )}
          
          {selectedGame.id === 'social-network' && gameData && (
            <SocialNetworkGame 
              data={gameData} 
              onScore={(points) => setScore(score + points)}
              onUpdate={setGameData}
            />
          )}
        </div>
      </div>
    );
  }

  if (gamePhase === 'result' && selectedGame) {
    const skillPoints = Math.floor(score / 20);
    const experiencePoints = score * 2;
    
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8">
          <div className="text-6xl mb-4">🎯</div>
          
          <h2 className="text-4xl font-bold text-white mb-4 font-orbitron">
            Training Complete!
          </h2>
          
          <div className="text-xl text-slate-300 mb-6">
            You scored {score} points in {selectedGame.name}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-yellow-400 font-bold text-2xl">{score}</div>
              <div className="text-slate-400">Points Earned</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-cyan-400 font-bold text-2xl">+{skillPoints}</div>
              <div className="text-slate-400 capitalize">{selectedGame.skill} Skill</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-purple-400 font-bold text-2xl">+{experiencePoints}</div>
              <div className="text-slate-400">Experience</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={() => startGame(selectedGame)}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
            >
              Play Again
            </button>
            <button
              onClick={resetGame}
              className="px-6 py-3 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-600 transition-all duration-200"
            >
              Choose Another Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// Individual Game Components
const CodeDebugGame: React.FC<{ data: any; onScore: (points: number) => void; onUpdate: (data: any) => void }> = ({ data, onScore, onUpdate }) => {
  const handleBugFound = (bugId: number) => {
    if (data.foundBugs.includes(bugId)) return;
    
    const newFoundBugs = [...data.foundBugs, bugId];
    onUpdate({ ...data, foundBugs: newFoundBugs });
    onScore(25);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-white mb-4">Find the bugs in these code snippets:</h3>
      {data.bugs.map((bug: any) => (
        <div key={bug.id} className="bg-slate-800 rounded-lg p-4">
          <pre className="text-green-400 font-mono text-sm mb-2">{bug.code}</pre>
          <button
            onClick={() => handleBugFound(bug.id)}
            disabled={data.foundBugs.includes(bug.id)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              data.foundBugs.includes(bug.id)
                ? 'bg-green-600 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {data.foundBugs.includes(bug.id) ? '✓ Bug Found!' : 'Report Bug'}
          </button>
          {data.foundBugs.includes(bug.id) && (
            <p className="text-green-400 text-sm mt-2">Bug: {bug.bug}</p>
          )}
        </div>
      ))}
    </div>
  );
};

const ColorMatchGame: React.FC<{ data: any; onScore: (points: number) => void; onUpdate: (data: any) => void }> = ({ data, onScore, onUpdate }) => {
  const handleColorChange = (channel: 'r' | 'g' | 'b', value: number) => {
    const newColor = { ...data.userColor, [channel]: value };
    onUpdate({ ...data, userColor: newColor });
    
    // Check if close to target
    const diff = Math.abs(newColor.r - data.targetColor.r) + 
                 Math.abs(newColor.g - data.targetColor.g) + 
                 Math.abs(newColor.b - data.targetColor.b);
    
    if (diff < 30) {
      onScore(50);
      // Generate new target
      onUpdate({ 
        ...data, 
        userColor: newColor,
        targetColor: generateRandomColor(),
        attempts: data.attempts + 1
      });
    }
  };

  const generateRandomColor = () => ({
    r: Math.floor(Math.random() * 256),
    g: Math.floor(Math.random() * 256),
    b: Math.floor(Math.random() * 256)
  });

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4">Match the target color:</h3>
      
      <div className="grid grid-cols-2 gap-8">
        <div className="text-center">
          <div className="text-lg font-semibold text-white mb-2">Target Color</div>
          <div 
            className="w-32 h-32 mx-auto rounded-lg border-2 border-white"
            style={{ backgroundColor: `rgb(${data.targetColor.r}, ${data.targetColor.g}, ${data.targetColor.b})` }}
          ></div>
        </div>
        
        <div className="text-center">
          <div className="text-lg font-semibold text-white mb-2">Your Color</div>
          <div 
            className="w-32 h-32 mx-auto rounded-lg border-2 border-white"
            style={{ backgroundColor: `rgb(${data.userColor.r}, ${data.userColor.g}, ${data.userColor.b})` }}
          ></div>
        </div>
      </div>
      
      <div className="space-y-4">
        {(['r', 'g', 'b'] as const).map(channel => (
          <div key={channel} className="space-y-2">
            <label className="text-white font-semibold capitalize">{channel === 'r' ? 'Red' : channel === 'g' ? 'Green' : 'Blue'}: {data.userColor[channel]}</label>
            <input
              type="range"
              min="0"
              max="255"
              value={data.userColor[channel]}
              onChange={(e) => handleColorChange(channel, parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        ))}
      </div>
      
      <div className="text-center text-slate-300">
        Matches found: {data.attempts}
      </div>
    </div>
  );
};

const TeamBuilderGame: React.FC<{ data: any; onScore: (points: number) => void; onUpdate: (data: any) => void }> = ({ data, onScore, onUpdate }) => {
  const currentProject = data.projects[data.currentProject];
  
  const handleMemberSelect = (member: any) => {
    if (data.selectedTeam.includes(member.id)) {
      const newTeam = data.selectedTeam.filter((id: number) => id !== member.id);
      onUpdate({ ...data, selectedTeam: newTeam });
    } else if (data.selectedTeam.length < currentProject.teamSize) {
      const newTeam = [...data.selectedTeam, member.id];
      onUpdate({ ...data, selectedTeam: newTeam });
      
      // Check if team is complete and optimal
      if (newTeam.length === currentProject.teamSize) {
        const selectedMembers = data.teamMembers.filter((m: any) => newTeam.includes(m.id));
        const hasRequiredSkills = currentProject.skills.every((skill: string) =>
          selectedMembers.some((member: any) => member.skills.includes(skill))
        );
        
        if (hasRequiredSkills) {
          onScore(30);
        }
        
        // Move to next project
        setTimeout(() => {
          if (data.currentProject < data.projects.length - 1) {
            onUpdate({
              ...data,
              currentProject: data.currentProject + 1,
              selectedTeam: []
            });
          }
        }, 1000);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2">Build a team for: {currentProject.name}</h3>
        <p className="text-slate-300">Required skills: {currentProject.skills.join(', ')}</p>
        <p className="text-slate-300">Team size: {currentProject.teamSize}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.teamMembers.map((member: any) => (
          <div
            key={member.id}
            onClick={() => handleMemberSelect(member)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              data.selectedTeam.includes(member.id)
                ? 'border-green-500 bg-green-900/30'
                : 'border-slate-600 hover:border-purple-500'
            }`}
          >
            <div className="text-white font-semibold">{member.name}</div>
            <div className="text-slate-400 text-sm">Experience: {member.experience} years</div>
            <div className="flex flex-wrap gap-1 mt-2">
              {member.skills.map((skill: string) => (
                <span key={skill} className="px-2 py-1 bg-slate-700 text-xs rounded-full text-slate-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <div className="text-slate-300">
          Selected: {data.selectedTeam.length}/{currentProject.teamSize}
        </div>
        <div className="text-slate-300">
          Project: {data.currentProject + 1}/{data.projects.length}
        </div>
      </div>
    </div>
  );
};

const LogicPuzzleGame: React.FC<{ data: any; onScore: (points: number) => void; onUpdate: (data: any) => void }> = ({ data, onScore, onUpdate }) => {
  const currentCircuit = data.circuits[data.currentCircuit];
  
  const handleAnswer = (answer: boolean) => {
    const correct = answer === currentCircuit.expected;
    if (correct) {
      onScore(20);
    }
    
    const newSolutions = [...data.solutions, { answer, correct }];
    onUpdate({ ...data, solutions: newSolutions });
    
    // Move to next circuit
    setTimeout(() => {
      if (data.currentCircuit < data.circuits.length - 1) {
        onUpdate({
          ...data,
          currentCircuit: data.currentCircuit + 1
        });
      }
    }, 1000);
  };

  return (
    <div className="space-y-6 text-center">
      <h3 className="text-xl font-bold text-white mb-4">Solve the logic circuit:</h3>
      
      <div className="bg-slate-800 rounded-lg p-6">
        <div className="text-lg text-white mb-4">
          Inputs: {currentCircuit.inputs.map((input: boolean) => input ? 'TRUE' : 'FALSE').join(', ')}
        </div>
        <div className="text-2xl font-bold text-cyan-400 mb-4">
          {currentCircuit.gate} Gate
        </div>
        <div className="text-lg text-white">
          What is the output?
        </div>
      </div>
      
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => handleAnswer(true)}
          className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all duration-200"
        >
          TRUE
        </button>
        <button
          onClick={() => handleAnswer(false)}
          className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all duration-200"
        >
          FALSE
        </button>
      </div>
      
      <div className="text-slate-300">
        Circuit: {data.currentCircuit + 1}/{data.circuits.length}
      </div>
      
      {data.solutions.length > 0 && (
        <div className="text-center">
          <div className="text-slate-300">
            Correct answers: {data.solutions.filter((s: any) => s.correct).length}/{data.solutions.length}
          </div>
        </div>
      )}
    </div>
  );
};

const SocialNetworkGame: React.FC<{ data: any; onScore: (points: number) => void; onUpdate: (data: any) => void }> = ({ data, onScore, onUpdate }) => {
  const handleConnect = (person1Id: number, person2Id: number) => {
    const connectionExists = data.connections.some((conn: any) => 
      (conn.from === person1Id && conn.to === person2Id) ||
      (conn.from === person2Id && conn.to === person1Id)
    );
    
    if (connectionExists) return;
    
    const person1 = data.people.find((p: any) => p.id === person1Id);
    const person2 = data.people.find((p: any) => p.id === person2Id);
    
    const sharedInterests = person1.interests.filter((interest: string) => 
      person2.interests.includes(interest)
    );
    
    if (sharedInterests.length > 0) {
      const newConnections = [...data.connections, { from: person1Id, to: person2Id, sharedInterests }];
      onUpdate({ ...data, connections: newConnections });
      onScore(15);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-4 text-center">
        Connect people with shared interests:
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.people.map((person: any) => (
          <div key={person.id} className="bg-slate-800 rounded-lg p-4">
            <div className="text-white font-semibold mb-2">{person.name}</div>
            <div className="text-slate-400 text-sm mb-2">Interests:</div>
            <div className="flex flex-wrap gap-1">
              {person.interests.map((interest: string) => (
                <span key={interest} className="px-2 py-1 bg-slate-700 text-xs rounded-full text-slate-300">
                  {interest}
                </span>
              ))}
            </div>
            <div className="mt-3 space-y-1">
              {data.people.filter((p: any) => p.id !== person.id).map((otherPerson: any) => (
                <button
                  key={otherPerson.id}
                  onClick={() => handleConnect(person.id, otherPerson.id)}
                  disabled={data.connections.some((conn: any) => 
                    (conn.from === person.id && conn.to === otherPerson.id) ||
                    (conn.from === otherPerson.id && conn.to === person.id)
                  )}
                  className={`text-xs px-2 py-1 rounded-full transition-all duration-200 ${
                    data.connections.some((conn: any) => 
                      (conn.from === person.id && conn.to === otherPerson.id) ||
                      (conn.from === otherPerson.id && conn.to === person.id)
                    )
                      ? 'bg-green-600 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  {data.connections.some((conn: any) => 
                    (conn.from === person.id && conn.to === otherPerson.id) ||
                    (conn.from === otherPerson.id && conn.to === person.id)
                  ) ? '✓' : `Connect to ${otherPerson.name}`}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center text-slate-300">
        Connections made: {data.connections.length}/{data.targetConnections}
      </div>
    </div>
  );
};

export default MiniGames;