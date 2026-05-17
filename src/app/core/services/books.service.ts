import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { Book } from '../interfaces/book-interface';
import type { BookPagination } from '../interfaces/book-pagination-interface';
import type { ApiResponse } from '../../shared/interfaces/ApiResponse';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private http = inject(HttpClient);

  getBooks(): Observable<ApiResponse<Book[]>> {
    return this.http.get<ApiResponse<Book[]>>(`${baseUrl}/Book/books`);
  }

  getBooksPagination(paramsData: {
    page?: number;
    pageSize?: number;
    query?: string;
    categoryId?: number;
    authorId?: number;
    publisherId?: number;
    minPrice?: number;
    maxPrice?: number;
  }) {
    let params = new HttpParams();

    if (paramsData.page) {
      params = params.set('page', paramsData.page);
    }

    if (paramsData.pageSize) {
      params = params.set('pageSize', paramsData.pageSize);
    }

    if (paramsData.query?.trim()) {
      params = params.set('query', paramsData.query.trim());
    }

    if (paramsData.categoryId && paramsData.categoryId > 0) {
      params = params.set('categoryId', paramsData.categoryId);
    }

    if (paramsData.authorId && paramsData.authorId > 0) {
      params = params.set('authorId', paramsData.authorId);
    }

    if (paramsData.publisherId && paramsData.publisherId > 0) {
      params = params.set('publisherId', paramsData.publisherId);
    }

    if (paramsData.minPrice !== undefined) {
      params = params.set('minPrice', paramsData.minPrice);
    }

    if (paramsData.maxPrice !== undefined) {
      params = params.set('maxPrice', paramsData.maxPrice);
    }

    return this.http.get<ApiResponse<BookPagination>>(`${baseUrl}/Book`, {
      params,
    });
  }

  getBookById(id: number) {
    return this.http.get<ApiResponse<Book>>(`${baseUrl}/Book/${id}`);
  }

  createBook(formData: FormData): Observable<ApiResponse<Book>> {
    return this.http.post<ApiResponse<Book>>(`${baseUrl}/Book`, formData);
  }

  updateBook(id: number, formData: FormData): Observable<ApiResponse<Book>> {
    return this.http.put<ApiResponse<Book>>(`${baseUrl}/Book/${id}`, formData);
  }

  deleteBook(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${baseUrl}/Book/${id}`);
  }

  constructor() {}
}
