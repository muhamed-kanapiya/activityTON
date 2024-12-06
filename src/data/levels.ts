export interface Level {
  level: number;
  title: string;
  minPoints: number;
  maxPoints: number;
  rewards?: string[];
}

export const levels: Level[] = [
  {
    level: 1,
    title: "Beginner",
    minPoints: 0,
    maxPoints: 499,
    rewards: ["Access to basic tasks"]
  },
  {
    level: 2,
    title: "Go-Getter",
    minPoints: 500,
    maxPoints: 1499,
    rewards: ["Daily streak bonus", "Custom task creation"]
  },
  {
    level: 3,
    title: "Achiever",
    minPoints: 1500,
    maxPoints: 2999,
    rewards: ["Weekly rewards", "Task sharing"]
  },
  {
    level: 4,
    title: "Expert",
    minPoints: 3000,
    maxPoints: 5999,
    rewards: ["Premium tasks", "Achievement badges"]
  },
  {
    level: 5,
    title: "Master",
    minPoints: 6000,
    maxPoints: 9999,
    rewards: ["Special rewards", "Community recognition"]
  },
  {
    level: 6,
    title: "Legend",
    minPoints: 10000,
    maxPoints: Infinity,
    rewards: ["Exclusive content", "Mentor status"]
  }
];

export const calculateLevel = (points: number): Level => {
  return levels.find(level => points >= level.minPoints && points <= level.maxPoints) || levels[0];
};

export const calculateProgress = (points: number, level: Level): number => {
  if (level.maxPoints === Infinity) return 100;
  const levelPoints = points - level.minPoints;
  const levelRange = level.maxPoints - level.minPoints;
  return Math.min(Math.floor((levelPoints / levelRange) * 100), 100);
};
