import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../modles/iuser';

@Injectable({ providedIn: 'root' })
export class UserService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // ── READ ALL ──────────────────────────────────────────────────
  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl);
  }

  // ── READ ONE ──────────────────────────────────────────────────
  getById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${id}`);
  }

  // ── CREATE (Sign Up) ──────────────────────────────────────────
  create(user: Omit<IUser, 'id'>): Observable<IUser> {
    return this.http.post<IUser>(this.apiUrl, user);
  }

  // ── UPDATE ────────────────────────────────────────────────────
  update(id: number, user: Partial<IUser>): Observable<IUser> {
    return this.http.put<IUser>(`${this.apiUrl}/${id}`, user);
  }

  // ── DELETE ────────────────────────────────────────────────────
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ── CHECK EMAIL EXISTS (used by signup to block duplicates) ───
  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<IUser[]>(this.apiUrl).pipe(
      map(users => users.some(u => u.email.toLowerCase() === email.toLowerCase()))
    );
  }

  
  login(email: string, password: string): Observable<IUser | undefined> {
    return this.http.get<IUser[]>(this.apiUrl).pipe(
      map(users =>
        users.find(
          u =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password
        )
      )
    );
  }
}