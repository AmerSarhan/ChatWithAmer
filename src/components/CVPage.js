import React, { useState, useEffect } from 'react';

const CVPage = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading effect
    setTimeout(() => setIsLoading(false), 800);
    
    // Update document title for SEO
    document.title = "Amer Sarhan - CV | Senior Account Manager & AI Developer | Dubai";
    
    // Handle scroll-based section activation
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(section);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLoading) {
    return (
      <div className="cv-loading">
        <div className="loading-logo">
          <div className="loading-spinner-large"></div>
          <span className="loading-text">Initializing CV...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="cv-container">
      {/* Background Elements */}
      <div className="cv-bg-element cv-bg-1"></div>
      <div className="cv-bg-element cv-bg-2"></div>
      <div className="cv-bg-element cv-bg-3"></div>
      <div className="cv-bg-element cv-bg-4"></div>
      
      {/* Navigation Dots */}
      <div className="cv-nav-dots">
        {['hero', 'experience', 'skills', 'projects', 'contact'].map((section, index) => (
          <button
            key={section}
            className={`nav-dot ${activeSection === section ? 'active' : ''}`}
            onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })}
            aria-label={`Navigate to ${section}`}
          >
            <span className="nav-dot-label">{section === 'experience' ? 'tech' : section}</span>
          </button>
        ))}
      </div>

      {/* Hero Section */}
      <section id="hero" className="cv-section cv-hero">
        <div className="cv-content">
          <div className="hero-grid">
            <div className="hero-visual">
              <div className="hero-photo-container">
                <img 
                  src="/amer.png" 
                  alt="Amer Sarhan" 
                  className="hero-photo-cv"
                />
                <div className="photo-hologram"></div>
              </div>
              <div className="hero-metrics">
                <div className="metric-card">
                  <div className="metric-value">10+</div>
                  <div className="metric-label">Years</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">AI</div>
                  <div className="metric-label">Pioneer</div>
                </div>
                <div className="metric-card">
                  <div className="metric-value">Global</div>
                  <div className="metric-label">Scale</div>
                </div>
              </div>
            </div>
            
            <div className="hero-info">
              <div className="hero-badge-cv">
                <span className="badge-dot"></span>
                Senior Account Manager & AI Developer
              </div>
              
              <h1 className="hero-title-cv">
                Amer Sarhan
                <span className="title-subtitle">AI Platform Architect & Web3 Builder</span>
              </h1>
              
              <div className="hero-description-cv">
                <p>
                  Full-stack AI platform builder specializing in conversational AI, blockchain integrations, 
                  and next-generation Web3 applications. Creating production-ready AI solutions that 
                  scale to millions of users while pioneering innovative crypto-native experiences.
                </p>
                <p>
                  Based in Dubai's emerging tech hub, building the infrastructure for the next 
                  generation of AI-powered applications and decentralized platforms that reshape 
                  how people interact with technology.
                </p>
              </div>

              <div className="hero-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon">🤖</div>
                  <div className="highlight-text">
                    <strong>AI Platform Architect</strong>
                    <span>Production-Scale Systems</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">⚡</div>
                  <div className="highlight-text">
                    <strong>Web3 Developer</strong>
                    <span>Blockchain Integrations</span>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon">🚀</div>
                  <div className="highlight-text">
                    <strong>Full-Stack Builder</strong>
                    <span>AI-First Applications</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Showcase */}
      <section id="experience" className="cv-section cv-tech-showcase">
        <div className="cv-content">
          <div className="section-header">
            <h2 className="section-title">Technology Arsenal</h2>
            <p className="section-subtitle">Production-grade AI and blockchain infrastructure</p>
          </div>
          
          <div className="tech-showcase-grid">
            <div className="tech-category">
              <div className="tech-header">
                <div className="tech-icon">⚡</div>
                <h3>AI Infrastructure</h3>
              </div>
              <div className="tech-items">
                <div className="tech-item featured">GPT-4 Integration</div>
                <div className="tech-item">Custom ML Pipelines</div>
                <div className="tech-item">Real-time Processing</div>
                <div className="tech-item">Conversation AI</div>
                <div className="tech-item">Audio Generation</div>
              </div>
            </div>

            <div className="tech-category">
              <div className="tech-header">
                <div className="tech-icon">₿</div>
                <h3>Blockchain Stack</h3>
              </div>
              <div className="tech-items">
                <div className="tech-item featured">Smart Contracts</div>
                <div className="tech-item">Multi-chain Support</div>
                <div className="tech-item">DeFi Protocols</div>
                <div className="tech-item">Trading Algorithms</div>
                <div className="tech-item">Web3 Integration</div>
              </div>
            </div>

            <div className="tech-category">
              <div className="tech-header">
                <div className="tech-icon">🚀</div>
                <h3>Platform Engineering</h3>
              </div>
              <div className="tech-items">
                <div className="tech-item featured">Microservices</div>
                <div className="tech-item">Docker & K8s</div>
                <div className="tech-item">Real-time APIs</div>
                <div className="tech-item">Cloud Architecture</div>
                <div className="tech-item">High-freq Systems</div>
              </div>
            </div>
          </div>

          <div className="stats-showcase">
            <div className="stat-card">
              <div className="stat-number">5</div>
              <div className="stat-label">Live Platforms</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3K+</div>
              <div className="stat-label">Users</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">98%</div>
              <div className="stat-label">Uptime</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">AI Operations</div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Matrix */}
      <section id="skills" className="cv-section cv-skills">
        <div className="cv-content">
          <div className="section-header">
            <h2 className="section-title">Technical Arsenal</h2>
            <p className="section-subtitle">Where marketing strategy meets cutting-edge technology</p>
          </div>
          
          <div className="skills-grid">
            <div className="skill-category glass-card">
              <div className="skill-icon">🤖</div>
              <h3>AI & Machine Learning</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <span>Python (TensorFlow, PyTorch)</span>
                  <div className="skill-level">
                    <div className="skill-bar" style={{width: '90%'}}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>OpenAI GPT Integration</span>
                  <div className="skill-level">
                    <div className="skill-bar" style={{width: '95%'}}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Computer Vision (CV2)</span>
                  <div className="skill-level">
                    <div className="skill-bar" style={{width: '80%'}}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>MLOps & Model Deployment</span>
                  <div className="skill-level">
                    <div className="skill-bar" style={{width: '85%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="skill-category glass-card">
              <div className="skill-icon">💻</div>
              <h3>Full-Stack Development</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <span>React.js & Next.js</span>
                  <div className="skill-level">
                    <div className="skill-bar" style={{width: '92%'}}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Node.js & Express</span>
                  <div className="skill-level">
                    <div className="skill-bar" style={{width: '88%'}}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>PostgreSQL & MongoDB</span>
                  <div className="skill-level">
                    <div className="skill-bar" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Docker & AWS</span>
                  <div className="skill-level">
                    <div className="skill-bar" style={{width: '83%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="skill-category glass-card">
              <div className="skill-icon">₿</div>
              <h3>Blockchain & DeFi</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <span>Solidity Smart Contracts</span>
                  <div className="skill-level">
                    <div className="skill-bar" style={{width: '88%'}}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Web3.js & Ethers.js</span>
                  <div className="skill-level">
                    <div className="skill-bar" style={{width: '92%'}}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>DeFi Protocol Integration</span>
                  <div className="skill-level">
                    <div className="skill-bar" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Cross-chain Development</span>
                  <div className="skill-level">
                    <div className="skill-bar" style={{width: '80%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="skill-category glass-card">
              <div className="skill-icon">⚡</div>
              <h3>Infrastructure & DevOps</h3>
              <div className="skill-items">
                <div className="skill-item">
                  <span>Docker & Kubernetes</span>
                  <div className="skill-level">
                    <div className="skill-bar" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>AWS Cloud Architecture</span>
                  <div className="skill-level">
                    <div className="skill-bar" style={{width: '82%'}}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>Microservices Design</span>
                  <div className="skill-level">
                    <div className="skill-bar" style={{width: '88%'}}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span>High-frequency Systems</span>
                  <div className="skill-level">
                    <div className="skill-bar" style={{width: '80%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="cv-section cv-projects">
        <div className="cv-content">
          <div className="section-header">
            <h2 className="section-title">Flagship Projects</h2>
            <p className="section-subtitle">Innovation at the intersection of AI and marketing</p>
          </div>
          
          <div className="projects-grid">
            <div className="project-card glass-card-strong">
              <div className="project-header">
                <div className="project-icon">🎵</div>
                <div className="project-meta">
                  <h3>Live AI</h3>
                  <span className="project-status">Live • liveaieth.com</span>
                </div>
              </div>
              <p className="project-description">
                "Turn your thoughts into music." Real-time AI music generator that creates 
                original compositions with matching cover art. Built with advanced audio AI 
                models and generative art algorithms for complete musical experiences.
              </p>
              <div className="project-impact">
                <div className="impact-metric">
                  <span className="metric">AI Music</span>
                  <span className="label">Real-time Gen</span>
                </div>
                <div className="impact-metric">
                  <span className="metric">Cover Art</span>
                  <span className="label">Auto-generated</span>
                </div>
                <div className="impact-metric">
                  <span className="metric">Live</span>
                  <span className="label">Production</span>
                </div>
              </div>
              <div className="project-tech">
                <span>Audio AI</span>
                <span>React</span>
                <span>Python</span>
                <span>WebAudio API</span>
              </div>
              <a href="https://liveaieth.com" target="_blank" rel="noopener noreferrer" className="project-link">
                Visit Platform →
              </a>
            </div>

            <div className="project-card glass-card-strong">
              <div className="project-header">
                <div className="project-icon">📱</div>
                <div className="project-meta">
                  <h3>TikTok AI</h3>
                  <span className="project-status">Live • tiktokaieth.com</span>
                </div>
              </div>
              <p className="project-description">
                "The virality engine behind your next post." AI system that creates viral 
                TikTok hooks, captions, and trend-matched formats. Analyzes current trends 
                and generates content optimized for maximum engagement.
              </p>
              <div className="project-impact">
                <div className="impact-metric">
                  <span className="metric">Viral</span>
                  <span className="label">Content Gen</span>
                </div>
                <div className="impact-metric">
                  <span className="metric">Trend</span>
                  <span className="label">Analysis</span>
                </div>
                <div className="impact-metric">
                  <span className="metric">Live</span>
                  <span className="label">Platform</span>
                </div>
              </div>
              <div className="project-tech">
                <span>GPT-4</span>
                <span>Trend Analysis</span>
                <span>React</span>
                <span>Node.js</span>
              </div>
              <a href="https://tiktokaieth.com" target="_blank" rel="noopener noreferrer" className="project-link">
                Visit Platform →
              </a>
            </div>

            <div className="project-card glass-card-strong">
              <div className="project-header">
                <div className="project-icon">🤖</div>
                <div className="project-meta">
                  <h3>Aria AI</h3>
                  <span className="project-status">Live • ariaaieth.com</span>
                </div>
              </div>
              <p className="project-description">
                "The complete AI creation hub." Create agents, tools, content, and full-stack 
                GPT workflows. A comprehensive personal & business-grade AI command center 
                for building and deploying AI solutions.
              </p>
              <div className="project-impact">
                <div className="impact-metric">
                  <span className="metric">AI Agents</span>
                  <span className="label">Creation Hub</span>
                </div>
                <div className="impact-metric">
                  <span className="metric">Full-Stack</span>
                  <span className="label">Workflows</span>
                </div>
                <div className="impact-metric">
                  <span className="metric">Enterprise</span>
                  <span className="label">Ready</span>
                </div>
              </div>
              <div className="project-tech">
                <span>OpenAI API</span>
                <span>React</span>
                <span>Python</span>
                <span>Docker</span>
              </div>
              <a href="https://ariaaieth.com" target="_blank" rel="noopener noreferrer" className="project-link">
                Visit Platform →
              </a>
            </div>

            <div className="project-card glass-card-strong">
              <div className="project-header">
                <div className="project-icon">₿</div>
                <div className="project-meta">
                  <h3>CryptoMind</h3>
                  <span className="project-status">Live • cryptomindeth.com</span>
                </div>
              </div>
              <p className="project-description">
                "The LLM that thinks like a crypto trader." AI-driven market intelligence 
                with chart scanning, buy/sell signals, and real-time alerts. Advanced 
                machine learning for crypto market analysis and trading insights.
              </p>
              <div className="project-impact">
                <div className="impact-metric">
                  <span className="metric">Market</span>
                  <span className="label">Intelligence</span>
                </div>
                <div className="impact-metric">
                  <span className="metric">Real-time</span>
                  <span className="label">Signals</span>
                </div>
                <div className="impact-metric">
                  <span className="metric">AI Trading</span>
                  <span className="label">Analysis</span>
                </div>
              </div>
              <div className="project-tech">
                <span>ML Trading</span>
                <span>Chart Analysis</span>
                <span>WebSockets</span>
                <span>Python</span>
              </div>
              <a href="https://cryptomindeth.com" target="_blank" rel="noopener noreferrer" className="project-link">
                Visit Platform →
              </a>
            </div>

            <div className="project-card glass-card-strong">
              <div className="project-header">
                <div className="project-icon">🔒</div>
                <div className="project-meta">
                  <h3>The Firm AI</h3>
                  <span className="project-status">Live • thefirmprotocols.com</span>
                </div>
              </div>
              <p className="project-description">
                "The protocol behind the protocols." A private, protocol-based AI core 
                powering encrypted, exclusive, and high-level operations. The invisible 
                infrastructure layer behind many public AI tools.
              </p>
              <div className="project-impact">
                <div className="impact-metric">
                  <span className="metric">Protocol</span>
                  <span className="label">Infrastructure</span>
                </div>
                <div className="impact-metric">
                  <span className="metric">Encrypted</span>
                  <span className="label">Operations</span>
                </div>
                <div className="impact-metric">
                  <span className="metric">Enterprise</span>
                  <span className="label">Core</span>
                </div>
              </div>
              <div className="project-tech">
                <span>Protocol Design</span>
                <span>Encryption</span>
                <span>Microservices</span>
                <span>Private AI</span>
              </div>
              <a href="https://www.thefirmprotocols.com" target="_blank" rel="noopener noreferrer" className="project-link">
                Visit Platform →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="cv-section cv-contact">
        <div className="cv-content">
          <div className="contact-container">
            <div className="contact-visual">
              <div className="contact-hologram">
                <div className="hologram-ring"></div>
                <div className="hologram-ring"></div>
                <div className="hologram-ring"></div>
                <div className="hologram-core">
                  <span>🚀</span>
                </div>
              </div>
            </div>
            
            <div className="contact-content">
              <h2 className="contact-title">
                Ready to Build
                <span className="contact-highlight"> Something Extraordinary?</span>
              </h2>
              
              <p className="contact-description">
                Whether you're launching the next unicorn startup, scaling a Fortune 500 digital presence, 
                or pioneering breakthrough AI solutions, let's connect and explore how we can create 
                unprecedented value together.
              </p>

              <div className="contact-methods">
                <a href="tel:+971505745795" className="contact-method glass-card">
                  <div className="contact-icon">📱</div>
                  <div className="contact-details">
                    <span className="contact-label">Dubai Direct</span>
                    <span className="contact-value">+971 50 574 5795</span>
                  </div>
                </a>
                
                <a href="mailto:amer.sarhan@gmail.com" className="contact-method glass-card">
                  <div className="contact-icon">📧</div>
                  <div className="contact-details">
                    <span className="contact-label">Professional Email</span>
                    <span className="contact-value">amer.sarhan@gmail.com</span>
                  </div>
                </a>
              </div>

              <div className="contact-cta">
                <a 
                  href="mailto:amer.sarhan@gmail.com?subject=Partnership Opportunity&body=Hi Amer,%0D%0A%0D%0AI'd love to discuss..."
                  className="cta-button-cv"
                >
                  <span>Let's Collaborate</span>
                  <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                
                <div className="contact-social">
                  <a 
                    href="https://www.linkedin.com/in/amersarhan/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    LinkedIn
                  </a>
                  <span className="social-divider">•</span>
                  <span className="location">Based in Dubai, UAE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CVPage; 