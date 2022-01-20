import { Roles } from "./roles";

/**
 * The model that represents a menu item on the sidebar.
 */
export interface NavItem {
  /** The menu item word or words that the user will see. */
  displayName: string;
  /** A menu item may be disabled for navigation. */
  disabled?: boolean;
  /** The name of the Material Design icon that will appear next to the text on the menu item. */
  iconName: string;
  /** Tells the app where to send users who click on that menu item. */
  route?: string;

  roles: Roles[];
  /**  Identifies menu items that fall under this parent menu item. */
  children?: NavItem[];
}