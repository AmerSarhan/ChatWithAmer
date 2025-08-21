const { google } = require('googleapis');
const { SpacesServiceClient } = require('@google-apps/meet').v2;

// Initialize Google Calendar API with service account
const initCalendar = () => {
  try {
    // Get service account credentials from environment or local file
    let credentials;
    
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      // Production: Use environment variable
      credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    } else {
      // Development: Use local file
      credentials = require('../new-project-154008-d330191c332e.json');
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events'
      ],
    });

    return google.calendar({ version: 'v3', auth });
  } catch (error) {
    console.error('Failed to initialize Google Calendar:', error);
    throw error;
  }
};

// Convert timezone-aware date to Google Calendar format
const formatDateTime = (dateTimeString, timeZone = 'Asia/Dubai') => {
  const date = new Date(dateTimeString);
  return {
    dateTime: date.toISOString(),
    timeZone: timeZone
  };
};

// Check if time slot is available
const checkAvailability = async (calendar, calendarId, startTime, endTime) => {
  try {
    const response = await calendar.freebusy.query({
      resource: {
        timeMin: startTime,
        timeMax: endTime,
        timeZone: 'Asia/Dubai',
        items: [{ id: calendarId }]
      }
    });

    const busy = response.data.calendars[calendarId]?.busy || [];
    return busy.length === 0; // Available if no busy periods
  } catch (error) {
    console.error('Error checking availability:', error);
    return false;
  }
};

// Create Google Meet space
const createMeetSpace = async () => {
  try {
    // Get service account credentials from environment or local file
    let credentials;
    
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    } else {
      credentials = require('../new-project-154008-d330191c332e.json');
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/meetings.space.created'],
    });

    const authClient = await auth.getClient();
    
    const meetClient = new SpacesServiceClient({
      authClient: authClient
    });

    // Create a new meeting space
    const [space] = await meetClient.createSpace({});
    
    return {
      success: true,
      meetingUri: space.meetingUri,
      name: space.name
    };
  } catch (error) {
    console.error('Error creating Meet space:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Create calendar event with Google Meet
const createCalendarEvent = async (eventDetails) => {
  try {
    const calendar = initCalendar();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'amer.sarhan@gmail.com';

    const { title, description, startTime, endTime, attendeeEmail, attendeeName } = eventDetails;

    // Check availability first
    const isAvailable = await checkAvailability(calendar, calendarId, startTime, endTime);
    
    if (!isAvailable) {
      return {
        success: false,
        error: 'Time slot is not available. Please choose a different time.'
      };
    }

    // Create Google Meet space
    const meetSpace = await createMeetSpace();
    let meetLink = 'meet.google.com/new'; // Fallback
    
    if (meetSpace.success) {
      meetLink = meetSpace.meetingUri || `meet.google.com/${meetSpace.name.split('/').pop()}`;
    }

    // Always include Amer as an attendee
    const attendees = [
      { email: 'amer.sarhan@gmail.com', displayName: 'Amer Sarhan' }
    ];
    
    // Add external attendee if provided
    if (attendeeEmail && attendeeEmail !== 'amer.sarhan@gmail.com') {
      attendees.push({ 
        email: attendeeEmail, 
        displayName: attendeeName || 'Meeting Attendee' 
      });
    }

    // Create event description with attendee info and meeting instructions
    const eventDescription = `${description}

📅 Meeting Details:
${attendeeEmail && attendeeEmail !== 'amer.sarhan@gmail.com' ? `- Attendee: ${attendeeName} (${attendeeEmail})` : ''}

📞 **Google Meet Link:**
${meetLink}

⏰ Meeting scheduled for ${new Date(startTime).toLocaleString('en-US', { 
  timeZone: 'Asia/Dubai',
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZoneName: 'short'
})}

📧 Contact: amer.sarhan@gmail.com`;

    // Create event without attendees (service account limitation) but with proper description
    const event = {
      summary: title,
      description: eventDescription,
      start: formatDateTime(startTime),
      end: formatDateTime(endTime),
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 30 }, // 30 minutes before
        ]
      }
    };

    const response = await calendar.events.insert({
      calendarId: calendarId,
      resource: event,
      sendUpdates: 'none' // Don't send emails (service account limitation)
    });

    return {
      success: true,
      event: response.data,
      meetLink: meetLink,
      eventLink: response.data.htmlLink,
      eventId: response.data.id,
      message: `Meeting scheduled successfully! Google Meet link: ${meetLink}`
    };

  } catch (error) {
    console.error('Error creating calendar event:', error);
    return {
      success: false,
      error: error.message || 'Failed to create calendar event'
    };
  }
};

// Get upcoming events
const getUpcomingEvents = async (maxResults = 10) => {
  try {
    const calendar = initCalendar();
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'amer.sarhan@gmail.com';

    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: new Date().toISOString(),
      maxResults: maxResults,
      singleEvents: true,
      orderBy: 'startTime'
    });

    return {
      success: true,
      events: response.data.items || []
    };
  } catch (error) {
    console.error('Error fetching events:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch calendar events'
    };
  }
};

// API endpoint handler
module.exports = async (req, res) => {
  // Set CORS headers - restrict to your domain for security
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
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'POST') {
      const { action, ...data } = req.body;

      switch (action) {
        case 'schedule_meeting':
          const result = await createCalendarEvent(data);
          return res.status(200).json(result);

        case 'check_availability':
          const calendar = initCalendar();
          const calendarId = process.env.GOOGLE_CALENDAR_ID || 'amer.sarhan@gmail.com';
          const available = await checkAvailability(
            calendar, 
            calendarId, 
            data.startTime, 
            data.endTime
          );
          return res.status(200).json({ success: true, available });

        case 'get_events':
          const events = await getUpcomingEvents(data.maxResults);
          return res.status(200).json(events);

        default:
          return res.status(400).json({ 
            success: false, 
            error: 'Invalid action' 
          });
      }
    }

    if (req.method === 'GET') {
      // Return calendar status
      const events = await getUpcomingEvents(5);
      return res.status(200).json({
        status: 'Google Calendar integration active',
        hasEvents: events.success && events.events.length > 0
      });
    }

    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });

  } catch (error) {
    console.error('Calendar API error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}; 