import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publisher } from '../interfaces/publisher-interface';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class PublishersService {
  private http = inject(HttpClient);

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<Publisher[]>(`${baseUrl}/Publisher`);
  }

  constructor() {}
}
