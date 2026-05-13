import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category-interface';
import { ApiResponse } from '../../shared/interfaces/ApiResponse';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private http = inject(HttpClient);

  getCategories(): Observable<ApiResponse<Category[]>> {
    return this.http.get<ApiResponse<Category[]>>(`${baseUrl}/Category`);
  }

  createCategory(body: { name: string }): Observable<ApiResponse<Category>> {
    return this.http.post<ApiResponse<Category>>(`${baseUrl}/Category`, body);
  }

  updateCategory(id: number, body: { name: string }): Observable<ApiResponse<Category>> {
    return this.http.put<ApiResponse<Category>>(`${baseUrl}/Category/${id}`, body);
  }

  deleteCategory(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${baseUrl}/Category/${id}`);
  }

  constructor() {}
}
