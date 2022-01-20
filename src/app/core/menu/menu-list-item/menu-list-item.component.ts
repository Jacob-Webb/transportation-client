import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { NavItem } from '../../../shared/models/nav-item';
import { Router } from '@angular/router';
import { NavService } from '../../services/nav.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RoleService } from '../../services/role.service';
import { Roles } from 'src/app/shared/models/roles';

/**
 * Component representing each menu item for the sidebar menu.
 */
@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition('expanded <=> collapsed',
          animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class MenuListItemComponent implements OnInit {
  /** Tracks if this menu item is expanded. */
  isExpanded: boolean;
  isAuthorized: boolean;
  /** Maps aria-expanded to the isExpanded property in the DOM. */
  @HostBinding('attr.aria-expanded') ariaExpanded;
  /** The NavItem data representation of this menu list item. */
  @Input() item!: NavItem;
  /** Describes how many levels deep this item is in the menu. */
  @Input() depth: number;

  /**
   * Injects dependencies into the component and initializes properties. 
   * @param urlService Functionality to track navigation data.
   * @param router Functionality for internal navigation.
   */
  constructor(public navService: NavService,
    public roleService: RoleService,
    public router: Router) { 
    this.isExpanded = false;
    this.ariaExpanded = this.isExpanded;
    this.depth = 0;
    this.isAuthorized = false;
  }

  /**
   * Expands parent menu items if one of the children is associated with a URL that the user is currently viewing.
   */
  ngOnInit(): void {
    this.navService.currentUrl.subscribe((url: string | undefined) => {
      if (this.item?.route && url) {
          this.isExpanded = url.indexOf(`/${this.item.route}`) === 0;
          this.ariaExpanded = this.isExpanded;
      }

      if (this.item.authorization.findIndex(role => role === this.roleService.getUserRole()) !== -1) {
        this.isAuthorized = true;
      }
    });
  }

  /**
   * This function gets executed when a user clicks on a link in the sidebar menu. 
   * If the item does not have children, the application takes the user to the URL associated with that menu item.
   * The item with children will be opened or closed depending on its current state. 
   * @param item The navmenu item data.
   */
  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
        this.router.navigate([item.route]);
    }

    if (item.children && item.children.length) {
        this.isExpanded = !this.isExpanded;
    }
  }

}
