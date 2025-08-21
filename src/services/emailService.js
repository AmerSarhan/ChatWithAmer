const emailjs = require('@emailjs/browser');

// EmailJS configuration - using environment variables
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID || process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY || process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

// Template ID
const CONTACT_TEMPLATE_ID = 'template_auto_reply';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Prevent duplicate sends with a simple cache
const recentSends = new Set();

const sendContactEmail = async (contactData) => {
  try {
    const { name, email, phone, subject, message } = contactData;
    
    // Validate required fields
    if (!name || !email || !message) {
      throw new Error('Name, email, and message are required');
    }

    // Create a unique key for this email to prevent duplicates
    const emailKey = `${email}-${name}-${message.substring(0, 50)}`;
    if (recentSends.has(emailKey)) {
      return {
        success: true,
        message: "Email already sent! I'll get back to you within 24-48 hours."
      };
    }
    
    // Add to recent sends and remove after 30 seconds
    recentSends.add(emailKey);
    setTimeout(() => recentSends.delete(emailKey), 30000);

    // Prepare email data
    const emailData = {
      to_email: 'amer.sarhan@gmail.com', // Your email address
      to_name: 'Amer Sarhan',           // Your name
      from_name: name,
      from_email: email,
      phone_number: phone || 'Not provided',
      subject: subject || 'Contact from AI Chat Platform',
      message: message,
      sent_at: new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Dubai',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      })
    };

    // Send email to Amer
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      CONTACT_TEMPLATE_ID,
      emailData,
      EMAILJS_PUBLIC_KEY
    );

    // Don't log sensitive response data in production
    if (process.env.NODE_ENV === 'development') {
      console.log('Contact email sent successfully:', response);
    }

    // Auto-reply disabled to prevent duplicate emails
    // Only sending one email to Amer with the contact information

    return {
      success: true,
      message: "Email sent successfully! I'll get back to you within 24-48 hours."
    };

  } catch (error) {
    console.error('Email sending failed:', error);
    
    return {
      success: false,
      message: "Sorry, there was an issue sending your email. Please try again or contact me directly at amer.sarhan@gmail.com"
    };
  }
};

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Format phone number (optional)
const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  
  // Remove all non-digits
  const digits = phone.replace(/\D/g, '');
  
  // Format for display
  if (digits.length >= 10) {
    return `+${digits}`;
  }
  
  return phone;
};

// Send meeting notification to Amer
const sendMeetingNotification = async (meetingData) => {
  try {
    const { title, date, time, attendee, attendeeEmail, calendlyLink } = meetingData;
    
    // Validate required fields
    if (!title || !date || !time || !attendee || !attendeeEmail) {
      throw new Error('Meeting details are incomplete');
    }

    // Prepare meeting notification email data
    const emailData = {
      to_email: 'amer.sarhan@gmail.com', // Amer's email
      to_name: 'Amer Sarhan',           // Amer's name
      from_name: 'AI Assistant',
      from_email: 'noreply@chatwithamer.com',
      subject: `New Meeting Request: ${title}`,
      message: `Hi Amer,

You have a new meeting request:

📅 Meeting Details:
- Title: ${title}
- Date: ${date}
- Time: ${time} (Dubai time)
- Attendee: ${attendee} (${attendeeEmail})

🔗 Calendly Link: ${calendlyLink || 'Not provided'}

This meeting was requested through your AI chat platform. Please review and confirm the booking.

Best regards,
Your AI Assistant`,
      sent_at: new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Dubai',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      })
    };

    // Send email to Amer
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      CONTACT_TEMPLATE_ID, // Using the same template
      emailData,
      EMAILJS_PUBLIC_KEY
    );

    if (process.env.NODE_ENV === 'development') {
      console.log('Meeting notification sent successfully:', response);
    }

    return {
      success: true,
      message: "Meeting notification sent to Amer"
    };

  } catch (error) {
    console.error('Meeting notification failed:', error);
    
    return {
      success: false,
      message: "Failed to send meeting notification"
    };
  }
};

// CommonJS exports
module.exports = {
  sendContactEmail,
  isValidEmail,
  formatPhoneNumber,
  sendMeetingNotification
}; 