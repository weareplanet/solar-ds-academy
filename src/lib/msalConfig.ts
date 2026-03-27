import { Configuration, LogLevel } from '@azure/msal-browser';

/**
 * MSAL.js configuration for Entra ID authentication.
 *
 * Before deploying, register a Single-Page Application in Azure Entra ID:
 * 1. Go to Azure Portal → Entra ID → App registrations → New registration
 * 2. Name: "Solar DS Academy"
 * 3. Supported account types: "Accounts in this organizational directory only" (single tenant)
 * 4. Redirect URI (SPA): https://weareplanet.github.io/solar-ds-academy
 * 5. Copy the Application (client) ID and Tenant ID below
 */

// TODO: Replace with actual values from Entra ID app registration
const CLIENT_ID = process.env.NEXT_PUBLIC_MSAL_CLIENT_ID || 'YOUR_CLIENT_ID';
const TENANT_ID = process.env.NEXT_PUBLIC_MSAL_TENANT_ID || 'YOUR_TENANT_ID';
const REDIRECT_URI =
  process.env.NEXT_PUBLIC_MSAL_REDIRECT_URI ||
  'https://weareplanet.github.io/solar-ds-academy';

export const msalConfig: Configuration = {
  auth: {
    clientId: CLIENT_ID,
    authority: `https://login.microsoftonline.com/${TENANT_ID}`,
    redirectUri: REDIRECT_URI,
    postLogoutRedirectUri: REDIRECT_URI,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
          default:
            break;
        }
      },
      logLevel: LogLevel.Warning,
    },
  },
};

export const loginRequest = {
  scopes: ['openid', 'profile', 'email'],
};
