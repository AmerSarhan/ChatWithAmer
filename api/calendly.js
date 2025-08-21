// Calendly API integration with environment variable
const CALENDLY_TOKEN = process.env.CALENDLY_TOKEN;
const CALENDLY_BASE_URL = 'https://api.calendly.com';

// Helper function to make authenticated requests
const makeCalendlyRequest = async (endpoint, method = 'GET', body = null) => {
  if (!CALENDLY_TOKEN) {
    throw new Error('Calendly token not configured. Please set CALENDLY_TOKEN environment variable.');
  }
  
  try {
    const response = await fetch(`${CALENDLY_BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${CALENDLY_TOKEN}`,
        'Content-Type': 'application/json'
      },
      ...(body && { body: JSON.stringify(body) })
    });

    if (!response.ok) {
      throw new Error(`Calendly API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Calendly request failed:', error);
    throw error;
  }
};

// Get current user info
const getCurrentUser = async () => {
  try {
    const user = await makeCalendlyRequest('/users/me');
    return {
      success: true,
      user: user.resource
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get user's event types
const getEventTypes = async () => {
  try {
    const user = await getCurrentUser();
    if (!user.success) {
      return user;
    }

    const eventTypes = await makeCalendlyRequest(`/event_types?user=${user.user.uri}&active=true`);
    return {
      success: true,
      eventTypes: eventTypes.collection || []
    };
  } catch (error) {
    console.error('Error getting event types:', error);
    return {
      success: false,
      error: error.message
    };
  }
};



// Create a single-use scheduling link (keeping for compatibility)
const createSchedulingLink = async (eventTypeUri, maxEventCount = 1) => {
  try {
    const schedulingLink = await makeCalendlyRequest('/scheduling_links', 'POST', {
      max_event_count: maxEventCount,
      owner: eventTypeUri,
      owner_type: 'EventType'
    });
    
    return {
      success: true,
      link: schedulingLink.resource
    };
  } catch (error) {
    console.error('Error creating scheduling link:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get available times for a specific event type
const getAvailableTimes = async (eventTypeUri, startTime, endTime) => {
  try {
    const availableTimes = await makeCalendlyRequest(
      `/event_type_available_times?event_type=${eventTypeUri}&start_time=${startTime}&end_time=${endTime}`
    );
    
    return {
      success: true,
      times: availableTimes.collection || []
    };
  } catch (error) {
    console.error('Error getting available times:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// API endpoint handler
module.exports = async (req, res) => {
  // Set CORS headers
  const allowedOrigins = [
    'https://chatwithamer.com',
    'https://www.chatwithamer.com',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
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
    // Check if Calendly token is configured
    if (!CALENDLY_TOKEN) {
      return res.status(500).json({
        success: false,
        error: 'Calendly integration not configured. Please set CALENDLY_TOKEN environment variable.'
      });
    }
    
    if (req.method === 'POST') {
      const { action, ...data } = req.body;

      switch (action) {
        case 'get_current_user':
          const user = await getCurrentUser();
          return res.status(200).json(user);

        case 'get_event_types':
          const eventTypes = await getEventTypes();
          return res.status(200).json(eventTypes);

        case 'get_available_times':
          const { eventTypeUri: availableEventTypeUri, startTime, endTime } = data;
          const times = await getAvailableTimes(availableEventTypeUri, startTime, endTime);
          return res.status(200).json(times);

        case 'create_scheduling_link':
          const { eventTypeUri: createEventTypeUri, maxEventCount } = data;
          const link = await createSchedulingLink(createEventTypeUri, maxEventCount);
          return res.status(200).json(link);
          


        default:
          return res.status(400).json({ 
            success: false, 
            error: 'Invalid action' 
          });
      }
    }

    if (req.method === 'GET') {
      // Return Calendly status and available event types
      const eventTypes = await getEventTypes();
      return res.status(200).json({
        status: 'Calendly integration active',
        hasEventTypes: eventTypes.success && eventTypes.eventTypes && eventTypes.eventTypes.length > 0,
        eventTypes: eventTypes.success ? eventTypes.eventTypes : []
      });
    }

    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });

  } catch (error) {
    console.error('Calendly API error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
};
