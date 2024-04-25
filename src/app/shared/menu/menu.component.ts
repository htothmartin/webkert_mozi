import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Input() loggedInUser?: firebase.default.User | null;
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();

  close(logout = false){
    this.onCloseSidenav.emit(true);
    if(logout == true){
      this.onLogout.emit(true);
    }
  }
}
