import { Component, inject, signal } from '@angular/core';
import { TableColumn, TableComponent } from '../../components/table-component/table-component';
import { OrderService } from '../../../../shared/services/order.service';
import { Order } from '../../../auth/interfaces/order-interface';

@Component({
  selector: 'orders-admin-page',
  imports: [TableComponent],
  templateUrl: './orders-admin-page.html',
})
export class OrdersAdminPage {
  private ordersService = inject(OrderService);

  isLoading = signal(true);
  orders = signal<Order[]>([]);

  columns: TableColumn[] = [
    { key: 'id', label: '# Orden' },
    { key: 'username', label: 'Usuario' },
    { key: 'status', label: 'Estatus', type: 'status-order' },
    { key: 'total', label: 'Total', type: 'currency' },
    { key: 'createdAt', label: 'Fecha', type: 'date' },
  ];

  ngOnInit() {
    this.ordersService.getOrders().subscribe({
      next: (res) => {
        this.orders.set(res.data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  onNew() {
    /* abrir modal */
  }
  onEdit(item: any) {
    /* abrir modal editar */
  }
  onDelete(item: any) {
    /* abrir modal confirmar */
  }
}
