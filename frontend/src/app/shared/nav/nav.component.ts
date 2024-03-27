import { Component } from '@angular/core';
import { AuthService } from '../../service/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isLoggedIn$ = this.authService.isLoggedIn$;

  constructor(public authService: AuthService, private router : Router){};
  onLogout(){
    this.authService.logout()
  }
  onChat(){
    this.router.navigate(['/chat']);
  }
  onHome(){
    this.router.navigate(['/home']);
  }

}
