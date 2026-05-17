import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DashboardStats } from '../interfaces/dashboard-stats-interface';
import { ApiResponse } from '../../../shared/interfaces/ApiResponse';
import { RecentOrders } from '../interfaces/recent-orders';
import { OrdersByStatus } from '../interfaces/orders-by-status';
import { RevenueByMonth } from '../interfaces/revenue-by-month';

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

  getOrdersByStatus() {
    return this.http.get<ApiResponse<OrdersByStatus>>(`${baseUrl}/Dashboard/orders-by-status`);
  }

  getRevenueByMonth() {
    return this.http.get<ApiResponse<RevenueByMonth[]>>(`${baseUrl}/Dashboard/revenue-by-month`);
  }

  constructor() {}
}
