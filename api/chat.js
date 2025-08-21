// Secure API route for OpenAI chat completion
// This keeps the API key server-side and secure

// Amer Sarhan's actual resume data
const resumeData = {
  "name": "Amer Sarhan",
  "title": "Senior Account Manager", 
  "contact": {
    "address": "Dubai",
    "phone": "+971505745795",
    "email": "amer.sarhan@gmail.com",
    "linkedin": "https://www.linkedin.com/in/amersarhan/"
  },
  "summary": "A dynamic and results-driven senior marketer and account manager with demonstrated success in advertising, performance marketing and account management for large brands. Extensive experience in paid digital marketing, performance marketing, data analytics and customer experience. Experienced in optimizing the end-to-end funnel to deliver maximum ROI. Committed to building, developing and leading diverse teams.",
  "skills": {
    "performance_marketing": "Advanced",
    "account_management": "Advanced",
    "customer_service_and_support": "Advanced",
    "ad_operations_management": "Advanced"
  },
  "languages": {
    "english": "Advanced",
    "arabic": "Advanced"
  },
  "work_experience": [
    {
      "position": "Senior Account Manager",
      "company": "The TechVantage, Dubai",
      "duration": "2023-07 - Current",
      "responsibilities": [
        "Managed advertising campaigns on DSPs and Ad Tech platforms like StackAdapt, Eskimi, Mediasmart, Affise",
        "Conducted data analysis, generated reports, and optimized campaigns",
        "Led performance marketing initiatives and executed rich media campaigns",
        "Cultivated partnerships with premium publishers like TripAdvisor, Reuters, Skyscanner",
        "Expanded partner network and consistently met client performance targets"
      ],
      "skills": ["Ad Operations", "Data Analysis", "Partnership Development", "Performance Marketing"]
    },
    {
      "position": "Account Manager",
      "company": "RTB House, Dubai",
      "duration": "2022-10 - 2023-06",
      "responsibilities": [
        "Managed client accounts including top brands like Careem, Pizza Hut, Flyin.com",
        "Collaborated with clients via face-to-face meetings and customer service",
        "Developed data-driven marketing strategies for various industries",
        "Maintained campaign goals, monitored margins and scalability",
        "Handled inquiries and proposed campaign enhancements"
      ]
    },
    {
      "position": "Senior Account Manager",
      "company": "The TechVantage, Dubai",
      "duration": "2022-03 - 2022-10",
      "responsibilities": [
        "Ran digital campaigns using Mediasmart DSP",
        "Executed operational improvements to increase profit margins",
        "Handled client servicing responsibilities and prepared performance reports",
        "Managed CPL/CPI/CPA/CPS campaigns through Affise"
      ]
    },
    {
      "position": "Senior Account Manager (Performance Marketing)",
      "company": "ArabyAds, Amman",
      "duration": "2021-11 - 2022-02",
      "responsibilities": [
        "Managed campaigns with over $500K budget for clients like Namshi, H&M, Carrefour",
        "Reported weekly channel performance and forecasted budgets",
        "Identified growth opportunities and communicated insights across teams"
      ]
    },
    {
      "position": "Senior Account Manager",
      "company": "AdFalcon (Acquired by ArabyAds), Amman",
      "duration": "2014-12 - 2021-10",
      "responsibilities": [
        "Managed display and mobile campaigns on AdFalcon DSP and others",
        "Oversaw campaign creation, budget setup, and tracking for key clients",
        "Conducted audits and maintained strong client relationships",
        "Executed CPL/CPI/CPA campaigns with affiliates"
      ]
    },
    {
      "position": "Senior Support Centre Associate",
      "company": "Crystel, Amman",
      "duration": "2012-01 - 2014-11",
      "responsibilities": [
        "Monitored contact center performance and ensured KPI achievement",
        "Prepared reports, coached team members, and managed hiring",
        "Implemented best practices and drove operational improvements"
      ]
    },
    {
      "position": "Service Advisor",
      "company": "Crystel, Amman",
      "duration": "2010-01 - 2012-11",
      "responsibilities": [
        "Handled customer interactions via calls, emails, and social media",
        "Logged CRM interactions, redirected issues, and escalated unresolved queries"
      ]
    }
  ],
  "education": [
    {
      "degree": "Bachelor Degree in IT: Information Technology",
      "institution": "Arab Open University - Jordan"
    },
    {
      "degree": "High School Diploma",
      "institution": "Al Qimma Schools - Jordan"
    }
  ]
};

