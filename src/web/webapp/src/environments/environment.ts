// export const environment = {
//   production: false,
//   apiURL : 'http://localhost:8089/api',
//   redirectUrl : 'http://localhost:4200',
//   authServerUrl : 'http://localhost:9191'
// };

export const environment = {
  production: true,
  permissionSysURL : 'http://localhost:8089/api',
  modulesSysURL : 'http://localhost:8080/api',
  redirectUrl : 'http://localhost:4200/index.html',
  authServerUrl : 'http://localhost:9191',
  revokeEndpoint : 'http://localhost:9191/oauth/revoke',
  ssoClientId : 'permission'
};
