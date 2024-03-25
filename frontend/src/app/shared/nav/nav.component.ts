import { Component } from '@angular/core';
import { AuthService } from '../../service/shared/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(public authService: AuthService){};
  onLogout(){
    this.authService.logout()
  }

}
