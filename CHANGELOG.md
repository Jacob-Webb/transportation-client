### 0.1.0 (2021-12-31)

##### Documentation Changes

*  create and fill out TODO.md (142abda3)

##### New Features

*  add sidebar navigation (81168486)

#### 0.0.1 (2021-12-28)

- Localized components and modules
- Removed envUrl service and finished documentation
- Added documentation for error components
- Added initial documentation to dashboard and manage-templates
- Added documentation to components under modules/account
- Remove documentation tracking
- Added documentation to login.component.ts
- Created objects to organize app constants. Update the files that used the constants.
- Updated Register to remove FormBuilder from the constructor and create the FormControls in OnInit
- Created account service to separate authentication from user account services
- Created Routing class to allow static routing methods to be shared
- Added comments to Account.ts, src/test.ts, and JwtToken.ts
- Account fields complete
- Password components route through password
- Removed children from password path and set password path to redirect to dashboard
- Changed reset-password-confirmation to update-confirmed
- Added child routes for password components