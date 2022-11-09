// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  AUTHENTICATION_URL: 'http://localhost:5000/estocks/auth/api/authenticate',
  REGISTER_COMPANY_URL: 'http://localhost:5000/estocks/command/api/company/register',
  FETCH_ALL_COMPANIES_URL: 'http://localhost:5000/estocks/query/api/retrieve/all',
  FETCH_ALL_STOCKS_URL: 'http://localhost:5000/estocks/query/api/retrieve',
  ADD_STOCK_PRICE_URL: 'http://localhost:5000/estocks/command/api/stock/add',
  DELETE_COMPANY_URL: 'http://localhost:5000/estocks/command/api/company/delete'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
