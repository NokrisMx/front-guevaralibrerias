import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category-interface';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private http = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${baseUrl}/Category`);
  }

  constructor() {}
}
