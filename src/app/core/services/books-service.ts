import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book-interface';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${baseUrl}/Book`);
  }

  constructor() {}
}
