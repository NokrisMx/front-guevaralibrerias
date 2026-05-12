import { Component, inject } from '@angular/core';
import { TableComponent, TableColumn } from '../../components/table-component/table-component';
import { AuthorsService } from '../../../../core/services/authors.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'authors-admin-page',
  imports: [TableComponent],
  templateUrl: './authors-admin-page.html',
})
export class AuthorsAdminPage {
  private authorsService = inject(AuthorsService);

  authorsResource = rxResource({
    stream: () => this.authorsService.getAuthors(),
  });

  columns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'createdAt', label: 'Creado', type: 'date' },
    { key: 'updatedAt', label: 'Editado', type: 'date' },
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
