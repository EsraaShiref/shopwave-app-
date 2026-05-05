import { Injectable } from '@angular/core';
import { IUser } from '../modles/iuser';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly KEY = 'shopwave_user';

  // Save logged-in user to sessionStorage
  setUser(user: IUser): void {
    sessionStorage.setItem(this.KEY, JSON.stringify(user));
  }

  // Get logged-in user
  getUser(): IUser | null {
    const data = sessionStorage.getItem(this.KEY);
    return data ? JSON.parse(data) : null;
  }

  // Check if logged in
  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  // Logout
  logout(): void {
    sessionStorage.removeItem(this.KEY);
  }
}
