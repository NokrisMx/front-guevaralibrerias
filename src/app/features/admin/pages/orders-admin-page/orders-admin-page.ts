import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TableComponent, TableColumn } from '../../components/table-component/table-component';
import { OrderService } from '../../../../shared/services/order.service';
import { Order } from '../../../../core/interfaces/order-interface';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderStatusPipe } from '../../../auth/pipes/order-status-pipe';

@Component({
  selector: 'orders-admin-page',
  imports: [TableComponent, CurrencyPipe, OrderStatusPipe, DatePipe],
  templateUrl: './orders-admin-page.html',
})
export class OrdersAdminPage {
  private ordersService = inject(OrderService);

  ordersResource = rxResource({
    stream: () => this.ordersService.getOrders(),
  });

  selectedOrder = signal<Order | null>(null);
  showDetail = signal(false);

  columns: TableColumn[] = [
    { key: 'id', label: 'Pedido' },
    { key: 'username', label: 'Usuario' },
    { key: 'total', label: 'Total', type: 'currency' },
    { key: 'status', label: 'Estado', type: 'status-order' },
    { key: 'createdAt', label: 'Fecha', type: 'date' },
  ];

  onView(order: Order) {
    this.selectedOrder.set(order);
    this.showDetail.set(true);
  }

  closeDetail() {
    this.showDetail.set(false);
    this.selectedOrder.set(null);
  }
}
