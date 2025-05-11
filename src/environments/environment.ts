// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVersion: '1.0.0',
  USERDATA_KEY: 'authf649fc9a5f55',
  isMockEnabled: true,
  // apiUrl: 'http://localhost:8080/api/',
  apiUrl: 'http://localhost:8081/api/',
  appThemeName: 'Cocotier',
  cocotierVersion: localStorage.getItem('version')
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
