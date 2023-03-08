export const environment = {
  production: false,
  clientId: 'api://6aa09d57-1557-4afe-8f3b-9b75e27489ea',
  authority: 'https://login.microsoftonline.com/{70b87ecb-180d-460e-8397-552f53f5509a}/',
   protectedResourceMap:
    [
      {
        url: 'https://graph.microsoft.com/v1.0/me',
        scopes: ['User.Read']
      },
      {
        url: 'https://outofoffice-backend.azurewebsites.net', 
        scopes: ['api://6aa09d57-1557-4afe-8f3b-9b75e27489ea/OOO-Dashboard-ReadCalendar-scope'], 
      }
    ]
  ,
  msal: {
    clientId: 'api://6aa09d57-1557-4afe-8f3b-9b75e27489ea',
    authority: 'https://login.microsoftonline.com/{70b87ecb-180d-460e-8397-552f53f5509a}/',
    redirectPath: 'auth-response',
  },
};
