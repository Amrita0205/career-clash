import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext';
import { 
  Sword, Shield, Zap, Target, Clock, Trophy, 
  Star, Flame, Crown, Award, Users, Brain
} from 'lucide-react';

interface BattleQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

interface Opponent {
  id: string;
  name: string;
  level: number;
  faction: string;
  avatar: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: BattleQuestion[];
}

const BattleArena: React.FC = () => {
  const { character, addPoints, addExperience, unlockAchievement } = useGame();
  const [selectedOpponent, setSelectedOpponent] = useState<Opponent | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [battlePhase, setBattlePhase] = useState<'selection' | 'battle' | 'result'>('selection');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const opponents: Opponent[] = [
    {
      id: 'novice-bot',
      name: 'Apprentice Coder',
      level: 3,
      faction: 'tech-forgers',
      avatar: '🤖',
      difficulty: 'easy',
      questions: [
        {
          id: '1',
          category: 'Programming',
          question: 'What does HTML stand for?',
          options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink Text Management Language'],
          correctAnswer: 0,
          difficulty: 'easy',
          points: 50
        },
        {
          id: '2',
          category: 'Logic',
          question: 'If you have 3 apples and give away 1, how many do you have left?',
          options: ['1', '2', '3', '4'],
          correctAnswer: 1,
          difficulty: 'easy',
          points: 50
        },
        {
          id: '3',
          category: 'Creativity',
          question: 'Which color combination creates purple?',
          options: ['Red + Yellow', 'Blue + Red', 'Green + Blue', 'Yellow + Blue'],
          correctAnswer: 1,
          difficulty: 'easy',
          points: 50
        }
      ]
    },
    {
      id: 'skilled-warrior',
      name: 'Design Paladin',
      level: 7,
      faction: 'creative-artisans',
      avatar: '🎨',
      difficulty: 'medium',
      questions: [
        {
          id: '1',
          category: 'Design',
          question: 'What is the golden ratio approximately?',
          options: ['1.414', '1.618', '1.732', '2.000'],
          correctAnswer: 1,
          difficulty: 'medium',
          points: 100
        },
        {
          id: '2',
          category: 'UX',
          question: 'What does UX stand for in design?',
          options: ['User Experience', 'Universal Extension', 'Unique Expression', 'Unified Exchange'],
          correctAnswer: 0,
          difficulty: 'medium',
          points: 100
        },
        {
          id: '3',
          category: 'Psychology',
          question: 'Which principle suggests that users prefer familiar interfaces?',
          options: ['Hick\'s Law', 'Jakob\'s Law', 'Fitts\' Law', 'Miller\'s Rule'],
          correctAnswer: 1,
          difficulty: 'medium',
          points: 100
        }
      ]
    },
    {
      id: 'master-champion',
      name: 'Quantum Overlord',
      level: 15,
      faction: 'knowledge-seekers',
      avatar: '🧠',
      difficulty: 'hard',
      questions: [
        {
          id: '1',
          category: 'Advanced Tech',
          question: 'What is quantum entanglement?',
          options: ['Particles spinning together', 'Particles sharing quantum states instantly', 'Particles moving at light speed', 'Particles changing colors'],
          correctAnswer: 1,
          difficulty: 'hard',
          points: 200
        },
        {
          id: '2',
          category: 'AI/ML',
          question: 'What is the vanishing gradient problem?',
          options: ['Gradients become too large', 'Gradients become too small', 'Gradients disappear completely', 'Gradients change direction'],
          correctAnswer: 1,
          difficulty: 'hard',
          points: 200
        },
        {
          id: '3',
          category: 'Leadership',
          question: 'What is the most effective leadership style for innovation?',
          options: ['Autocratic', 'Democratic', 'Transformational', 'Laissez-faire'],
          correctAnswer: 2,
          difficulty: 'hard',
          points: 200
        }
      ]
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (battlePhase === 'battle' && timeLeft > 0 && !showResult) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, battlePhase, showResult]);

  const startBattle = (opponent: Opponent) => {
    setSelectedOpponent(opponent);
    setBattlePhase('battle');
    setCurrentQuestion(0);
    setUserScore(0);
    setOpponentScore(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null || !selectedOpponent) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const question = selectedOpponent.questions[currentQuestion];
    const isCorrect = answerIndex === question.correctAnswer;
    
    if (isCorrect) {
      setUserScore(userScore + question.points);
    }
    
    // Simulate opponent answer (they get it right 60% of the time)
    const opponentCorrect = Math.random() < 0.6;
    if (opponentCorrect) {
      setOpponentScore(opponentScore + question.points);
    }
    
    setTimeout(() => {
      if (currentQuestion < selectedOpponent.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        endBattle();
      }
    }, 2000);
  };

  const handleTimeUp = () => {
    if (!selectedOpponent) return;
    
    setShowResult(true);
    
    // Simulate opponent answer when time runs out
    const opponentCorrect = Math.random() < 0.6;
    if (opponentCorrect) {
      const question = selectedOpponent.questions[currentQuestion];
      setOpponentScore(opponentScore + question.points);
    }
    
    setTimeout(() => {
      if (currentQuestion < selectedOpponent.questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        endBattle();
      }
    }, 2000);
  };

  const endBattle = () => {
    setBattlePhase('result');
    
    if (!selectedOpponent || !character) return;
    
    const won = userScore > opponentScore;
    const basePoints = selectedOpponent.difficulty === 'hard' ? 300 : 
                     selectedOpponent.difficulty === 'medium' ? 200 : 100;
    
    if (won) {
      addPoints('battle', basePoints + userScore);
      addExperience(basePoints);
      
      // Check for achievements
      if (selectedOpponent.difficulty === 'hard') {
        unlockAchievement('giant-slayer');
      }
    } else {
      addPoints('battle', Math.floor(userScore / 2));
      addExperience(Math.floor(basePoints / 2));
    }
  };

  const resetBattle = () => {
    setBattlePhase('selection');
    setSelectedOpponent(null);
    setCurrentQuestion(0);
    setUserScore(0);
    setOpponentScore(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (!character) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'from-green-400 to-green-500';
      case 'medium': return 'from-yellow-400 to-orange-500';
      case 'hard': return 'from-red-400 to-red-500';
      default: return 'from-gray-400 to-gray-500';
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

  if (battlePhase === 'selection') {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2 font-orbitron">
            Choose Your Opponent
          </h2>
          <p className="text-slate-300">
            Test your skills against other career warriors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {opponents.map(opponent => (
            <div
              key={opponent.id}
              className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 hover:border-purple-500 transition-all duration-300 cursor-pointer group"
              onClick={() => startBattle(opponent)}
            >
              <div className="text-center mb-4">
                <div className="text-6xl mb-2">{opponent.avatar}</div>
                <h3 className="text-xl font-bold text-white font-orbitron">
                  {opponent.name}
                </h3>
                <p className="text-slate-400">Level {opponent.level}</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Difficulty:</span>
                  <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${getDifficultyColor(opponent.difficulty)} capitalize`}>
                    {opponent.difficulty}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Faction:</span>
                  <span className={`px-3 py-1 rounded-full text-white text-xs bg-gradient-to-r ${getFactionColor(opponent.faction)}`}>
                    {opponent.faction.replace('-', ' ')}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Reward:</span>
                  <span className="text-yellow-400 font-bold">
                    {opponent.difficulty === 'hard' ? '300+' : 
                     opponent.difficulty === 'medium' ? '200+' : '100+'} pts
                  </span>
                </div>
              </div>

              <button className="w-full mt-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 group-hover:scale-105">
                Challenge!
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (battlePhase === 'battle' && selectedOpponent) {
    const question = selectedOpponent.questions[currentQuestion];
    
    return (
      <div className="max-w-4xl mx-auto">
        {/* Battle Header */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{character.name}</div>
              <div className="text-cyan-400 font-bold">{userScore} pts</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-white font-orbitron">VS</div>
              <div className="flex items-center space-x-2 text-slate-400">
                <Clock className="w-4 h-4" />
                <span className={`font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>
                  {timeLeft}s
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-orange-400 font-bold">{opponentScore} pts</div>
              <div className="text-2xl">{selectedOpponent.avatar} {selectedOpponent.name}</div>
            </div>
          </div>
          
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-cyan-400 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / selectedOpponent.questions.length) * 100}%` }}
            ></div>
          </div>
          <div className="text-center text-slate-400 text-sm mt-2">
            Question {currentQuestion + 1} of {selectedOpponent.questions.length}
          </div>
        </div>

        {/* Question */}
        <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8">
          <div className="mb-6">
            <div className="text-sm text-purple-400 mb-2">{question.category}</div>
            <h3 className="text-2xl font-bold text-white mb-4 font-orbitron">
              {question.question}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  selectedAnswer === null
                    ? 'border-slate-600 hover:border-purple-500 hover:bg-slate-800'
                    : selectedAnswer === index
                    ? index === question.correctAnswer
                      ? 'border-green-500 bg-green-900/30'
                      : 'border-red-500 bg-red-900/30'
                    : index === question.correctAnswer && showResult
                    ? 'border-green-500 bg-green-900/30'
                    : 'border-slate-600 opacity-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-white">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mt-6 p-4 rounded-lg bg-slate-800 border border-slate-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {selectedAnswer === question.correctAnswer ? (
                    <>
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <span className="text-green-400 font-bold">Correct! +{question.points} points</span>
                    </>
                  ) : (
                    <>
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✗</span>
                      </div>
                      <span className="text-red-400 font-bold">Incorrect!</span>
                    </>
                  )}
                </div>
                <div className="text-slate-400 text-sm">
                  Next question in {Math.ceil((2000 - (Date.now() % 2000)) / 1000)}s...
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (battlePhase === 'result' && selectedOpponent) {
    const won = userScore > opponentScore;
    
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className={`bg-slate-900/50 border rounded-xl p-8 ${
          won ? 'border-green-500' : 'border-red-500'
        }`}>
          <div className="text-6xl mb-4">
            {won ? '🏆' : '💪'}
          </div>
          
          <h2 className={`text-4xl font-bold mb-4 font-orbitron ${
            won ? 'text-green-400' : 'text-red-400'
          }`}>
            {won ? 'VICTORY!' : 'DEFEAT!'}
          </h2>
          
          <div className="text-xl text-slate-300 mb-6">
            {won 
              ? `You defeated ${selectedOpponent.name}!` 
              : `${selectedOpponent.name} proved too strong this time.`
            }
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-cyan-400 font-bold text-2xl">{userScore}</div>
              <div className="text-slate-400">Your Score</div>
            </div>
            <div className="bg-slate-800 rounded-lg p-4">
              <div className="text-orange-400 font-bold text-2xl">{opponentScore}</div>
              <div className="text-slate-400">Opponent Score</div>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <div className="text-yellow-400">
              +{won ? (selectedOpponent.difficulty === 'hard' ? 300 : 
                      selectedOpponent.difficulty === 'medium' ? 200 : 100) + userScore :
                     Math.floor(userScore / 2)} Battle Points
            </div>
            <div className="text-purple-400">
              +{won ? (selectedOpponent.difficulty === 'hard' ? 300 : 
                      selectedOpponent.difficulty === 'medium' ? 200 : 100) :
                     Math.floor((selectedOpponent.difficulty === 'hard' ? 300 : 
                               selectedOpponent.difficulty === 'medium' ? 200 : 100) / 2)} Experience
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button
              onClick={resetBattle}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200"
            >
              Battle Again
            </button>
            <button
              onClick={() => window.location.href = '/leaderboard'}
              className="px-6 py-3 bg-slate-700 text-white font-bold rounded-lg hover:bg-slate-600 transition-all duration-200"
            >
              View Leaderboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default BattleArena;