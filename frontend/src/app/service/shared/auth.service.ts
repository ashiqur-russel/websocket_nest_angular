import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router
  ) { }

  get isLoggedIn$() {
    return this.loggedIn.asObservable();
  }

  login(username: string, password: string): boolean {
    if (username === 'user' && password === '1234') {
      this.loggedIn.next(true);
      this.router.navigate(['/home']);
      return true;
    }
    this.loggedIn.next(false);
    return false;
    }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
}

}
