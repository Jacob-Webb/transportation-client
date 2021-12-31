import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private opened: boolean = true;
  private isOpen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.opened);
  public isOpen$: Observable<boolean> = this.isOpen.asObservable();

  constructor() {
    this.isOpen$.subscribe(response => this.opened = response);
  }

  public setIsOpen(opened: boolean): void {
    this.isOpen.next(opened);
  }

  public toggleMenu(): void {
    this.opened = !this.opened;
    this.setIsOpen(this.opened);
  }
}
