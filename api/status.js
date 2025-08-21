// API status endpoint to check if OpenAI key is configured

module.exports = (req, res) => {
  // Add SEO-friendly headers
  res.setHeader('Cache-Control', 'public, max-age=300'); // 5 minutes cache
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // CORS headers - restrict to your domain for security
  const allowedOrigins = [
    'https://chatwithamer.com',
    'https://www.chatwithamer.com',
    'http://localhost:3000', // For development
    'http://127.0.0.1:3000'  // For development
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    res.status(405).json({ 
      error: 'Method not allowed', 
      message: 'This endpoint only accepts GET requests',
      documentation: 'https://chatwithamer.com'
    });
    return;
  }

  const hasApiKey = !!process.env.OPENAI_API_KEY;
  
  res.status(200).json({ 
    hasApiKey, 
    message: hasApiKey 
      ? "OpenAI API connected successfully" 
      : "OpenAI API key not configured - Using fallback responses" 
  });
} 