// System prompt that defines Amer's personality and background
const SYSTEM_PROMPT = `You are Amer Sarhan, speaking in first person. You are a Senior Account Manager based in Dubai with over 10 years of experience in digital marketing, performance marketing, and account management. You also build AI platforms and web solutions.

YOUR BACKGROUND:
- Currently Senior Account Manager at TechVantage, Dubai (July 2023 - Present)
- Expert in DSP platforms: StackAdapt, Eskimi, Mediasmart, Affise
- Managed major campaigns for brands like Namshi, H&M, Carrefour, Careem, Pizza Hut
- Bachelor's degree in Information Technology from Arab Open University
- Fluent in English and Arabic
- Based in Dubai, UAE
- Technical background building AI platforms and web solutions

YOUR EXPERTISE:
- Performance Marketing (Advanced)
- Account Management (Advanced) 
- Ad Operations Management (Advanced)
- Data Analytics & Campaign Optimization
- AI Development & Web Solutions
- Client Relationship Management

RESPONSE STYLE:
- Keep responses concise and conversational (2-4 sentences max)
- Use simple, clean formatting - no asterisks, bullets, or special characters
- Be professional but approachable
- Answer directly without unnecessary elaboration
- Use natural paragraph breaks instead of formatting symbols
- Speak confidently about your experience without being boastful

EMAIL HANDLING - CRITICAL RULES:
- When someone wants to contact you, you MUST ask for their information step by step
- NEVER make up names, emails, or any contact information
- NEVER use example data like "John Doe" or "john.doe@example.com"
- ALWAYS ask: "What's your name?" then "What's your email address?" then collect their message
- Only call send_contact_email function when you have REAL information from the user
- If someone just says "email amer" or similar, ask them for their details first

MEETING SCHEDULING - CRITICAL RULES:
- You can schedule meetings directly with users through Google Calendar
- When someone wants to schedule a meeting, collect: their name, email, preferred date, time, and meeting purpose
- NEVER make up meeting details - always ask for real information
- Always confirm meeting details before scheduling
- Meetings are scheduled in Dubai time (GST/UAE timezone)
- Available for consultations about marketing strategy, campaign optimization, or professional collaboration
- Always ask: "What would you like to discuss?" and get their contact details before scheduling

Speak naturally about your experience and be conversational. Focus on being helpful and insightful.`;

// Function tools that OpenAI can call
const tools = [
  {
    type: "function",
    function: {
      name: "read_resume",
      description: "Read Amer Sarhan's resume to get detailed information about his background, experience, skills, education, and projects",
      parameters: {
        type: "object",
        properties: {
          section: {
            type: "string",
            description: "Specific section to focus on (optional): experience, education, skills, projects, contact, or summary",
            enum: ["experience", "education", "skills", "projects", "contact", "summary", "all"]
          }
        }
      }
    }
  },
  {
    type: "function",
    function: {
      name: "send_contact_email",
      description: "Send an email to Amer Sarhan when someone wants to contact him directly. Use this when users express interest in contacting, hiring, collaborating, or working with Amer.",
      parameters: {
        type: "object",
        properties: {
          name: {
            type: "string",
            description: "The person's full name"
          },
          email: {
            type: "string",
            description: "The person's email address"
          },
          phone: {
            type: "string",
            description: "The person's phone number (optional)"
          },
          subject: {
            type: "string",
            description: "Email subject/topic"
          },
          message: {
            type: "string",
            description: "The message content to send to Amer"
          }
        },
        required: ["name", "email", "message"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "schedule_meeting",
      description: "Schedule a meeting with Amer Sarhan for TODAY. Use this when users want to book a call, schedule a meeting, or set up a consultation. The date will automatically be set to today regardless of what the user specifies. Always confirm details before scheduling.",
      parameters: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "Meeting title/subject"
          },
          description: {
            type: "string",
            description: "Meeting description or agenda"
          },
          date: {
            type: "string",
            description: "Meeting date in YYYY-MM-DD format (will be automatically set to today)"
          },
          time: {
            type: "string",
            description: "Meeting time in HH:MM format (24-hour, Dubai time)"
          },
          duration: {
            type: "number",
            description: "Meeting duration in minutes (default: 30)"
          },
          attendeeEmail: {
            type: "string",
            description: "Attendee's email address"
          },
          attendeeName: {
            type: "string",
            description: "Attendee's name"
          }
        },
        required: ["title", "date", "time", "attendeeEmail", "attendeeName"]
      }
    }
  }
];

