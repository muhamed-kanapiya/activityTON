# ActivityTON - Telegram Mini App

A gamified productivity app built as a Telegram Mini App that helps users manage tasks while earning achievements and leveling up.

## 🌟 Features

- ✅ Task Management with custom lists
- 🏆 Achievement System
- 📊 Progress Tracking
- 🎮 Level-based Progression
- 🌙 Dark Mode Support
- 📱 Responsive Design

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Telegram Bot Token (for deployment)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/activityTON.git
cd activityTON
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Build for production:
```bash
npm run build
```

## 🔧 Telegram Mini App Setup

1. Contact [@BotFather](https://t.me/BotFather) on Telegram
2. Create a new bot or select an existing one
3. Use the `/newapp` command to create a new mini app
4. Set the mini app URL to your deployed application URL

## 🏗️ Project Structure

```
src/
  ├── components/
  │   ├── Onboarding.tsx    # Onboarding slides
  │   ├── TaskList.tsx      # Task management
  │   ├── Levels.tsx        # Achievements system
  │   ├── UserHeader.tsx    # User profile display
  │   └── BottomMenu.tsx    # Navigation menu
  ├── App.tsx              # Main app component
  ├── index.tsx           # Entry point
  └── styles/
      ├── App.css         # Main styles
      └── index.css       # Global styles
```

## 🎨 Features Detail

### Task Management
- Create, edit, and delete tasks
- Mark tasks as complete
- Custom task lists
- Progress tracking

### Achievement System
- Multiple achievement categories
- Progress tracking for each achievement
- Visual feedback on completion
- XP rewards

### User Profile
- Display user information
- Level progression
- XP tracking
- Achievement showcase

## 🛠️ Built With

- [React](https://reactjs.org/) - UI Framework
- [TypeScript](https://www.typescriptlang.org/) - Language
- [@twa-dev/sdk](https://github.com/twa-dev/sdk) - Telegram Web App SDK
- [React Router](https://reactrouter.com/) - Navigation

## 📱 Telegram Features Used

- User Authentication
- Theme Variables
- Main Button
- Back Button
- Haptic Feedback
- Cloud Storage

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Telegram Team for the Mini Apps platform
- TON Foundation
- The React community
