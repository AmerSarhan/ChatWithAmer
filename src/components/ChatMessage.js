import React from 'react';

const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`flex mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start space-x-3 max-w-[85%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar - only for assistant */}
        {!isUser && (
          <div className="avatar">A</div>
        )}
        
        {/* Message content */}
        <div className="flex flex-col">
          <div className={`message-bubble ${isUser ? 'message-user' : 'message-assistant'}`}>
            <p className="text-sm leading-relaxed">
              {message.text}
            </p>
          </div>
          
          {/* Timestamp */}
          <div className={`text-xs text-white/40 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
            {timestamp}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage; 