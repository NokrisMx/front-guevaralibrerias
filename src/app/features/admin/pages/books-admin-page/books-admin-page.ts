import { Component, inject } from '@angular/core';
import { TableColumn, TableComponent } from '../../components/table-component/table-component';
import { BooksService } from '../../../../core/services/books.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'books-admin-page',
  imports: [TableComponent],
  templateUrl: './books-admin-page.html',
})
export class BooksAdminPage {
  private booksService = inject(BooksService);

  booksResource = rxResource({
    stream: () => this.booksService.getBooks(),
  });

  columns: TableColumn[] = [
    { key: 'isbn', label: 'isbn' },
    { key: 'title', label: 'Titulo' },
    { key: 'price', label: 'Precio', type: 'currency' },
    { key: 'stock', label: 'stock' },
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
