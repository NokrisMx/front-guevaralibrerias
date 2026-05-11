import { Component, inject, signal } from '@angular/core';
import { TableColumn, TableComponent } from '../../components/table-component/table-component';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user-interface';

@Component({
  selector: 'users-admin-page',
  imports: [TableComponent],
  templateUrl: './users-admin-page.html',
})
export class UsersAdminPage {
  private usersService = inject(AuthService);

  isLoading = signal(true);
  users = signal<User[]>([]);

  columns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'username', label: 'Usuario' },
    { key: 'email', label: 'Email' },
    { key: 'phoneNumber', label: 'Teléfono' },
    { key: 'role', label: 'Rol' },
    { key: 'createdAt', label: 'Creado', type: 'date' },
    { key: 'updatedAt', label: 'Editado', type: 'date' },
  ];

  ngOnInit() {
    this.usersService.getUsers().subscribe({
      next: (res) => {
        this.users.set(res.data);
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
