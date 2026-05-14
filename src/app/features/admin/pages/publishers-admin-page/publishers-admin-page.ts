import { Component, inject, signal } from '@angular/core';
import { TableColumn, TableComponent } from '../../components/table-component/table-component';
import { PublishersService } from '../../../../core/services/publishers.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PublisherModal, PublisherModalMode } from '../../modals/publisher-modal/publisher-modal';
import type { Publisher } from '../../../../core/interfaces/publisher-interface';

@Component({
  selector: 'publishers-admin-page',
  imports: [TableComponent, PublisherModal],
  templateUrl: './publishers-admin-page.html',
})
export class PublishersAdminPage {
  private publishersService = inject(PublishersService);

  publishersResource = rxResource({
    stream: () => this.publishersService.getPublishers(),
  });

  modalOpen = signal(false);
  modalMode = signal<PublisherModalMode>('create');
  selectedPublisher = signal<Publisher | null>(null);

  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, filterable: true },
    { key: 'name', label: 'Nombre', sortable: true, filterable: true },
    { key: 'createdAt', label: 'Creado', type: 'date', sortable: true, filterable: true },
    { key: 'updatedAt', label: 'Editado', type: 'date', sortable: true, filterable: true },
  ];

  onNew() {
    this.selectedPublisher.set(null);
    this.modalMode.set('create');
    this.modalOpen.set(true);
  }

  onEdit(publisher: Publisher) {
    this.selectedPublisher.set(publisher);
    this.modalMode.set('edit');
    this.modalOpen.set(true);
  }

  onDelete(publisher: Publisher) {
    this.selectedPublisher.set(publisher);
    this.modalMode.set('delete');
    this.modalOpen.set(true);
  }

  onModalClose() {
    this.modalOpen.set(false);
    this.selectedPublisher.set(null);
  }

  onModalSuccess() {
    this.modalOpen.set(false);
    this.selectedPublisher.set(null);
    this.publishersResource.reload();
  }
}
