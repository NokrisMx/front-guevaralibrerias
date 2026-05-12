import { Component, inject } from '@angular/core';
import { TableColumn, TableComponent } from '../../components/table-component/table-component';
import { OrderService } from '../../../../shared/services/order.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'orders-admin-page',
  imports: [TableComponent],
  templateUrl: './orders-admin-page.html',
})
export class OrdersAdminPage {
  private ordersService = inject(OrderService);

  ordersResource = rxResource({
    stream: () => this.ordersService.getOrders(),
  });

  columns: TableColumn[] = [
    { key: 'id', label: '# Orden' },
    { key: 'username', label: 'Usuario' },
    { key: 'status', label: 'Estatus', type: 'status-order' },
    { key: 'total', label: 'Total', type: 'currency' },
    { key: 'createdAt', label: 'Fecha', type: 'date' },
  ];

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
