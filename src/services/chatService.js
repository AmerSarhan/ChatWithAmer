// Chat service for handling secure API communication

// Enhanced fallback responses with more context about Amer
const contextualResponses = [
  "Hi! I'm Amer Sarhan, a Senior Account Manager at TechVantage in Dubai. I specialize in performance marketing and have over 10 years of experience working with major brands like Careem, Pizza Hut, and Namshi. What would you like to know about my background?",
  "I've worked extensively with DSP platforms like StackAdapt, Eskimi, and Mediasmart, managing campaigns with budgets over $500K. I'm passionate about data-driven marketing strategies. Feel free to ask about my experience!",
  "My journey in digital marketing started in 2010, and I've been fortunate to work with premium publishers like TripAdvisor, Reuters, and Skyscanner. I hold a Bachelor's degree in IT from Arab Open University. What aspect of my career interests you?",
  "I'm currently based in Dubai and fluent in both English and Arabic. My expertise spans account management, performance marketing, and ad operations. I love discussing marketing trends and campaign optimization strategies!",
  "Throughout my career, I've focused on building strong client relationships and driving measurable results. From my early days at Crystel to my current role at TechVantage, I've always been passionate about delivering exceptional performance. What would you like to explore?"
];

const getContextualResponse = (userMessage) => {
  const message = userMessage.toLowerCase();
  
  if (message.includes('experience') || message.includes('background') || message.includes('career')) {
    return "I have over 10 years of experience in digital marketing and account management. I've worked at companies like TechVantage, RTB House, ArabyAds, and AdFalcon, managing major brands like Careem, Pizza Hut, Namshi, H&M, and Carrefour. I specialize in performance marketing and DSP platforms like StackAdapt, Eskimi, and Mediasmart.";
  }
  
  if (message.includes('education') || message.includes('study') || message.includes('school')) {
    return "I hold a Bachelor's degree in Information Technology from Arab Open University in Jordan. My technical background in IT has been incredibly valuable in understanding the digital marketing landscape and ad tech platforms.";
  }
  
  if (message.includes('dubai') || message.includes('location') || message.includes('where')) {
    return "I'm currently based in Dubai, UAE, where I work as a Senior Account Manager at TechVantage. I'm fluent in both English and Arabic, which has been helpful in working with diverse clients across the MENA region.";
  }
  
  if (message.includes('dsp') || message.includes('platform') || message.includes('tool')) {
    return "I'm experienced with various DSP platforms including StackAdapt, Eskimi, Mediasmart, and Affise. I've also worked with premium publishers like TripAdvisor, Reuters, and Skyscanner. My expertise includes campaign optimization, data analysis, and performance reporting.";
  }
  
  if (message.includes('brand') || message.includes('client') || message.includes('company')) {
    return "I've had the privilege of working with major brands including Careem, Pizza Hut, Namshi, H&M, Carrefour, and Flyin.com. My approach focuses on understanding each client's unique goals and developing data-driven strategies to achieve them.";
  }
  
  if (message.includes('skill') || message.includes('expertise') || message.includes('good at')) {
    return "My core skills include advanced performance marketing, account management, customer service, and ad operations management. I'm particularly strong in data analysis, campaign optimization, and building long-term client relationships. I've consistently exceeded performance targets throughout my career.";
  }
  
  if (message.includes('current') || message.includes('now') || message.includes('today')) {
    return "Currently, I'm a Senior Account Manager at TechVantage in Dubai, where I manage advertising campaigns on various DSP platforms, conduct data analysis, and lead performance marketing initiatives. I work with premium publishers and focus on expanding our partner network while consistently meeting client performance targets.";
  }
  
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! Great to meet you! I'm Amer Sarhan, a digital marketing professional based in Dubai. I've spent over a decade in performance marketing and account management, working with some amazing brands. What brings you here today? I'd love to share more about my journey or discuss anything related to digital marketing!";
  }
  
  // Return a random contextual response
  return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
};

export const getChatResponse = async (userMessage, conversationHistory = [], onEmailRequest = null) => {
  // Check if we're in development mode (localhost)
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (isDevelopment) {
    // In development, use enhanced contextual responses
    console.log('Development mode: Using enhanced contextual responses');
    return getContextualResponse(userMessage);
  }
  
  try {
    // In production, try to call the API route
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        history: conversationHistory.slice(-10)
      })
    });

    if (response.ok) {
      const data = await response.json();
      
      // Check if the AI wants to send an email
      if (data.action === 'send_email' && data.emailData && onEmailRequest) {
        // Only trigger email if we have all required fields
        if (data.emailData.name && data.emailData.email && data.emailData.message) {
          if (process.env.NODE_ENV === 'development') {
            console.log('Triggering email send with data:', data.emailData);
          }
          await onEmailRequest(data.emailData);
        }
      }
      
      return data.response;
    }

    throw new Error(`API error: ${response.status}`);

  } catch (error) {
    console.log('API not available, using enhanced fallback responses');
    return getContextualResponse(userMessage);
  }
};

// Function to check API status
export const getApiStatus = async () => {
  const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  
  if (isDevelopment) {
    return { 
      hasApiKey: false, 
      message: "Development mode - Enhanced contextual responses active" 
    };
  }
  
  try {
    const response = await fetch('/api/status');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return { 
      hasApiKey: false, 
      message: "API not available - Using contextual responses" 
    };
  } catch (error) {
    return { 
      hasApiKey: false, 
      message: "API not available - Using contextual responses" 
    };
  }
}; 