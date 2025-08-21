# Chat With Amer 🤖💬

> **AI-Powered Portfolio Platform** - Experience the future of interactive communication with an intelligent chat interface that showcases professional capabilities and modern web development.

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AmerSarhan/ChatWithAmer)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

## 🌟 Overview

**Chat With Amer** is a cutting-edge, AI-powered portfolio platform that demonstrates modern web development practices, secure API integrations, and professional-grade architecture. Built with React and Node.js, it features an intelligent chat interface, seamless calendar integration, and a responsive design that showcases both technical expertise and user experience excellence.

### ✨ Key Features

- 🤖 **AI-Powered Chat Interface** - Intelligent conversation capabilities
- 📅 **Calendar Integration** - Seamless scheduling with Calendly and Google Calendar
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🔒 **Enterprise Security** - Secure API integrations with environment-based configuration
- 🚀 **Modern Architecture** - Built with React 18, Node.js, and modern ES6+ features
- 📊 **Performance Optimized** - Lazy loading, code splitting, and optimized builds

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Tailwind CSS 3.4** - Utility-first CSS framework for rapid UI development
- **React Router** - Client-side routing for seamless navigation
- **EmailJS** - Client-side email functionality

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Fast, unopinionated web framework
- **Google APIs** - Calendar and Meet integration
- **Calendly API** - Professional scheduling integration

### Development & Deployment
- **Vercel** - Serverless deployment platform
- **PostCSS** - CSS processing and optimization
- **Git** - Version control with secure credential management

## 🚀 Live Demo

**Experience the platform live:**
- 🌐 **Production**: [chatwithamer.com](https://chatwithamer.com)
- 📱 **Mobile Optimized**: Responsive design for all devices
- 🔒 **Secure**: HTTPS enabled with security best practices

## 📦 Installation

### Prerequisites
- **Node.js** 18.0 or higher
- **npm** 9.0 or higher
- **Git** for version control

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/AmerSarhan/ChatWithAmer.git
   cd ChatWithAmer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your actual API keys
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env` file in the project root:

```bash
# Calendly API
CALENDLY_TOKEN=your_actual_calendly_token

# Google Calendar API
GOOGLE_CLIENT_ID=your_actual_client_id
GOOGLE_CLIENT_SECRET=your_actual_client_secret
GOOGLE_REDIRECT_URI=your_actual_redirect_uri

# EmailJS (if using)
EMAILJS_PUBLIC_KEY=your_actual_public_key
EMAILJS_PRIVATE_KEY=your_actual_private_key

# Server Configuration
PORT=3001
NODE_ENV=development
```

## 🎯 Usage Examples

### Starting a Chat Session
```javascript
// Initialize chat with AI
const chatInstance = new ChatService();
await chatInstance.startSession();
```

### Calendar Integration
```javascript
// Create a meeting
const meeting = await calendarService.createMeeting({
  title: "Project Discussion",
  duration: 30,
  attendees: ["client@example.com"]
});
```

### API Endpoints
```bash
# Chat API
POST /api/chat
# Calendar API  
POST /api/calendar
# Calendly API
POST /api/calendly
# Status API
GET /api/status
```

## 🔧 Development

### Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run test suite
npm run eject      # Eject from Create React App
```

### Project Structure

```
ChatWithAmer/
├── api/                 # Backend API endpoints
│   ├── calendar.js     # Google Calendar integration
│   ├── calendly.js     # Calendly scheduling
│   ├── chat.js         # AI chat functionality
│   └── status.js       # System status
├── public/              # Static assets
├── src/                 # React source code
│   ├── components/      # Reusable UI components
│   ├── services/        # Business logic services
│   └── App.js          # Main application component
├── .env.example         # Environment variables template
├── .gitignore          # Git ignore rules
└── SECURITY.md         # Security documentation
```

## 🔒 Security Features

- **Environment-based configuration** - No hardcoded secrets
- **Comprehensive .gitignore** - Protects sensitive files
- **API key management** - Secure credential handling
- **CORS protection** - Controlled cross-origin access
- **Input validation** - Secure data handling

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS approach
- **Vercel** - For seamless deployment
- **OpenAI** - For AI capabilities
- **Google APIs** - For calendar integration

## 📞 Contact

- **GitHub**: [@AmerSarhan](https://github.com/AmerSarhan)
- **Portfolio**: [chatwithamer.com](https://chatwithamer.com)
- **LinkedIn**: [Amer Sarhan](https://linkedin.com/in/amersarhan)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=AmerSarhan/ChatWithAmer&type=Date)](https://star-history.com/#AmerSarhan/ChatWithAmer&Date)

---

**Made with ❤️ by Amer Sarhan**

*If you find this project helpful, please give it a ⭐ star on GitHub!* 