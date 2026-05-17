import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { Author } from '../interfaces/author-interface';
import type { ApiResponse } from '../../shared/interfaces/ApiResponse';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  private http = inject(HttpClient);

  getAuthors(): Observable<ApiResponse<Author[]>> {
    return this.http.get<ApiResponse<Author[]>>(`${baseUrl}/Author`);
  }

  createAuthor(body: { name: string; bio: string }): Observable<ApiResponse<Author>> {
    return this.http.post<ApiResponse<Author>>(`${baseUrl}/Author`, body);
  }

  updateAuthor(id: number, body: { name: string; bio: string }): Observable<ApiResponse<Author>> {
    return this.http.put<ApiResponse<Author>>(`${baseUrl}/Author/${id}`, body);
  }

  deleteAuthor(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${baseUrl}/Author/${id}`);
  }

  constructor() {}
}
