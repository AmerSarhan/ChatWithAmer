# Amer Sarhan - AI Chat Clone

A premium, mobile-first chat application where users can chat with Amer Sarhan's AI clone. Built with React, Tailwind CSS, and OpenAI API with secure backend integration.

## ✨ Features

- **🎨 Premium Mobile-First Design**: Native app-like experience optimized for iPhone and mobile devices
- **🔒 Secure API Integration**: OpenAI API key secured on the backend, never exposed to clients
- **⚡ Optimized Performance**: Lightweight, fast, and smooth animations
- **📱 PWA Ready**: Install as a native app on mobile devices
- **🧠 AI Personality**: Detailed knowledge of Amer's background, experience, and expertise
- **🎯 Function Calling**: AI can access and discuss specific resume sections
- **💬 Real-time Chat**: Smooth typing indicators and instant responses

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <repository-url>
cd amer-ai-chat
npm install
```

### 2. Development
```bash
npm start
```

The app will run at `http://localhost:3000`

### 3. Deploy to Vercel

#### Option 1: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add your OpenAI API key as environment variable
vercel env add OPENAI_API_KEY
```

#### Option 2: Vercel Dashboard
1. Import project from GitHub to Vercel
2. Add environment variable: `OPENAI_API_KEY` = `your_openai_api_key`
3. Deploy

## 🔐 Environment Variables

For production deployment, set these environment variables:

- `OPENAI_API_KEY`: Your OpenAI API key (server-side only, secure)

## 📱 Mobile Optimization

This app is specifically optimized for mobile devices with:

- **Dynamic Viewport Height**: Handles mobile browsers correctly
- **Safe Area Support**: Works with iPhone notches and home indicators
- **Touch Optimization**: 44px minimum touch targets for iOS
- **Performance**: Reduced animations and optimized glassmorphism for mobile
- **Keyboard Handling**: Smart layout adjustments when keyboard appears
- **App-like Feel**: No text selection, proper touch feedback

## 🏗️ Architecture

### Frontend (React)
- **React 18**: Modern hooks and concurrent features
- **Tailwind CSS 3.4**: Mobile-first responsive design
- **Inter Font**: Clean, readable typography
- **PWA Manifest**: App installation support

### Backend (Vercel Serverless)
- **API Routes**: Secure OpenAI integration
- **Function Calling**: Resume data access
- **Error Handling**: Graceful fallbacks

## 🎯 AI Capabilities

Amer's AI clone can discuss:
- **Professional Background**: 10+ years in digital marketing
- **Technical Expertise**: DSP platforms (StackAdapt, Eskimi, Mediasmart)
- **Major Clients**: Careem, Pizza Hut, Namshi, H&M, Carrefour
- **Experience**: Account management, performance marketing
- **Education**: IT background from Arab Open University
- **Current Role**: Senior Account Manager at TechVantage Dubai

## 🛠️ Development

### Project Structure
```
src/
  ├── components/           # React components
  │   ├── Header.js        # Clean app header
  │   ├── ChatMessage.js   # Optimized message display
  │   └── ChatInput.js     # Mobile-first input
  ├── services/
  │   └── chatService.js   # API communication
  └── index.css           # Mobile-optimized styles

api/
  ├── chat.js             # Secure OpenAI integration
  └── status.js           # API status endpoint
```

### Key Improvements in This Version

1. **Mobile Performance**: Removed heavy animations and particles
2. **Security**: API key moved to secure backend
3. **UX**: Cleaner, more native app-like interface
4. **Accessibility**: Better contrast and reduced motion support
5. **Touch Interactions**: Optimized for mobile gestures

## 📄 License

Private project for Amer Sarhan's portfolio.

## 🤝 Contact

For questions about this AI clone, chat with the app or contact Amer Sarhan:
- LinkedIn: https://www.linkedin.com/in/amersarhan/
- Email: amer.sarhan@gmail.com 