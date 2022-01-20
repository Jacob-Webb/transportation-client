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
    roles: [Roles.user, Roles.driver, Roles.administrator, Roles.superAdmin],
    children: [
      {
        displayName: 'Weekly Gatherings',
        iconName: 'event',
        route: '',
        roles: [Roles.administrator, Roles.superAdmin]
      },
      {
        displayName: 'Upcoming Routes',
        iconName: 'departure_board',
        route: '',
        roles: [Roles.administrator, Roles.superAdmin]
      },
      {
        displayName: 'Manage Templates',
        iconName: 'insert_drive_file',
        route: '/manage-templates',
        roles: [Roles.administrator, Roles.superAdmin]
      },
      {
        displayName: 'Request A Ride',
        iconName: 'add_circle',
        route: '',
        roles: [Roles.user, Roles.driver, Roles.administrator, Roles.superAdmin]
      }
    ]
  },
  {
    displayName: 'Users',
    iconName: 'face',
    route: 'users',
    roles: [Roles.administrator, Roles.superAdmin],
    children: [
      {
        displayName: 'Search Users',
        iconName: 'search',
        route: '',
        roles: [Roles.administrator, Roles.superAdmin]
      },
      {
        displayName: 'Drivers',
        iconName: 'drive_eta',
        route: '',
        roles: [Roles.administrator, Roles.superAdmin]
      }
    ]
  },
  {
    displayName: 'Permissions',
    iconName: 'security',
    route: 'permissions',
    roles: [Roles.administrator, Roles.superAdmin],
    children: [
      {
        displayName: 'Update User Roles',
        iconName: 'lock_open',
        route: '',
        roles: [Roles.administrator, Roles.superAdmin]
      }
    ]
  }
];