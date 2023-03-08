export const environment = {
  production: true,
  clientId: 'api://6aa09d57-1557-4afe-8f3b-9b75e27489ea',//Enter Client id here
  authority: 'https://login.microsoftonline.com/{70b87ecb-180d-460e-8397-552f53f5509a}/',
  redirectUri: '',
  //In production Mode fill the redirecturi with the Deployed url
  protectedResourceMap:
    [
      {
        url: 'https://graph.microsoft.com/v1.0/me',
        scopes: ['User.Read']
      },
      {
        url: 'https://outofoffice-backend.azurewebsites.net/',//Replace this url with the api endpoint
        scopes: ['api://6aa09d57-1557-4afe-8f3b-9b75e27489ea/OOO-Dashboard-ReadCalendar-scope'],//pass the scopes which the api is expecting here
      }
    ]
  ,
  msal: {
    clientId: 'api://6aa09d57-1557-4afe-8f3b-9b75e27489ea',//Client ID
    authority: 'https://login.microsoftonline.com/{70b87ecb-180d-460e-8397-552f53f5509a}/',
    redirectPath: 'auth-response',
  },
};
