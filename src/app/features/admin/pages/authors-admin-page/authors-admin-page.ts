import { Component, inject, signal } from '@angular/core';
import { TableComponent, TableColumn } from '../../components/table-component/table-component';
import { AuthorsService } from '../../../../core/services/authors.service';
import { Author } from '../../../../core/interfaces/author-interface';

@Component({
  selector: 'authors-admin-page',
  imports: [TableComponent],
  templateUrl: './authors-admin-page.html',
})
export class AuthorsAdminPage {
  private authorsService = inject(AuthorsService);

  isLoading = signal(true);
  authors = signal<Author[]>([]);

  columns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'createdAt', label: 'Creado', type: 'date' },
    { key: 'updatedAt', label: 'Editado', type: 'date' },
  ];

  ngOnInit() {
    this.authorsService.getAuthors().subscribe({
      next: (res) => {
        this.authors.set(res.data);
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
