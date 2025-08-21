import React, { useState } from 'react';

const LandingPage = ({ onStartChat }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStartChat = () => {
    setIsLoading(true);
    setTimeout(() => {
      onStartChat();
    }, 1000);
  };

  return (
    <div className="landing-container">
      {/* Background Elements */}
      <div className="landing-bg-element landing-bg-1"></div>
      <div className="landing-bg-element landing-bg-2"></div>
      <div className="landing-bg-element landing-bg-3"></div>
      
      <div className="landing-content">
        {/* Header */}
        <header className="landing-header">
          <div className="landing-nav">
            <div className="landing-logo">
              <span className="landing-logo-text">AS</span>
            </div>
            <div className="landing-nav-links">
              <a href="/cv" className="nav-link nav-link-cv">CV</a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="landing-main">
          <div className="landing-hero">
            {/* Photo Section */}
            <div className="photo-container">
              <div className="photo-wrapper">
                <img 
                  src="/amer.png" 
                  alt="Amer Sarhan" 
                  className="hero-photo"
                />
                <div className="photo-glow"></div>
              </div>
            </div>

            {/* Text Content */}
            <div className="hero-content">
              <div className="hero-badge">
                <span>🤖 AI Assistant</span>
              </div>
              
              <h1 className="hero-title">
                Meet Amer Sarhan's
                <span className="title-highlight"> AI Clone</span>
              </h1>
              
              <p className="hero-description">
                Connect with an AI version of Amer Sarhan, a seasoned Senior Account Manager based in Dubai. 
                Discover insights from over a decade of expertise in digital marketing, performance marketing, 
                and strategic account management. With a technical background in building AI platforms and web solutions, 
                he brings a unique perspective to the intersection of marketing and technology.
              </p>

              {/* Stats */}
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">10+</div>
                  <div className="stat-label">Years Experience</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">AI</div>
                  <div className="stat-label">Platforms Built</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">Global</div>
                  <div className="stat-label">Markets</div>
                </div>
              </div>

              {/* CTA Button */}
              <button 
                onClick={handleStartChat}
                disabled={isLoading}
                className="cta-button"
              >
                {isLoading ? (
                  <div className="button-loading">
                    <div className="loading-spinner"></div>
                    <span>Connecting...</span>
                  </div>
                ) : (
                  <>
                    <span>Start Conversation</span>
                    <svg className="button-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>

              {/* Expertise Tags */}
              <div className="expertise-tags">
                <span className="tag">Digital Marketing</span>
                <span className="tag">Account Management</span>
                <span className="tag">AI Development</span>
                <span className="tag">Data Analytics</span>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="landing-footer">
          <p>
            Based in Dubai, UAE • Fluent in English & Arabic • 
            <a href="https://www.linkedin.com/in/amersarhan/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage; 