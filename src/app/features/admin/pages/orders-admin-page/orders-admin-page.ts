import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { TableComponent, TableColumn } from '../../components/table-component/table-component';
import { OrderService } from '../../../../shared/services/order.service';
import type { Order } from '../../../../core/interfaces/order-interface';
import { OrderModal } from '../../modals/order-modal/order-modal';

@Component({
  selector: 'orders-admin-page',
  imports: [TableComponent, OrderModal],
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
    { key: 'id', label: 'Pedido', sortable: true, filterable: true },
    { key: 'username', label: 'Usuario', sortable: true, filterable: true },
    { key: 'total', label: 'Total', type: 'currency', sortable: true, filterable: true },
    { key: 'status', label: 'Estado', type: 'status-order', sortable: true, filterable: true },
    { key: 'createdAt', label: 'Fecha', type: 'date', sortable: true, filterable: true },
  ];

  onView(order: Order) {
    this.selectedOrder.set(order);
    this.showDetail.set(true);
  }

  onClose() {
    this.showDetail.set(false);
    this.selectedOrder.set(null);
  }
}
