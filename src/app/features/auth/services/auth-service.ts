import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import type { AuthResponse } from '../interfaces/auth-response-interface';
import type { User } from './../interfaces/user-interface';
import type { UpdateUser } from '../interfaces/update-user-interface';
import { jwtDecode } from 'jwt-decode';
import { ApiResponse } from '../../../shared/interfaces/ApiResponse';
import { RegisterUser } from '../interfaces/register-user-interface';

interface JwtPayload {
  exp: number;
}

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

  private isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Math.floor(Date.now() / 1000);
      return decoded.exp < now;
    } catch {
      return true;
    }
  }

  private checkAuthStatus(): void {
    const stored = localStorage.getItem('guevara_user');

    if (!stored) {
      this._authStatus.set('not-authenticated');
      return;
    }

    const res: AuthResponse = JSON.parse(stored);

    if (this.isTokenExpired(res.token)) {
      this.logout();
      return;
    }

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
    return this.http
      .post<ApiResponse<AuthResponse>>(`${baseUrl}/User/login`, { email, password })
      .pipe(
        tap((res) => {
          // Guarda toda la respuesta en localStorage
          localStorage.setItem('guevara_user', JSON.stringify(res.data));

          this._token.set(res.data.token);

          this._user.set({
            id: res.data.id,
            username: res.data.username,
            email: res.data.email,
            name: res.data.name,
            role: res.data.role,
          });
          this._authStatus.set('authenticated');
        }),
        map(() => true),
      );
  }

  register(data: RegisterUser): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${baseUrl}/User/register`, data);
  }

  logout(): void {
    this._token.set(null);
    this._user.set(null);
    this._authStatus.set('not-authenticated');
    localStorage.removeItem('guevara_user');
  }

  getUserById(id: string) {
    return this.http.get<ApiResponse<User>>(`${baseUrl}/User/${id}`);
  }

  updateUser(data: UpdateUser): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${baseUrl}/User/profile`, data);
  }

  updateStoredUser(updated: User): void {
    this._user.set(updated);

    const stored = localStorage.getItem('guevara_user');
    if (!stored) return;

    const parsed: AuthResponse = JSON.parse(stored);
    const newStored = { ...parsed, ...updated };
    localStorage.setItem('guevara_user', JSON.stringify(newStored));
  }
}
