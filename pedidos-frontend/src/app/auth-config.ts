import { Configuration, LogLevel, BrowserCacheLocation } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: '7d84b76c-84a0-4c60-9eed-1d7e9ac5eb7a',
    authority: 'https://login.microsoftonline.com/725ff774-cc8e-43c4-85e6-7c46c40c43d8',
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (!containsPii) console.log(message);
      },
      logLevel: LogLevel.Info,
      piiLoggingEnabled: false
    }
  }
};

export const protectedResources = {
  apiGateway: {
    endpoint: 'https://*.execute-api.us-east-1.amazonaws.com/*',
    scopes: ['api://7d84b76c-84a0-4c60-9eed-1d7e9ac5eb7a/access_as_user']
  }
};