import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext';
import { Brain, Heart, Zap, Users, Target, CheckCircle, ArrowRight } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    traits: {
      analytical: number;
      creative: number;
      social: number;
      practical: number;
      leadership: number;
    };
  }[];
}

interface PersonalityResult {
  type: string;
  name: string;
  description: string;
  strengths: string[];
  recommendedCareers: string[];
  skillBoosts: {
    logic?: number;
    creativity?: number;
    social?: number;
    technical?: number;
    leadership?: number;
  };
}

const PersonalityTest: React.FC<{ onComplete: (result: PersonalityResult) => void }> = ({ onComplete }) => {
  const { character, updateSkill, addExperience, addPoints } = useGame();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      text: "When faced with a complex problem, you prefer to:",
      options: [
        {
          text: "Break it down into logical steps and analyze each part",
          traits: { analytical: 3, creative: 0, social: 0, practical: 2, leadership: 1 }
        },
        {
          text: "Brainstorm creative solutions and think outside the box",
          traits: { analytical: 1, creative: 3, social: 1, practical: 0, leadership: 1 }
        },
        {
          text: "Discuss it with others to get different perspectives",
          traits: { analytical: 1, creative: 1, social: 3, practical: 1, leadership: 2 }
        },
        {
          text: "Look for proven methods that have worked before",
          traits: { analytical: 2, creative: 0, social: 0, practical: 3, leadership: 1 }
        }
      ]
    },
    {
      id: 2,
      text: "In a team project, you naturally tend to:",
      options: [
        {
          text: "Take charge and organize everyone's tasks",
          traits: { analytical: 1, creative: 0, social: 2, practical: 2, leadership: 3 }
        },
        {
          text: "Come up with innovative ideas and solutions",
          traits: { analytical: 1, creative: 3, social: 1, practical: 0, leadership: 1 }
        },
        {
          text: "Make sure everyone feels heard and included",
          traits: { analytical: 0, creative: 1, social: 3, practical: 1, leadership: 2 }
        },
        {
          text: "Focus on the technical details and implementation",
          traits: { analytical: 3, creative: 0, social: 0, practical: 3, leadership: 0 }
        }
      ]
    },
    {
      id: 3,
      text: "Your ideal work environment would be:",
      options: [
        {
          text: "A quiet space where you can focus deeply on complex tasks",
          traits: { analytical: 3, creative: 1, social: 0, practical: 2, leadership: 0 }
        },
        {
          text: "A dynamic, creative space with lots of inspiration",
          traits: { analytical: 0, creative: 3, social: 1, practical: 0, leadership: 1 }
        },
        {
          text: "An open, collaborative environment with constant interaction",
          traits: { analytical: 0, creative: 1, social: 3, practical: 1, leadership: 2 }
        },
        {
          text: "A structured environment with clear processes and goals",
          traits: { analytical: 2, creative: 0, social: 1, practical: 3, leadership: 2 }
        }
      ]
    },
    {
      id: 4,
      text: "When learning something new, you prefer to:",
      options: [
        {
          text: "Study the theory and understand the underlying principles",
          traits: { analytical: 3, creative: 0, social: 0, practical: 1, leadership: 0 }
        },
        {
          text: "Experiment and discover through trial and error",
          traits: { analytical: 1, creative: 3, social: 0, practical: 2, leadership: 1 }
        },
        {
          text: "Learn from others through discussion and collaboration",
          traits: { analytical: 1, creative: 1, social: 3, practical: 1, leadership: 1 }
        },
        {
          text: "Jump in and start applying it to real problems",
          traits: { analytical: 1, creative: 1, social: 0, practical: 3, leadership: 2 }
        }
      ]
    },
    {
      id: 5,
      text: "What motivates you most in your work?",
      options: [
        {
          text: "Solving complex puzzles and understanding how things work",
          traits: { analytical: 3, creative: 1, social: 0, practical: 2, leadership: 0 }
        },
        {
          text: "Creating something beautiful or innovative",
          traits: { analytical: 0, creative: 3, social: 1, practical: 1, leadership: 1 }
        },
        {
          text: "Helping others and making a positive impact",
          traits: { analytical: 1, creative: 1, social: 3, practical: 1, leadership: 2 }
        },
        {
          text: "Achieving concrete results and meeting goals",
          traits: { analytical: 2, creative: 0, social: 1, practical: 3, leadership: 2 }
        }
      ]
    },
    {
      id: 6,
      text: "When making decisions, you rely most on:",
      options: [
        {
          text: "Data, facts, and logical analysis",
          traits: { analytical: 3, creative: 0, social: 0, practical: 2, leadership: 1 }
        },
        {
          text: "Intuition and creative insights",
          traits: { analytical: 0, creative: 3, social: 1, practical: 0, leadership: 1 }
        },
        {
          text: "Input from others and consensus building",
          traits: { analytical: 1, creative: 1, social: 3, practical: 1, leadership: 2 }
        },
        {
          text: "Past experience and proven methods",
          traits: { analytical: 2, creative: 0, social: 0, practical: 3, leadership: 1 }
        }
      ]
    },
    {
      id: 7,
      text: "Your communication style is typically:",
      options: [
        {
          text: "Precise and detail-oriented",
          traits: { analytical: 3, creative: 0, social: 1, practical: 2, leadership: 1 }
        },
        {
          text: "Expressive and inspiring",
          traits: { analytical: 0, creative: 3, social: 2, practical: 0, leadership: 2 }
        },
        {
          text: "Warm and empathetic",
          traits: { analytical: 0, creative: 1, social: 3, practical: 1, leadership: 1 }
        },
        {
          text: "Direct and action-oriented",
          traits: { analytical: 1, creative: 0, social: 1, practical: 3, leadership: 3 }
        }
      ]
    },
    {
      id: 8,
      text: "In your free time, you enjoy:",
      options: [
        {
          text: "Reading, researching, or solving puzzles",
          traits: { analytical: 3, creative: 1, social: 0, practical: 1, leadership: 0 }
        },
        {
          text: "Art, music, writing, or other creative pursuits",
          traits: { analytical: 0, creative: 3, social: 1, practical: 0, leadership: 1 }
        },
        {
          text: "Socializing, volunteering, or community activities",
          traits: { analytical: 0, creative: 1, social: 3, practical: 1, leadership: 2 }
        },
        {
          text: "Sports, building things, or practical hobbies",
          traits: { analytical: 1, creative: 0, social: 1, practical: 3, leadership: 1 }
        }
      ]
    }
  ];

  const personalityTypes: { [key: string]: PersonalityResult } = {
    analytical: {
      type: 'analytical',
      name: 'The Analytical Thinker',
      description: 'You excel at breaking down complex problems, analyzing data, and finding logical solutions. Your systematic approach and attention to detail make you invaluable in technical and research-oriented roles.',
      strengths: ['Logical reasoning', 'Problem-solving', 'Attention to detail', 'Research skills', 'Critical thinking'],
      recommendedCareers: ['Data Wizard', 'Quantum Architect', 'Research Scientist', 'Systems Analyst', 'Financial Analyst'],
      skillBoosts: { logic: 2, technical: 1 }
    },
    creative: {
      type: 'creative',
      name: 'The Creative Innovator',
      description: 'You thrive on imagination, innovation, and artistic expression. Your ability to think outside the box and create original solutions makes you perfect for design and creative roles.',
      strengths: ['Innovation', 'Artistic vision', 'Original thinking', 'Adaptability', 'Inspiration'],
      recommendedCareers: ['Visuarch', 'Brandmancer', 'UX Enchanter', 'Content Creator', 'Art Director'],
      skillBoosts: { creativity: 2, social: 1 }
    },
    social: {
      type: 'social',
      name: 'The People Connector',
      description: 'You excel at understanding others, building relationships, and creating positive social impact. Your empathy and communication skills make you a natural in people-focused careers.',
      strengths: ['Empathy', 'Communication', 'Relationship building', 'Teamwork', 'Emotional intelligence'],
      recommendedCareers: ['AI Whisperer', 'Growth Hacker', 'HR Director', 'Social Worker', 'Marketing Manager'],
      skillBoosts: { social: 2, leadership: 1 }
    },
    practical: {
      type: 'practical',
      name: 'The Practical Implementer',
      description: 'You focus on getting things done efficiently and effectively. Your hands-on approach and results-oriented mindset make you excellent at execution and project management.',
      strengths: ['Execution', 'Efficiency', 'Results-oriented', 'Reliability', 'Project management'],
      recommendedCareers: ['Product Overlord', 'Operations Manager', 'Project Manager', 'Engineer', 'Consultant'],
      skillBoosts: { technical: 1, leadership: 1, logic: 1 }
    },
    leadership: {
      type: 'leadership',
      name: 'The Natural Leader',
      description: 'You have a gift for inspiring and guiding others toward common goals. Your vision and ability to motivate teams make you perfect for leadership and entrepreneurial roles.',
      strengths: ['Vision', 'Motivation', 'Strategic thinking', 'Decision making', 'Team building'],
      recommendedCareers: ['Metaverse God', 'Startup Founder', 'CEO', 'Team Lead', 'Entrepreneur'],
      skillBoosts: { leadership: 2, social: 1 }
    }
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeTest(newAnswers);
    }
  };

  const completeTest = (finalAnswers: number[]) => {
    // Calculate personality scores
    const scores = {
      analytical: 0,
      creative: 0,
      social: 0,
      practical: 0,
      leadership: 0
    };

    finalAnswers.forEach((answerIndex, questionIndex) => {
      const question = questions[questionIndex];
      const selectedOption = question.options[answerIndex];
      
      Object.entries(selectedOption.traits).forEach(([trait, value]) => {
        scores[trait as keyof typeof scores] += value;
      });
    });

    // Determine dominant personality type
    const dominantType = Object.entries(scores).reduce((a, b) => 
      scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
    )[0];

    const result = personalityTypes[dominantType];
    
    // Apply skill boosts
    if (character && result.skillBoosts) {
      Object.entries(result.skillBoosts).forEach(([skill, boost]) => {
        updateSkill(skill as keyof typeof character.skills, boost);
      });
      
      addExperience(500);
      addPoints('skill', 200);
    }

    setIsComplete(true);
    onComplete(result);
  };

  if (!character) return null;

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8">
        {!isComplete ? (
          <>
            {/* Progress Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white font-orbitron">
                  Personality Assessment
                </h2>
                <div className="text-slate-400">
                  {currentQuestion + 1} / {questions.length}
                </div>
              </div>
              
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-400 to-cyan-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-6">
                {currentQ.text}
              </h3>
              
              <div className="space-y-4">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full p-4 text-left bg-slate-800 border border-slate-600 rounded-lg hover:border-purple-500 hover:bg-slate-700 transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white group-hover:text-purple-300">
                        {option.text}
                      </span>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-400 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-cyan-400 mb-2">
                <Brain className="w-4 h-4" />
                <span className="text-sm font-semibold">Tip</span>
              </div>
              <p className="text-slate-300 text-sm">
                Answer honestly based on your natural preferences. There are no right or wrong answers - 
                this assessment will help identify your strengths and recommend suitable career paths.
              </p>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-4">🎯</div>
            <h2 className="text-3xl font-bold text-white mb-4 font-orbitron">
              Assessment Complete!
            </h2>
            <p className="text-slate-300 mb-6">
              Your personality insights have been analyzed and skill boosts have been applied to your character.
            </p>
            <div className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-purple-500/30 rounded-lg p-6">
              <div className="text-purple-400 font-bold text-lg mb-2">Rewards Earned:</div>
              <div className="space-y-1 text-slate-300">
                <div>+500 Experience Points</div>
                <div>+200 Skill Points</div>
                <div>Personality-based skill boosts applied</div>
                <div>Career recommendations unlocked</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalityTest;