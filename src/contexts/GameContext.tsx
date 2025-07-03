import React, { createContext, useContext, useState, useEffect } from 'react';

interface Skills {
  logic: number;
  creativity: number;
  leadership: number;
  technical: number;
  social: number;
}

interface Character {
  id: string;
  name: string;
  faction: string;
  level: number;
  experience: number;
  skillPoints: number;
  careerPoints: number;
  questPoints: number;
  battlePoints: number;
  totalPoints: number;
  skills: Skills;
  unlockedCareers: string[];
  badges: string[];
  completedQuests: string[];
  achievements: string[];
  streak: number;
  lastActive: string;
}

interface GameContextType {
  character: Character | null;
  createCharacter: (name: string, faction: string) => void;
  updateSkill: (skill: keyof Skills, points: number) => void;
  unlockCareer: (careerId: string) => void;
  awardBadge: (badgeId: string) => void;
  completeQuest: (questId: string) => void;
  addExperience: (amount: number) => void;
  addPoints: (type: 'skill' | 'career' | 'quest' | 'battle', amount: number) => void;
  unlockAchievement: (achievementId: string) => void;
  updateStreak: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    // Load character from localStorage
    const storedCharacter = localStorage.getItem('careerClashCharacter');
    if (storedCharacter) {
      const parsedCharacter = JSON.parse(storedCharacter);
      
      // Ensure all properties are initialized with proper defaults
      const normalizedCharacter: Character = {
        id: parsedCharacter.id || Math.random().toString(36).substr(2, 9),
        name: parsedCharacter.name || 'Unknown',
        faction: parsedCharacter.faction || 'neutral',
        level: parsedCharacter.level || 1,
        experience: parsedCharacter.experience || 0,
        skillPoints: parsedCharacter.skillPoints || 0,
        careerPoints: parsedCharacter.careerPoints || 0,
        questPoints: parsedCharacter.questPoints || 0,
        battlePoints: parsedCharacter.battlePoints || 0,
        totalPoints: parsedCharacter.totalPoints || 0,
        streak: parsedCharacter.streak || 0,
        lastActive: parsedCharacter.lastActive || new Date().toISOString(),
        unlockedCareers: parsedCharacter.unlockedCareers || [],
        badges: parsedCharacter.badges || [],
        completedQuests: parsedCharacter.completedQuests || [],
        achievements: parsedCharacter.achievements || [],
        skills: parsedCharacter.skills || {
          logic: 1,
          creativity: 1,
          leadership: 1,
          technical: 1,
          social: 1
        }
      };
      
      setCharacter(normalizedCharacter);
    }
  }, []);

  const saveCharacter = (char: Character) => {
    localStorage.setItem('careerClashCharacter', JSON.stringify(char));
  };

  const createCharacter = (name: string, faction: string) => {
    const newCharacter: Character = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      faction,
      level: 1,
      experience: 0,
      skillPoints: 0,
      careerPoints: 0,
      questPoints: 0,
      battlePoints: 0,
      totalPoints: 0,
      skills: {
        logic: 1,
        creativity: 1,
        leadership: 1,
        technical: 1,
        social: 1
      },
      unlockedCareers: [],
      badges: [],
      completedQuests: [],
      achievements: [],
      streak: 0,
      lastActive: new Date().toISOString()
    };

    setCharacter(newCharacter);
    saveCharacter(newCharacter);
  };

  const updateSkill = (skill: keyof Skills, points: number) => {
    if (!character) return;

    const updatedCharacter = {
      ...character,
      skills: {
        ...character.skills,
        [skill]: Math.max(0, Math.min(10, character.skills[skill] + points))
      }
    };

    setCharacter(updatedCharacter);
    saveCharacter(updatedCharacter);
  };

  const unlockCareer = (careerId: string) => {
    if (!character || character.unlockedCareers.includes(careerId)) return;

    const updatedCharacter = {
      ...character,
      unlockedCareers: [...character.unlockedCareers, careerId]
    };

    setCharacter(updatedCharacter);
    saveCharacter(updatedCharacter);
  };

  const awardBadge = (badgeId: string) => {
    if (!character || character.badges.includes(badgeId)) return;

    const updatedCharacter = {
      ...character,
      badges: [...character.badges, badgeId]
    };

    setCharacter(updatedCharacter);
    saveCharacter(updatedCharacter);
  };

  const completeQuest = (questId: string) => {
    if (!character || character.completedQuests.includes(questId)) return;

    const updatedCharacter = {
      ...character,
      completedQuests: [...character.completedQuests, questId]
    };

    setCharacter(updatedCharacter);
    saveCharacter(updatedCharacter);
  };

  const addExperience = (amount: number) => {
    if (!character) return;

    const newExp = character.experience + amount;
    const newLevel = Math.floor(newExp / 1000) + 1;

    const updatedCharacter = {
      ...character,
      experience: newExp,
      level: newLevel
    };

    setCharacter(updatedCharacter);
    saveCharacter(updatedCharacter);
  };

  const addPoints = (type: 'skill' | 'career' | 'quest' | 'battle', amount: number) => {
    if (!character) return;

    const updatedCharacter = {
      ...character,
      [`${type}Points`]: character[`${type}Points` as keyof Character] as number + amount,
      totalPoints: character.totalPoints + amount
    };

    setCharacter(updatedCharacter);
    saveCharacter(updatedCharacter);
  };

  const unlockAchievement = (achievementId: string) => {
    if (!character || character.achievements.includes(achievementId)) return;

    const updatedCharacter = {
      ...character,
      achievements: [...character.achievements, achievementId]
    };

    setCharacter(updatedCharacter);
    saveCharacter(updatedCharacter);
  };

  const updateStreak = () => {
    if (!character) return;

    const today = new Date().toDateString();
    const lastActive = new Date(character.lastActive).toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    let newStreak = character.streak;
    
    if (lastActive === yesterday) {
      newStreak += 1;
    } else if (lastActive !== today) {
      newStreak = 1;
    }

    const updatedCharacter = {
      ...character,
      streak: newStreak,
      lastActive: new Date().toISOString()
    };

    setCharacter(updatedCharacter);
    saveCharacter(updatedCharacter);
  };

  return (
    <GameContext.Provider value={{
      character,
      createCharacter,
      updateSkill,
      unlockCareer,
      awardBadge,
      completeQuest,
      addExperience,
      addPoints,
      unlockAchievement,
      updateStreak
    }}>
      {children}
    </GameContext.Provider>
  );
};