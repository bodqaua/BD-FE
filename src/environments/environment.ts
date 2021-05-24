// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// "login" => "App::Login",
//   "databases" => "App::FetchDatabases",
//   "database/:database" => "App::FetchDatabaseByName",
//   "database/:database/create/:table" => "App::CreateTable",
//   "database/:database/delete/:table" => "App::DeleteTable",
//   "database/create/:database" => "App::CreateDatabase",
//   "database/delete/:database" => "App::DropDatabase",
//   "database/:database/:column" => "App::getDataFromColumn",

export const environment = {
  production: false,
  API_URL: 'http://db-be/',
  AUTH_URL: 'login',
  AUTH_CREATE_USER: 'user',
  DATABASE_LOAD: 'databases',
  DATABASE_BASE: 'database/',
  DATABASE_CREATE: 'database/create/',
  DATABASE_DELETE: 'database/delete/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
