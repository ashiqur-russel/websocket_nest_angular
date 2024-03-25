import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(
    private router: Router
  ) { }

  

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('isLoggedin');
  }

  get isLoggedIn$() {
    return this.loggedIn.asObservable();
  }

  login(username: string, password: string): boolean {
    if (username === 'user' && password === '1234') {
      localStorage.setItem('isLoggedin', 'true');
      this.loggedIn.next(true);
      this.router.navigate(['/home']);
      return true;
    }
    this.loggedIn.next(false);
    return false;
    }

    
  logout() {
    localStorage.removeItem('isLoggedin');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
}

}