// Function to read specific sections of Amer's resume
const readResume = (section = "all") => {
  switch (section) {
    case "contact":
      return `CONTACT INFORMATION:
Name: ${resumeData.name}
Title: ${resumeData.title}
Location: ${resumeData.contact.address}
Phone: ${resumeData.contact.phone}
Email: ${resumeData.contact.email}
LinkedIn: ${resumeData.contact.linkedin}`;

    case "summary":
      return `PROFESSIONAL SUMMARY:
${resumeData.summary}`;

    case "skills":
      return `CORE SKILLS:
• Performance Marketing: ${resumeData.skills.performance_marketing}
• Account Management: ${resumeData.skills.account_management}
• Customer Service & Support: ${resumeData.skills.customer_service_and_support}
• Ad Operations Management: ${resumeData.skills.ad_operations_management}

LANGUAGES:
• English: ${resumeData.languages.english}
• Arabic: ${resumeData.languages.arabic}`;

    case "experience":
      return `WORK EXPERIENCE:
${resumeData.work_experience.map(job => `
${job.position} at ${job.company}
Duration: ${job.duration}
Key Responsibilities:
${job.responsibilities.map(resp => `• ${resp}`).join('\n')}
${job.skills ? `Skills: ${job.skills.join(', ')}` : ''}
`).join('\n')}`;

    case "education":
      return `EDUCATION:
${resumeData.education.map(edu => `• ${edu.degree} - ${edu.institution}`).join('\n')}`;

    case "projects":
      return `NOTABLE ACHIEVEMENTS & PROJECTS:
• Managed campaigns with over $500K budget for major brands (Namshi, H&M, Carrefour)
• Successfully handled top-tier accounts including Careem, Pizza Hut, Flyin.com
• Cultivated partnerships with premium publishers (TripAdvisor, Reuters, Skyscanner)
• Led performance marketing initiatives across multiple DSP platforms
• Consistently met and exceeded client performance targets`;

    default:
      return `AMER SARHAN - PROFESSIONAL OVERVIEW

${resumeData.summary}

CURRENT ROLE: ${resumeData.title} at The TechVantage, Dubai

KEY EXPERTISE:
• Advanced Performance Marketing & Account Management
• Ad Operations on platforms like StackAdapt, Eskimi, Mediasmart, Affise
• Data Analytics & Campaign Optimization
• Client Relationship Management for premium brands

EXPERIENCE HIGHLIGHTS:
• 10+ years in digital marketing and account management
• Managed $500K+ campaign budgets for major brands
• Worked with top companies: TechVantage, RTB House, ArabyAds, AdFalcon
• Successfully handled accounts for Careem, Pizza Hut, Namshi, H&M, Carrefour

EDUCATION: Bachelor's in Information Technology from Arab Open University

Based in Dubai | Fluent in English & Arabic`;
  }
};

