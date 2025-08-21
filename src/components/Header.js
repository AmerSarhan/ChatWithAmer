import React from 'react';

const Header = ({ onBackToLanding }) => {
  return (
    <header className="app-header">
      <div className="flex items-center justify-between">
        {/* Back button and avatar/title */}
        <div className="flex items-center space-x-3">
          {onBackToLanding && (
            <button 
              onClick={onBackToLanding}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors touch-feedback"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className="avatar">A</div>
          <div>
            <h1 className="text-lg font-semibold text-white">
              Amer Sarhan
            </h1>
            <p className="text-sm text-white/60">
              AI Assistant
            </p>
          </div>
        </div>
        
        {/* Status indicator */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-white/60 font-medium">Online</span>
        </div>
      </div>
    </header>
  );
};

export default Header;