import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AuthResponse } from '../interfaces/auth-response-interface';
import { User } from './../interfaces/user-interface';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';
const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('guevara_token'));

  private http = inject(HttpClient);

  user = computed(() => this._user());
  token = computed(this._token);
  isAdmin = computed(() => this._user()?.role.includes('Admin') ?? false);
  authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    const stored = localStorage.getItem('guevara_user');

    if (!stored) {
      this._authStatus.set('not-authenticated');
      return;
    }

    const res: AuthResponse = JSON.parse(stored);

    this._token.set(res.token);
    this._user.set({
      id: res.id,
      username: res.username,
      email: res.email,
      name: res.name,
      role: res.role,
    });
    this._authStatus.set('authenticated');
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<AuthResponse>(`${baseUrl}/User/login`, { email, password }).pipe(
      tap((res) => {
        // Guarda toda la respuesta en localStorage
        localStorage.setItem('guevara_user', JSON.stringify(res));

        this._token.set(res.token);
        this._user.set({
          id: res.id,
          username: res.username,
          email: res.email,
          name: res.name,
          role: res.role,
        });
        this._authStatus.set('authenticated');
      }),
      map(() => true),
      catchError(() => {
        this._authStatus.set('not-authenticated');
        return of(false);
      }),
    );
  }

  logout(): void {
    this._token.set(null);
    this._user.set(null);
    this._authStatus.set('not-authenticated');
    localStorage.removeItem('guevara_user');
  }
}
