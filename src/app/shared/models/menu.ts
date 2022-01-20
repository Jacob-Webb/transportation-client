import { NavItem } from './nav-item';
import { Roles } from './roles';

/**
 * Data for the sidebar menu.
 */
export let menu: NavItem[] = [
  {
    displayName: 'Gatherings',
    iconName: 'location_on',
    route: 'gatherings',
    authorization: [Roles.user, Roles.driver, Roles.administrator, Roles.superAdmin],
    children: [
      {
        displayName: 'Weekly Gatherings',
        iconName: 'event',
        route: '',
        authorization: [Roles.administrator, Roles.superAdmin]
      },
      {
        displayName: 'Upcoming Routes',
        iconName: 'departure_board',
        route: '',
        authorization: [Roles.administrator, Roles.superAdmin]
      },
      {
        displayName: 'Manage Templates',
        iconName: 'insert_drive_file',
        route: '/manage-templates',
        authorization: [Roles.administrator, Roles.superAdmin]
      },
      {
        displayName: 'Request A Ride',
        iconName: 'add_circle',
        route: '',
        authorization: [Roles.user, Roles.driver, Roles.administrator, Roles.superAdmin]
      }
    ]
  },
  {
    displayName: 'Users',
    iconName: 'face',
    route: 'users',
    authorization: [Roles.administrator, Roles.superAdmin],
    children: [
      {
        displayName: 'Search Users',
        iconName: 'search',
        route: '',
        authorization: [Roles.administrator, Roles.superAdmin]
      },
      {
        displayName: 'Drivers',
        iconName: 'drive_eta',
        route: '',
        authorization: [Roles.administrator, Roles.superAdmin]
      }
    ]
  },
  {
    displayName: 'Permissions',
    iconName: 'security',
    route: 'permissions',
    authorization: [Roles.administrator, Roles.superAdmin],
    children: [
      {
        displayName: 'Update User Roles',
        iconName: 'lock_open',
        route: '',
        authorization: [Roles.administrator, Roles.superAdmin]
      }
    ]
  }
];