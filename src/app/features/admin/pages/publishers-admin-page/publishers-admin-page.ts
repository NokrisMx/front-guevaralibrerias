import { Component, inject } from '@angular/core';
import { TableColumn, TableComponent } from '../../components/table-component/table-component';
import { PublishersService } from '../../../../core/services/publishers.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'publishers-admin-page',
  imports: [TableComponent],
  templateUrl: './publishers-admin-page.html',
})
export class PublishersAdminPage {
  private publishersService = inject(PublishersService);

  publishersResource = rxResource({
    stream: () => this.publishersService.getPublishers(),
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
