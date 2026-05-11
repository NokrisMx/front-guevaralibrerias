import { Component, inject, signal } from '@angular/core';
import { TableColumn, TableComponent } from '../../components/table-component/table-component';
import { PublishersService } from '../../../../core/services/publishers.service';
import { Publisher } from '../../../../core/interfaces/publisher-interface';

@Component({
  selector: 'publishers-admin-page',
  imports: [TableComponent],
  templateUrl: './publishers-admin-page.html',
})
export class PublishersAdminPage {
  private publishersService = inject(PublishersService);

  isLoading = signal(true);
  publisher = signal<Publisher[]>([]);

  columns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'createdAt', label: 'Creado', type: 'date' },
    { key: 'updatedAt', label: 'Editado', type: 'date' },
  ];

  ngOnInit() {
    this.publishersService.getPublishers().subscribe({
      next: (res) => {
        this.publisher.set(res.data);
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
