import { NavItem } from './nav-item';

/**
 * Data for the sidebar menu.
 */
export let menu: NavItem[] = [
  {
    displayName: 'Gatherings',
    iconName: 'location_on',
    route: 'gatherings',
    children: [
      {
        displayName: 'Weekly Gatherings',
        iconName: 'event',
        route: ''
      },
      {
        displayName: 'Manage Templates',
        iconName: 'category',
        route: ''
      },
      {
        displayName: 'Upcoming Routes',
        iconName: 'departure_board',
        route: ''
      },
      {
        displayName: 'Request A Ride',
        iconName: 'add',
        route: ''
      }
    ]
  },
  {
    displayName: 'Users',
    iconName: 'face',
    route: 'users',
    children: [
      {
        displayName: 'Search Users',
        iconName: 'search',
        route: ''
      },
      {
        displayName: 'Drivers',
        iconName: 'drive_eta',
        route: ''
      }
    ]
  },
  {
    displayName: 'Permissions',
    iconName: 'security',
    route: 'permissions',
    children: [
      {
        displayName: 'Update User Roles',
        iconName: 'lock_open',
        route: ''
      }
    ]
  }
];