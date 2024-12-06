export interface PresetTask {
  id: string;
  text: string;
  category: string;
  points: number;
  repeat?: 'none' | 'daily' | 'weekly' | 'monthly';
  link?: string;
  description?: string;
}

export const taskDatabase: PresetTask[] = [
  // Morning Rituals
  {
    id: 'morning-1',
    text: 'Wake up before 7 AM',
    category: 'Morning Rituals 🌅',
    points: 50,
    repeat: 'daily',
    description: 'Start your day early for better productivity'
  },
  {
    id: 'morning-2',
    text: 'Morning meditation (10 min)',
    category: 'Morning Rituals 🌅',
    points: 30,
    repeat: 'daily',
    description: 'Practice mindfulness to start your day'
  },
  
  // Fitness
  {
    id: 'fitness-1',
    text: 'Complete gym workout',
    category: 'Fitness 💪',
    points: 100,
    repeat: 'daily',
    description: 'Complete your planned workout routine'
  },
  {
    id: 'fitness-2',
    text: '10,000 steps',
    category: 'Fitness 💪',
    points: 50,
    repeat: 'daily',
    description: 'Reach your daily step goal'
  },

  // Education
  {
    id: 'edu-1',
    text: 'Study session (1 hour)',
    category: 'Education 📚',
    points: 80,
    repeat: 'daily',
    description: 'Focus on learning something new'
  },
  {
    id: 'edu-2',
    text: 'Read educational content',
    category: 'Education 📚',
    points: 40,
    repeat: 'daily',
    description: 'Read articles, books, or educational materials'
  },

  // Social Tasks
  {
    id: 'social-1',
    text: 'Subscribe to ActivityTON Channel',
    category: 'Social 🤝',
    points: 200,
    repeat: 'none',
    link: 'https://t.me/activityTON',
    description: 'Join our Telegram channel for updates'
  },
  {
    id: 'social-2',
    text: 'Join ActivityTON Group',
    category: 'Social 🤝',
    points: 200,
    repeat: 'none',
    link: 'https://t.me/activityTON_group',
    description: 'Join our community group'
  },

  // Productivity
  {
    id: 'prod-1',
    text: 'Complete daily planning',
    category: 'Productivity ⚡',
    points: 30,
    repeat: 'daily',
    description: 'Plan your tasks and goals for the day'
  },
  {
    id: 'prod-2',
    text: 'Zero inbox',
    category: 'Productivity ⚡',
    points: 40,
    repeat: 'daily',
    description: 'Clear all pending emails and messages'
  }
];
