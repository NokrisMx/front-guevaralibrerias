import { Component, computed, effect, inject, afterNextRender, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderStatusPipe } from '../../../auth/pipes/order-status-pipe';
import { OrderStatusColorPipe } from '../../../auth/pipes/order-status-color-pipe';
import {
  Chart,
  DoughnutController,
  BarController,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  DoughnutController,
  BarController,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

@Component({
  selector: 'app-dashboard-page',
  imports: [RouterLink, CurrencyPipe, DatePipe, OrderStatusPipe, OrderStatusColorPipe],
  templateUrl: './dashboard-page.html',
})
export class DashboardPage {
  private adminService = inject(AdminService);
  private donutChart: Chart | null = null;
  private barChart: Chart | null = null;

  stats = computed(() => this.dashboardStats.value()?.data);
  recentOrders = computed(() => this.recentOrdersResource.value()?.data ?? []);

  dashboardStats = rxResource({
    stream: () => this.adminService.getStats(),
  });

  recentOrdersResource = rxResource({
    stream: () => this.adminService.getRecentOrders(),
  });

  ordersByStatusResource = rxResource({
    stream: () => this.adminService.getOrdersByStatus(),
  });

  revenueByMonthResource = rxResource({
    stream: () => this.adminService.getRevenueByMonth(),
  });

  constructor() {
    effect(() => {
      const data = this.ordersByStatusResource.value()?.data;
      if (!data) return;

      setTimeout(() => this.renderDonut(data), 0);
    });

    effect(() => {
      const data = this.revenueByMonthResource.value()?.data;
      if (!data) return;

      setTimeout(() => this.renderBar(data), 0);
    });
  }

  private renderDonut(data: { pending: number; paid: number; cancelled: number }) {
    const canvas = document.getElementById('donutChart') as HTMLCanvasElement;
    if (!canvas) return;

    this.donutChart?.destroy();
    this.donutChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Pendiente', 'Pagado', 'Cancelado'],
        datasets: [
          {
            data: [data.pending, data.paid, data.cancelled],
            backgroundColor: ['#f59e0b', '#02332D', '#ef4444'],
            borderWidth: 0,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 16,
              font: { size: 11 },
              color: '#6b7280',
              boxWidth: 12,
              boxHeight: 12,
            },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.parsed}`,
            },
          },
        },
      },
    });
  }

  private renderBar(data: { month: string; revenue: number }[]) {
    const canvas = document.getElementById('barChart') as HTMLCanvasElement;
    if (!canvas) return;

    this.barChart?.destroy();
    this.barChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: data.map((d) => d.month),
        datasets: [
          {
            label: 'Ingresos MXN',
            data: data.map((d) => d.revenue),
            backgroundColor: '#02332D',
            borderRadius: 2,
            hoverBackgroundColor: '#b8975a',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const value = Number(ctx.parsed?.y ?? 0);
                return ` $${value.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`;
              },
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#9ca3af', font: { size: 11 } },
          },
          y: {
            grid: { color: '#f3f4f6' },
            ticks: {
              color: '#9ca3af',
              font: { size: 11 },
              callback: (val) => `$${Number(val).toLocaleString('es-MX')}`,
            },
          },
        },
      },
    });
  }
}
