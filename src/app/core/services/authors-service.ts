import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../interfaces/author-interface';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  private http = inject(HttpClient);

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${baseUrl}/Author`);
  }

  constructor() {}
}
