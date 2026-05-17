import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../../../shared/services/order.service';
import type { Order } from '../../../../core/interfaces/order-interface';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderStatusPipe } from '../../pipes/order-status-pipe';
import { OrderStatusColorPipe } from '../../pipes/order-status-color-pipe';
import { HeroProfileComponent } from '../../components/hero-profile-component/hero-profile-component';
import type { User } from '../../interfaces/user-interface';
import { AuthService } from '../../services/auth.service';
import { MenuProfileComponent } from '../../components/menu-profile-component/menu-profile-component';
import { BookImgPipe } from '../../../../shared/pipes/book-img-pipe';

@Component({
  selector: 'orders-page',
  imports: [
    RouterLink,
    DatePipe,
    OrderStatusPipe,
    OrderStatusColorPipe,
    HeroProfileComponent,
    MenuProfileComponent,
    CurrencyPipe,
    BookImgPipe,
  ],
  templateUrl: './orders-page.html',
})
export class OrdersPage {
  private authService = inject(AuthService);
  private orderService = inject(OrderService);
  selectedOrder = signal<number | null>(null);
  orders = signal<Order[]>([]);
  user = signal<User | null>(null);
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

    const id = this.authService.user()?.id;
    if (!id) return;

    this.authService.getUserById(id).subscribe({
      next: (data) => {
        this.user.set(data.data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  toggle(id: number) {
    this.selectedOrder.update((v) => (v === id ? null : id));
  }
}
