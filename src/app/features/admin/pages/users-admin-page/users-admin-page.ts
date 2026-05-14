import { Component, inject } from '@angular/core';
import { TableColumn, TableComponent } from '../../components/table-component/table-component';
import { AuthService } from '../../../auth/services/auth.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'users-admin-page',
  imports: [TableComponent],
  templateUrl: './users-admin-page.html',
})
export class UsersAdminPage {
  private usersService = inject(AuthService);

  usersResource = rxResource({
    stream: () => this.usersService.getUsers(),
  });

  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, filterable: true },
    { key: 'username', label: 'Usuario', sortable: true, filterable: true },
    { key: 'email', label: 'Email', sortable: true, filterable: true },
    { key: 'role', label: 'Rol', sortable: true, filterable: true },
    { key: 'createdAt', label: 'Creado', type: 'date', sortable: true, filterable: true },
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
