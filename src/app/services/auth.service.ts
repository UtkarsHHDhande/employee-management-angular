import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = signal(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  isAuthenticated() {
    return this.loggedIn();
  }

  login(username: string, password: string): boolean {

    if (username === 'admin' && password === 'admin123') {

      localStorage.setItem('isLoggedIn', 'true');
      this.loggedIn.set(true);

      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.loggedIn.set(false);
  }
}