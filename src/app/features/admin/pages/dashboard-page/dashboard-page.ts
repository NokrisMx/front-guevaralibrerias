import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './dashboard-page.html',
})
export class DashboardPage {
  private adminService = inject(AdminService);

  stats = computed(() => this.dashboardStats.value()?.data);
  recentOrders = computed(() => this.recentOrdersResource.value()?.data);
  isLoading = signal(true);

  dashboardStats = rxResource({
    stream: () => this.adminService.getStats(),
  });

  recentOrdersResource = rxResource({
    stream: () => this.adminService.getRecentOrders(),
  });
}
