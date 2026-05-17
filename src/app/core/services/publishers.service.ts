import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { Publisher } from '../interfaces/publisher-interface';
import type { ApiResponse } from '../../shared/interfaces/ApiResponse';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class PublishersService {
  private http = inject(HttpClient);

  getPublishers(): Observable<ApiResponse<Publisher[]>> {
    return this.http.get<ApiResponse<Publisher[]>>(`${baseUrl}/Publisher`);
  }

  createPublisher(body: { name: string }): Observable<ApiResponse<Publisher>> {
    return this.http.post<ApiResponse<Publisher>>(`${baseUrl}/Publisher`, body);
  }

  updatePublisher(id: number, body: { name: string }): Observable<ApiResponse<Publisher>> {
    return this.http.put<ApiResponse<Publisher>>(`${baseUrl}/Publisher/${id}`, body);
  }

  deletePublisher(id: number): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${baseUrl}/Publisher/${id}`);
  }

  constructor() {}
}
