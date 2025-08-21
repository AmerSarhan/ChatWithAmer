import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import CVPage from './components/CVPage';
import { getChatResponse, getApiStatus } from './services/chatService';
import { sendContactEmail } from './services/emailService';

// Chat Component
const ChatApp = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! 👋 I'm Amer Sarhan's AI clone. I'm a Senior Account Manager in Dubai with expertise in digital marketing and AI development. What would you like to know?",
      sender: 'amer',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  // SEO and Analytics setup
  useEffect(() => {
    // Update page title for chat
    document.title = "Chat with Amer Sarhan AI | Digital Marketing Expert Dubai";

    // Add structured data for current page state
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Amer Sarhan AI Chat",
      "applicationCategory": "ChatApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "author": {
        "@type": "Person",
        "name": "Amer Sarhan"
      }
    };

    // Update or create structured data script
    let existingScript = document.getElementById('app-structured-data');
    if (existingScript) {
      existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.id = 'app-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Add console message for developers
    if (!window.amerConsoleShown) {
      console.clear();
      console.log('%c🚀 Amer Sarhan - Digital Marketing Expert', 'color: #22c5c5; font-size: 20px; font-weight: bold;');
      console.log('%c💼 Senior Account Manager at TechVantage Dubai', 'color: #3b82f6; font-size: 14px;');
      console.log('%c📧 Contact: amer.sarhan@gmail.com', 'color: #22c5c5; font-size: 12px;');
      console.log('%c🔗 LinkedIn: https://www.linkedin.com/in/amersarhan/', 'color: #3b82f6; font-size: 12px;');
      console.log('%c📍 Location: Dubai, UAE', 'color: #22c5c5; font-size: 12px;');
      console.log('%c💡 Skills: Digital Marketing, DSP Platforms, AI Development', 'color: #3b82f6; font-size: 12px;');
      console.log('%c🤖 Chat with my AI clone above!', 'color: #22c5c5; font-size: 14px; font-weight: bold;');
      window.amerConsoleShown = true;
    }

    // Get API status for SEO monitoring
    getApiStatus().then(status => {
      console.log('API Status:', status);
    });
  }, []);

  // Performance monitoring
  useEffect(() => {
    // Report Core Web Vitals
    if ('performance' in window && 'measure' in performance) {
      // Largest Contentful Paint
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log('LCP:', entry.startTime);
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            console.log('CLS:', entry.value);
          }
        }
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleBackToLanding = () => {
    window.location.href = '/';
  };

  const handleSendMessage = async (text) => {
    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const response = await getChatResponse(
        text, 
        messages,
        async (emailData) => {
          try {
            const result = await sendContactEmail(emailData);
            if (result.success) {
              const confirmationMessage = {
                id: Date.now() + 1,
                text: "Perfect! I've sent your message to Amer. He'll get back to you soon. Thanks for reaching out! 📧",
                sender: 'amer',
                timestamp: new Date()
              };
              setMessages(prev => [...prev, confirmationMessage]);
            } else {
              throw new Error(result.message);
            }
          } catch (error) {
            console.error('Email send failed:', error);
            const errorMessage = {
              id: Date.now() + 1,
              text: "I apologize, but there was an issue sending your message. Please try again or contact Amer directly at amer.sarhan@gmail.com",
              sender: 'amer',
              timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
          }
        }
      );

      setTimeout(() => {
        const botMessage = {
          id: Date.now() + 1,
          text: response,
          sender: 'amer',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 800 + Math.random() * 400);
    } catch (error) {
      console.error('Error getting chat response:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting right now. Please try again in a moment!",
        sender: 'amer',
        timestamp: new Date()
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 800);
    }
  };

  // Show chat interface
  return (
    <div className="app-container">
      <Header onBackToLanding={handleBackToLanding} />
      
      {/* Main chat area with proper bottom spacing */}
      <div 
        ref={chatContainerRef}
        className="chat-container"
      >
        <div className="chat-messages">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-3 mb-6">
              <div className="avatar">A</div>
              <div className="message-assistant message-bubble">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                  <span className="text-white/60 text-sm font-medium">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Fixed input area */}
      <div className="input-container">
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};

// Landing Page Component
const HomePage = () => {
  const handleStartChat = () => {
    window.location.href = '/chat';
  };

  useEffect(() => {
    document.title = "Amer Sarhan - Senior Account Manager & AI Developer | Dubai Digital Marketing Expert";
  }, []);

  return <LandingPage onStartChat={handleStartChat} />;
};

// Main App with Router
function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/cv" element={<CVPage />} />
      </Routes>
    </Router>
  );
}

export default App; 