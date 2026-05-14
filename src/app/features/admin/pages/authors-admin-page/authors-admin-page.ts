import { Component, inject, signal } from '@angular/core';
import { TableComponent, TableColumn } from '../../components/table-component/table-component';
import { AuthorsService } from '../../../../core/services/authors.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthorModalMode } from '../../modals/author-modal/author-modal';
import { Author } from '../../../../core/interfaces/author-interface';
import { AuthorModal } from '../../modals/author-modal/author-modal';

@Component({
  selector: 'authors-admin-page',
  imports: [TableComponent, AuthorModal],
  templateUrl: './authors-admin-page.html',
})
export class AuthorsAdminPage {
  private authorsService = inject(AuthorsService);

  authorsResource = rxResource({
    stream: () => this.authorsService.getAuthors(),
  });

  modalOpen = signal(false);
  modalMode = signal<AuthorModalMode>('create');
  selectedAuthor = signal<Author | null>(null);

  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true, filterable: true },
    { key: 'name', label: 'Nombre', sortable: true, filterable: true },
    { key: 'createdAt', label: 'Creado', type: 'date', sortable: true, filterable: true },
    { key: 'updatedAt', label: 'Editado', type: 'date', sortable: true, filterable: true },
  ];

  onNew() {
    this.selectedAuthor.set(null);
    this.modalMode.set('create');
    this.modalOpen.set(true);
  }

  onEdit(author: Author) {
    this.selectedAuthor.set(author);
    this.modalMode.set('edit');
    this.modalOpen.set(true);
  }

  onDelete(author: Author) {
    this.selectedAuthor.set(author);
    this.modalMode.set('delete');
    this.modalOpen.set(true);
  }

  onModalClose() {
    this.modalOpen.set(false);
    this.selectedAuthor.set(null);
  }

  onModalSuccess() {
    this.modalOpen.set(false);
    this.selectedAuthor.set(null);
    this.authorsResource.reload();
  }
}
