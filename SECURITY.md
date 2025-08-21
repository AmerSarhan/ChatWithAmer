# Security Guide for Amer AI Chat Project

## ⚠️ CRITICAL: Never Commit Sensitive Files

This project contains sensitive API keys and credentials that must NEVER be committed to Git.

## Files That Should NEVER Be Committed:

- `client_secret_*.json` - Google OAuth client secrets
- `*-project-*.json` - Google service account keys
- `*.pem`, `*.key`, `*.crt` - SSL certificates and private keys
- `.env` - Environment variables with actual API keys
- `test_*.js` - Test files that may contain sensitive data
- `debug_*.js` - Debug files with potential sensitive information
- `setup_*.js` - Setup files with credentials

## Required Environment Variables:

Create a `.env` file in the project root with:

```bash
# Calendly API
CALENDLY_TOKEN=your_actual_calendly_token

# Google Calendar API
GOOGLE_CLIENT_ID=your_actual_client_id
GOOGLE_CLIENT_SECRET=your_actual_client_secret
GOOGLE_REDIRECT_URI=your_actual_redirect_uri

# EmailJS (if using)
EMAILJS_PUBLIC_KEY=your_actual_public_key
EMAILJS_PRIVATE_KEY=your_actual_private_key

# Server Configuration
PORT=3001
NODE_ENV=development
```

## Before Pushing to GitHub:

1. **Verify .gitignore is updated** - Check that all sensitive files are excluded
2. **Check git status** - Ensure no sensitive files are staged
3. **Review staged changes** - Double-check what will be committed
4. **Test locally** - Ensure the app works with environment variables

## Commands to Check Before Pushing:

```bash
# Check what files are staged
git status

# Check what will be committed
git diff --cached

# Remove any accidentally staged sensitive files
git reset HEAD client_secret_*.json
git reset HEAD *-project-*.json
git reset HEAD .env
```

## If You Accidentally Commit Sensitive Data:

1. **Immediately revoke the exposed credentials**
2. **Generate new API keys**
3. **Update your .env file**
4. **Force push to remove the sensitive data from history** (if it was the last commit)
5. **Contact your team about the security breach**

## Security Best Practices:

- Use environment variables for all sensitive configuration
- Never hardcode API keys in source code
- Regularly rotate API keys and credentials
- Use different credentials for development and production
- Consider using a secrets management service for production

## Need Help?

If you're unsure about any file's sensitivity, ask before committing!
