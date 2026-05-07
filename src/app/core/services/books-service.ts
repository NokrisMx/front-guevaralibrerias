import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book-interface';
import { BookPagination } from '../interfaces/book-pagination-interface';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${baseUrl}/Book`);
  }

  getBooksPagination(paramsData: {
    page?: number;
    pageSize?: number;
    categoryId?: number;
    authorId?: number;
    minPrice?: number;
    maxPrice?: number;
    publisher?: number;
  }) {
    let params = new HttpParams();

    if (paramsData.page) {
      params = params.set('page', paramsData.page);
    }

    if (paramsData.pageSize) {
      params = params.set('pageSize', paramsData.pageSize);
    }

    if (paramsData.categoryId && paramsData.categoryId > 0) {
      params = params.set('categoryId', paramsData.categoryId);
    }

    if (paramsData.authorId && paramsData.authorId > 0) {
      params = params.set('authorId', paramsData.authorId);
    }

    if (paramsData.minPrice !== undefined) {
      params = params.set('minPrice', paramsData.minPrice);
    }

    if (paramsData.maxPrice !== undefined) {
      params = params.set('maxPrice', paramsData.maxPrice);
    }

    if (paramsData.publisher) {
      params = params.set('publisher', paramsData.publisher);
    }

    return this.http.get<BookPagination>(`${baseUrl}/Book/page`, { params });
  }

  getBookById(id: number) {
    return this.http.get<Book>(`${baseUrl}/Book/${id}`);
  }

  constructor() {}
}
