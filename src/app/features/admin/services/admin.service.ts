import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardStats } from '../interfaces/dashboard-stats-interface';
import { ApiResponse } from '../../../shared/interfaces/ApiResponse';
import { RecentOrders } from '../interfaces/recent-orders';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private http = inject(HttpClient);

  getStats() {
    return this.http.get<ApiResponse<DashboardStats>>(`${baseUrl}/Dashboard/stats`);
  }

  getRecentOrders() {
    return this.http.get<ApiResponse<RecentOrders[]>>(`${baseUrl}/Dashboard/recent-orders`);
  }

  constructor() {}
}
