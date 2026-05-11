import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink],
  templateUrl: './dashboard-page.html',
})
export class DashboardPage implements OnInit {
  private adminService = inject(AdminService);

  stats = signal({
    books: 0,
    authors: 0,
    categories: 0,
    publishers: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });
  recentOrders = signal<any[]>([]);
  isLoading = signal(true);

  ngOnInit() {}
}
