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
    { key: 'id', label: 'ID' },
    { key: 'username', label: 'Usuario' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Rol' },
    { key: 'createdAt', label: 'Creado', type: 'date' },
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
