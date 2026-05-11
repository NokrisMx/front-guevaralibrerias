import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../services/order-service';
import { Order } from '../../interfaces/order-interface';
import { DatePipe } from '@angular/common';
import { OrderStatusPipe } from '../../pipes/order-status-pipe';
import { OrderStatusColorPipe } from '../../pipes/order-status-color-pipe';

@Component({
  selector: 'orders-page',
  imports: [RouterLink, DatePipe, OrderStatusPipe, OrderStatusColorPipe],
  templateUrl: './orders-page.html',
})
export class OrdersPage {
  private orderService = inject(OrderService);
  selectedOrder = signal<number | null>(null);
  orders = signal<Order[]>([]);
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: (res) => {
        this.orders.set(res.data);
        this.isLoading.set(false);
      },

      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  toggle(id: number) {
    this.selectedOrder.update((v) => (v === id ? null : id));
  }
}