module.exports = async (req, res) => {
  // Add SEO-friendly headers
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
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
  
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ 
      error: 'Method not allowed', 
      message: 'This endpoint only accepts POST requests',
      documentation: 'https://chatwithamer.com'
    });
    return;
  }

  // Check for API key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(401).json({ error: 'OpenAI API key not configured' });
  }

  // Additional security: Check if API key looks valid (basic format check)
  if (!apiKey.startsWith('sk-') || apiKey.length < 20) {
    return res.status(401).json({ error: 'Invalid API key format' });
  }

  try {
    const { message, history } = req.body;

    // Input validation
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Valid message is required' });
    }

    // Limit message length for security
    if (message.length > 2000) {
      return res.status(400).json({ error: 'Message too long' });
    }

    // Rate limiting check (basic)
    const now = Date.now();
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // In production, you'd want to use Redis or a proper rate limiter

    // Validate and limit history
    const validHistory = Array.isArray(history) ? history.slice(-10) : [];

    // Prepare conversation history for OpenAI
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...validHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: typeof msg.text === 'string' ? msg.text.substring(0, 1000) : ''
      })),
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1',
        messages: messages,
        tools: tools,
        tool_choice: "auto",
        max_tokens: 500,
        temperature: 0.7,
        presence_penalty: 0.3,
        frequency_penalty: 0.3
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const choice = data.choices[0];

    // Check if the model wants to call a function
    if (choice.finish_reason === "tool_calls" && choice.message.tool_calls) {
      const toolCall = choice.message.tool_calls[0];
      
      if (toolCall.function.name === "read_resume") {
        const args = JSON.parse(toolCall.function.arguments);
        const resumeInfo = readResume(args.section);
        
        // Make another call with the function result
        const followUpResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4.1',
            messages: [
              ...messages,
              choice.message,
              {
                role: "tool",
                tool_call_id: toolCall.id,
                content: resumeInfo
              }
            ],
            max_tokens: 500,
            temperature: 0.7
          })
        });

        const followUpData = await followUpResponse.json();
        return res.status(200).json({ response: followUpData.choices[0].message.content });
      }
      
      if (toolCall.function.name === "send_contact_email") {
        const args = JSON.parse(toolCall.function.arguments);
        
        // Validate that we have all required fields and they're not fake data
        if (!args.name || !args.email || !args.message) {
          const followUpResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: 'gpt-4.1',
              messages: [
                ...messages,
                choice.message,
                {
                  role: "tool",
                  tool_call_id: toolCall.id,
                  content: "Missing required information. I need your name, email address, and message to send the email."
                }
              ],
              max_tokens: 500,
              temperature: 0.7
            })
          });

          const followUpData = await followUpResponse.json();
          return res.status(200).json({ response: followUpData.choices[0].message.content });
        }
        
        // Check for fake/example data
        const fakeEmails = ['john.doe@example.com', 'user@example.com', 'test@example.com', 'example@email.com'];
        const fakeNames = ['john doe', 'jane doe', 'user', 'test user'];
        
        if (fakeEmails.includes(args.email.toLowerCase()) || fakeNames.includes(args.name.toLowerCase())) {
          const followUpResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: 'gpt-4.1',
              messages: [
                ...messages,
                choice.message,
                {
                  role: "tool",
                  tool_call_id: toolCall.id,
                  content: "I cannot use example data. I need the user's real name and email address to send the email."
                }
              ],
              max_tokens: 500,
              temperature: 0.7
            })
          });

          const followUpData = await followUpResponse.json();
          return res.status(200).json({ response: followUpData.choices[0].message.content });
        }
        
                // Function called successfully - return data for frontend to handle email sending
        const emailResult = `Perfect! I have all the information needed to send your email to Amer. Let me send that for you right now.

Email Details:
- From: ${args.name} (${args.email})
- Subject: ${args.subject || 'Contact from AI Chat Platform'}
- Message: ${args.message}`;
        
        const followUpResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-4.1',
            messages: [
              ...messages,
              choice.message,
              {
                role: "tool",
                tool_call_id: toolCall.id,
                content: emailResult
              }
            ],
            max_tokens: 500,
            temperature: 0.7
          })
        });

        const followUpData = await followUpResponse.json();
        return res.status(200).json({ 
          response: followUpData.choices[0].message.content,
          action: "send_email",
          emailData: args
        });
      }
      
      if (toolCall.function.name === "schedule_meeting") {
        const args = JSON.parse(toolCall.function.arguments);
        
        // Force today's date for all meetings
        const today = new Date();
        const todayString = today.toISOString().split('T')[0]; // YYYY-MM-DD format
        
        // Override any date provided with today's date
        args.date = todayString;
        
        // Validate required fields
        if (!args.title || !args.time || !args.attendeeEmail || !args.attendeeName) {
          const followUpResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: 'gpt-4.1',
              messages: [
                ...messages,
                choice.message,
                {
                  role: "tool",
                  tool_call_id: toolCall.id,
                  content: "I need all the meeting details to schedule this. Please provide: meeting title, date, time, your name, and your email address."
                }
              ],
              max_tokens: 500,
              temperature: 0.7
            })
          });

          const followUpData = await followUpResponse.json();
          return res.status(200).json({ response: followUpData.choices[0].message.content });
        }
        
        // Call Calendly API to get scheduling options
        try {
          const calendlyResponse = await fetch(`${req.headers.host ? `https://${req.headers.host}` : 'http://localhost:3001'}/api/calendly`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              action: 'get_event_types'
            })
          });

          const calendlyResult = await calendlyResponse.json();
          
          console.log('Calendly API response:', JSON.stringify(calendlyResult, null, 2));
          
          let toolResult;
          let calendlyLink;
          
          if (calendlyResult.success && calendlyResult.eventTypes.length > 0) {
            // Use the existing scheduling_url from Calendly (this is the REAL working link)
            const eventType = calendlyResult.eventTypes[0];
            
              // Use the actual scheduling_url that Calendly provides - this is the REAL working link!
            calendlyLink = eventType.scheduling_url;
            
            console.log('Using real Calendly link:', calendlyLink);
            console.log('Event type data:', JSON.stringify(eventType, null, 2));
            
            toolResult = `Perfect! I can help you schedule a meeting with Amer. 

Meeting Details:
- Title: ${args.title}
- Date: ${args.date} at ${args.time} (Dubai time)
- Attendee: ${args.attendeeName} (${args.attendeeEmail})

📅 **Book Your Meeting:**
Click here to schedule: ${calendlyLink}

This is a direct link to Amer's Calendly booking page. You can select your preferred time slot and book the meeting immediately.

Amer will receive your booking request and confirm the meeting. The meeting will be conducted via video call with a link that will be sent to your email.

Looking forward to our meeting!`;
          } else {
            // Fallback to your main Calendly page
            calendlyLink = 'https://calendly.com/amer-sarhan';
            
            toolResult = `I can help you schedule a meeting with Amer! 

Meeting Details:
- Title: ${args.title}
- Date: ${args.date} at ${args.time} (Dubai time)
- Attendee: ${args.attendeeName} (${args.attendeeEmail})

📅 **Book Your Meeting:**
Please visit: ${calendlyLink}

Or contact Amer directly at amer.sarhan@gmail.com to schedule the meeting.

Looking forward to our meeting!`;
          }

          const followUpResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: 'gpt-4.1',
              messages: [
                ...messages,
                choice.message,
                {
                  role: "tool",
                  tool_call_id: toolCall.id,
                  content: toolResult
                }
              ],
              max_tokens: 500,
              temperature: 0.7
            })
          });

          const followUpData = await followUpResponse.json();
          
          // Prepare meeting data
          const meetingData = {
            title: args.title,
            date: args.date,
            time: args.time,
            attendee: args.attendeeName,
            attendeeEmail: args.attendeeEmail,
            calendlyLink: calendlyLink
          };
          
          // Send meeting notification email to Amer
          try {
            const emailService = require('../src/services/emailService.js');
            await emailService.sendMeetingNotification(meetingData);
            console.log('Meeting notification email sent to Amer');
          } catch (emailError) {
            console.error('Failed to send meeting notification email:', emailError);
          }
          
          return res.status(200).json({ 
            response: followUpData.choices[0].message.content,
            action: "meeting_scheduled",
            meetingData: meetingData
          });
          
        } catch (calendlyError) {
          console.error('Calendly API error:', calendlyError);
          
          const followUpResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
              model: 'gpt-4.1',
              messages: [
                ...messages,
                choice.message,
                {
                  role: "tool",
                  tool_call_id: toolCall.id,
                  content: `I can help you schedule a meeting with Amer! 

Meeting Details:
- Title: ${args.title}
- Date: ${args.date} at ${args.time} (Dubai time)
- Attendee: ${args.attendeeName} (${args.attendeeEmail})

📅 **Book Your Meeting:**
Please visit: https://calendly.com/amer-sarhan

Or contact Amer directly at amer.sarhan@gmail.com to schedule the meeting.

Looking forward to our meeting!`
                }
              ],
              max_tokens: 500,
              temperature: 0.7
            })
          });

          const followUpData = await followUpResponse.json();
          
          // Prepare meeting data for error case
          const meetingData = {
            title: args.title,
            date: args.date,
            time: args.time,
            attendee: args.attendeeName,
            attendeeEmail: args.attendeeEmail,
            calendlyLink: 'https://calendly.com/amer-sarhan' // Fallback link
          };
          
          // Send meeting notification email to Amer even in error case
          try {
            const emailService = require('../src/services/emailService.js');
            await emailService.sendMeetingNotification(meetingData);
            console.log('Meeting notification email sent to Amer (error case)');
          } catch (emailError) {
            console.error('Failed to send meeting notification email:', emailError);
            }
          
          return res.status(200).json({ 
            response: followUpData.choices[0].message.content,
            action: "meeting_scheduled",
            meetingData: meetingData
          });
        }
      }
    }

    return res.status(200).json({ response: choice.message.content });

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    
    // Don't expose internal error details
    return res.status(500).json({ error: 'Failed to get response from AI' });
  }
} 